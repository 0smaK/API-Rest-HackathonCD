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
api.get('/music/titulo/:songTitle',musicController.getCancionTitulo)
api.get('/music/artista/:songArtist',musicController.getCancionesArtista)
api.get('/music/genero/:songGenre',musicController.getCancionesGenero)
api.get('/music/year/:songYear',musicController.getCancionesYear)
api.get('/music/album/:songAlbum',musicController.getCancionesAlbum)
api.post('/music', musicController.addSong)
api.put('/music/:songId',musicController.updateSong)
api.delete('/music/:songId',musicController.deleteSong)


module.exports = api