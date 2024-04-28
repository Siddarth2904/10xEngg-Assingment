const Actor = require('../models/actor'); // Import the Actor model

exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.findAll();
        res.json(actors);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getActorById = async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await Actor.findByPk(id);
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.json(actor);
    } catch (error) {
        console.error('Error fetching actor by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addOrUpdateActor = async (req, res) => {
    try {
        const { name, movies_associated } = req.body;

        const existingActor = await Actor.findOne({ where: { name } });

        if (existingActor) {
            await existingActor.update({ movies_associated });
            res.status(200).json({ message: 'Actor updated successfully' });
        } else {
            await Actor.create({ name, movies_associated });
            res.status(201).json({ message: 'Actor added successfully' });
        }
    } catch (error) {
        console.error('Error adding/updating actor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteActorById = async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await Actor.findByPk(id);

        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }

        await actor.destroy();
        res.status(200).json({ message: 'Actor deleted successfully' });
    } catch (error) {
        console.error('Error deleting actor by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
