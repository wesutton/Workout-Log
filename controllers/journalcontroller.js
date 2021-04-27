const { query } = require('express');
let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Journal = require('../db').import('../models/journal');

router.get('/practice', validateSession, function(req, res)
{
    res.send('this is a practice route!')
})

router.post('/create', validateSession, (req, res) => {
    const journalEntry = {
        decription: req.body.journal.decription,
        definition: req.body.journal.definition,
        result: req.body.journal.result,
        owner_id: req.user.id
    }
    Journal.create(journalEntry)
    .then(journal => res.status(200).json(journal))
    .catch(err => res.status(500).json({error: err}))
})

router.get("/", (req,res) => {
    Journal.findAll()
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/mine", validateSession, (req,res) => {
    let userid = req.user.id
    Journal.findAll({
        wher: {owner: userid}
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({error: err}))
});

router.put('/update/:entryId', validateSession, function(req, res) {
    const updateJournalEntry = {
        decription: req.body.journal.decription,
        definition: req.body.journal.definition,
        result: req.body.journal.result,
        owner_id: req.user.id
    };

    const query = { where: {id: req.params.entryId, owner_id: req.user.id}};

    Journal.update(updateJournalEntry, query)
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({error: err}))
})

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = { where: {id: req.params.id, owner_id: req.user.id}};

    Journal.destroy(query)
    .then(() => res.status(200).json({ message: "Journal Entry Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
})

module.exports = router