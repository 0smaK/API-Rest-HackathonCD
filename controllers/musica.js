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

function getCancionCateg(req, res) {
    let categPosibles = ['id','titulo','artista','year','album','genero']
    let songValue = req.params.songValue
    let categ = req.params.songCateg
    let query = {}
    query[categ] = songValue

    if (categ == "titulo") {


        Music.findOne(query, (err, cancion) => {
            if (err) return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            })

            if (!cancion) return res.status(404).send({
                message: `No existe la canción ${songValue} dentro de ${categ}`
            })

            res.status(200).send({
                cancion
            })
        })

    } else if(categ=="id") {
        Music.findById(songValue, (err, cancion) => {
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

    } else if (categPosibles.includes(categ)) {


        Music.find(query, (err, canciones) => {
            if (err) return res.status(500).send({
                message: `Error al realizar la petición ${err}`
            })

            if (!canciones) return res.status(404).send({
                message: `No existe ninguna coincidencia con el artista ${songValue} dentro de ${categ}`
            })

            res.status(200).send({
                canciones
            })
        })
    }else{
        res.status(404).send({
            message: `El parametro ${categ} no existe, prueba con los siguientes ${categPosibles}`
        })
    }
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

    Music.findOneAndUpdate(songID, update, (err, songUpdated) => {
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
    getCancionCateg,
    getCanciones,
    addSong,
    updateSong,
    deleteSong
}