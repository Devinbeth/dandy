module.exports = {
    createCharacter: (req, res) => {
    
    },
    readCharacters: (req, res) => {
        const db = req.app.get('db');
        db.get_characters([req.user.id]).then(characters => {
            characters.sort((a, b) => a.id < b.id);
            res.status(200).send(characters);
        });
    },
    readCharacter: (req, res) => {
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
    updateCharacter: (req, res) => {
        const db = req.app.get('db');
        db.characters.update({id: req.params.id}, req.body).then(characters => {
            if (req.user.id === characters[0].user_id) {
                res.status(200).send(characters);
            }
            else {
                res.status(401).send('Nice try suckaaaaaa!!!!!!');
            }
        });
    },
    deleteCharacter: (req, res) => {
    
    },
}