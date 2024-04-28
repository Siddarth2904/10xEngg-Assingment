const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.get('/actors', actorController.getAllActors);
router.get('/actors/:id', actorController.getActorById);
router.post('/actors', actorController.addOrUpdateActor);

module.exports = router;
