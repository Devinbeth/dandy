module.exports = {
    addWeapon: (req, res) => {
    
    },
    readWeapon: (req, res) => {
        req.app.get('db').get_character_weapons([req.params.id]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
    deleteWeapon: (req, res) => {
    
    },
}