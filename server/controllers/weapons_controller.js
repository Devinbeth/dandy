module.exports = {
    addWeapon: (req, res) => {
    
    },
    readWeapon: (req, res) => {
        const db = req.app.get('db');
        db.get_character_weapons([req.params.id]).then(weapons => {
            res.status(200).send(weapons);
        });
    },
    deleteWeapon: (req, res) => {
    
    },
}