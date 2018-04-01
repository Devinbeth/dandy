module.exports = {
    addWeapon: (req, res) => {
        req.app.get('db').add_weapon([req.body.character_id, req.body.weapon_id]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
    readWeapons: (req, res) => {
        req.app.get('db').get_weapons([req.params.id]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
    editWeapon: (req, res) => {
        req.app.get('db').edit_weapon([req.body.character_id, req.params.id, req.body.attack_bonus]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
    deleteWeapon: (req, res) => {
        req.app.get('db').delete_weapon([req.params.id, req.body.character_id]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
}