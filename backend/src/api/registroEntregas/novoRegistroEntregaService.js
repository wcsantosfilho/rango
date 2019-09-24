const RegistroEntrega = require('./registroEntrega')

// Endpoints da API
getAllPerson = async (req, res, next) => {
    try {
        var result = await RegistroEntrega.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

getOnePerson = async (req, res, next) => {
    try {
        var result = await RegistroEntrega.findById(req.params.id).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

addPerson = async (req, res, next) => {
    try {
        var person = await new RegistroEntrega(req.body)
        var result = person.save();
        res.send(person);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllPerson, getOnePerson, addPerson }
