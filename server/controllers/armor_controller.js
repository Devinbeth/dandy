module.exports = {
    addArmor: (req, res) => {
        req.app.get('db').add_armor([req.body.character_id, req.body.armor_id]).then(armor => {
            res.status(200).send(armor);
        });
    },
    readArmor: (req, res) => {
        req.app.get('db').get_armor([req.params.id]).then(armor => {
            res.status(200).send(armor);
        });
    },
    editArmor: (req, res) => {
        req.app.get('db').edit_armor([req.body.character_id, req.params.id, req.body.attack_bonus]).then(armor => {
            res.status(200).send(armor);
        });
    },
    deleteArmor: (req, res) => {
        req.app.get('db').delete_armor([req.params.id]).then(armor => {
            res.status(200).send(armor);
        });
    },
}
