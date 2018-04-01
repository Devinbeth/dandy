module.exports = {
    addSpell: (req, res) => {
        req.app.get('db').add_spell([req.body.character_id, req.body.spell_id]).then(spells => {
            res.status(200).send(spells);
        });
    },
    readSpells: (req, res) => {
        req.app.get('db').get_spells([req.params.id]).then(spells => {
            res.status(200).send(spells);
        });
    },
    editSpell: (req, res) => {
        req.app.get('db').edit_spell([req.body.character_id, req.params.id]).then(spells => {
            res.status(200).send(spells);
        });
    },
    deleteSpell: (req, res) => {
        req.app.get('db').delete_spell([req.params.id, req.body.character_id]).then(spells => {
            res.status(200).send(spells);
        });
    },
}
