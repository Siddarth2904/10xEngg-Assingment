const Movie = require('../models/movie');

exports.getAllMovies = async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    res.json(movie);
};

exports.addOrUpdateMovie = async (req, res) => {
    try {
        const { name, year_of_release, ratings, genres, technicians } = req.body;

        const existingMovie = await Movie.findOne({ where: { name } });

        if (existingMovie) {
            await existingMovie.update({
                year_of_release,
                ratings,
                genres,
                technicians,
            });
            res.status(200).json({ message: 'Movie updated successfully' });
        } else {
            await Movie.create({
                name,
                year_of_release,
                ratings,
                genres,
                technicians,
            });
            res.status(201).json({ message: 'Movie added successfully' });
        }
    } catch (error) {
        console.error('Error adding/updating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};