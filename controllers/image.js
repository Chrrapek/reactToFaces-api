const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ffcb55ca585f499d9d1d3cd03a14dc52'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(() => res.status(400).json('Unable to get answer from API'))
};

const imageHandler = (req, res, db) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(() => res.status(400).json("Unable to get entries"));
};

module.exports = {
    handleImageIncrementation: imageHandler,
    handleApiCall: handleApiCall
};
