module.exports = {
    readAllWeapons: (req, res) => {
        req.app.get('db').get_all_weapons([req.params.id]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
    readAllArmor: (req, res) => {
        req.app.get('db').get_all_armor([req.params.id]).then(armor => {
            res.status(200).send(armor);
        });
    },
    readAllSpells: (req, res) => {
        req.app.get('db').get_all_spells([req.params.id]).then(spells => {
            res.status(200).send(spells);
        });
    },
    readAlignment: (req, res) => {
        req.app.get('db').get_alignment().then(alignment => {
            res.status(200).send(alignment);
        });
    }
}
