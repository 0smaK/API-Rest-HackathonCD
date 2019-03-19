'use strict'

const express = require('express')
const api = express.Router()
const userController = require('../controllers/user')
const musicController = require('../controllers/musica')

api.get('/users', userController.getUsers)
api.get('/user/:userId', userController.getUser)
api.delete('/user/:userId', userController.deleteUser)
api.put('/user/:userId', userController.updateUser)
api.post('/users', userController.addUser)

api.get('/music', musicController.getCanciones)
api.get('/music/:songId', musicController.getCancion)
api.post('/music', musicController.addSong)
api.put('/music/:songId',musicController.updateSong)
api.delete('/music/:songId',musicController.deleteSong)

module.exports = api