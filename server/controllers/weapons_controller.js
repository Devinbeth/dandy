module.exports = {
    addWeapon: (req, res) => {
    
    },
    readWeapon: (req, res) => {
        const db = req.app.get('db');
        db.get_character([req.params.id]).then(characters => {
            if (req.user.id === characters[0].user_id) {
                res.status(200).send(characters);
            }
            else {
                res.status(401).send('Nice try suckaaaaaa!!!!!!');
            }
        });
    },
    deleteWeapon: (req, res) => {
    
    },
}