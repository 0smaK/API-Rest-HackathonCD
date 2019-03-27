'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    nombre: {type: String, required: true },
    apellidos: {type: String, require: true },
    username: {type: String, unique: true, required:true},
    password: {type: String, required: true},
    profilePic: { type: String, default: 'default.png' },
    lastLogin: Date,
    signUpDate: {type: Date, default: Date.now() }  
})

module.exports = mongoose.model('User', UserSchema)