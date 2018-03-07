module.exports = {
    create: (req, res) => {
    
    },
    readCharacters: (req, res) => {
        const db = req.app.get('db');
        db.get_characters([req.user.id]).then(characters => {
            res.status(200).send(characters);
        });
    },
    readCharacter: (req, res) => {
        const db = req.app.get('db');
        db.get_characters([req.user.id]).then(characters => {
            res.status(200).send(characters);
        });
    },
    update: (req, res) => {
    
    },
    delete: (req, res) => {
    
    },
}