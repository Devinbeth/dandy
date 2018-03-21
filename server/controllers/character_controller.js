module.exports = {
    createCharacter: (req, res) => {
        console.log(req.body);
        const db = req.app.get('db');
        db.characters.insert(req.body).then(character => {
            console.log(character);
            if (req.user.id === character[0].user_id) {
                res.status(200).send(character);
            }
            else {
                res.status(401).send('Nice try suckaaaaaa!!!!!!');
            }
        });
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