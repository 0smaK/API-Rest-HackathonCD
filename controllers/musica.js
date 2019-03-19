'use strict'

const Music = require('../models/musica')

function getCancion(req, res) {
    let songID = req.params.songId

    Music.findById(songID, (err, cancion) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        })
        if (!cancion) return res.status(404).status({
            message: `no existe esa cancion`
        })

        res.status(200).send({
            cancion
        })
    })
}

function getCanciones(req, res) {
    Music.find({}, (err, canciones) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        })
        if (!canciones) return res.status(404).status({
            message: `No existen canciones`
        })

        res.status(200).send({
            canciones
        })
    })
}

function addSong(req, res) {
    console.log("Peticion POST: /music")
    console.log(req.body)

    let cancion = new Music()
    cancion.titulo = req.body.titulo
    cancion.artista = req.body.artista
    cancion.genero = req.body.genero
    cancion.year = req.body.year
    cancion.album = req.body.album

    cancion.save((err, cancionStored) => {
        if (err) res.status(500).send({
            message: `Error al guardar en la base de datos`
        })

        res.status(200).send({
            cancion: cancionStored
        })
    })
}

function updateSong(req, res) {
    let songID = req.params.songId
    let update = req.body

    Music.findOnersAndUpdate(songID, update, (err, songUpdated) => {
        if (err) res.status(500).send({
            message: `Error al actualizar la canción: ${err}`
        })

        res.status(200).send({
            cancion: songUpdated
        })
    })

}

function deleteSong(req, res) {
    let songID = req.params.songId

    Music.findById(songID, (err, song) => {
        if (err) return res.status(500).send({
            message: `Error al borrar la canción ${err}`
        })

        song.remove(err => {
            if (err) res.status(500).send({
                message: `Error al borrar la canción ${err}`
            })
            res.status(200).send({
                message: `La cancion se ha borrado correctamente`
            })
        })
    })
}

module.exports = {
    getCancion,
    getCanciones,
    addSong,
    updateSong,
    deleteSong
}