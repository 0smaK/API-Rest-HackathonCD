'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MusicSchema = Schema({
    titulo: String,
    artista: String,
    genero: String,
    year: Number,
    album: String
})

module.exports = mongoose.model('Music', MusicSchema)