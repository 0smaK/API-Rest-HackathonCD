'use strict'

const User = require('../models/user')
const helpers = require('../lib/helpers');

function getUser(req, res) {
    let userID = req.params.userId

    User.findById(userID, (err, user) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la peticion: ${err}`
        })
        if (!user) return res.status(404).send({
            message: `El usuario no existe`
        })

        res.status(200).send({
            user
        })
    })
}

function getUserByUsername(req, res) {
    let username = req.params.username
    let query = {}
    query['username'] = username

    User.findOne(query, (err, user) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la peticion: ${err}`
        })
        if (!user) return res.status(404).send({
            message: `El usuario no existe`
        })

        res.status(200).send({
            user
        })
    })
}

function login(req, res) {
    var userLogin = req.body
    console.log(userLogin)
    User.findOne({ username: userLogin.username }, async (err, user) => {
        if (err) return res.status(500).send({ message: `Error ${err}` })
        if (!user) return res.status(404).send({ message: 'El usuario no existe' })

        if (!user.isDeleted) {
            var validPassword = await helpers.compararPassword(userLogin.password, user.password);
            if (validPassword) {
                res.status(200).send({ valid:true })
            }else{
                res.status(400).send({message: "contraseña no valida"})
            }
        }

    })
}

function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la petición: ${err}`
        })
        if (!users) return res.status(404).send({
            message: `No existen usuarios`
        })

        res.status(200).send({
            users
        })
    })
}

async function addUser(req, res) {
    console.log("Petición POST: /users")
    console.log(req.body)

    let user = new User()
    user.nombre = req.body.nombre
    user.apellidos = req.body.apellidos
    user.username = req.body.username
    user.password = await helpers.encriptarPassword(req.body.password);
    user.foto = req.body.foto



    user.save((err, userStored) => {
        if (err) res.status(500).send({
            message: `Error al guardar en la base de datos: ${err}`
        })
        res.status(200).send({
            user: userStored
        })
    })
}

async function updateUser(req, res) {
    let userID = req.params.userId
    let update = req.body
    update.password = await helpers.encriptarPassword(req.body.password);

    User.findByIdAndUpdate(userID, update, (err, userUpdated) => {
        if (err) res.status(500).send({
            message: `Error al actualizar el usuario: ${err}`
        })

        res.status(200).send({
            user: userUpdated
        })
    })
}

function deleteUser(req, res) {
    let userID = req.params.userId

    User.findById(userID, (err, user) => {
        if (err) return res.status(500).send({
            message: `Error al borrar el usuario: ${err}`
        })

        user.remove(err => {
            if (err) res.status(500).send({
                message: `Error al borrar el usuario:: ${err}`
            })
            res.status(200).send({
                message: `El usuario se ha eliminado correctamente`
            })
        })
    })
}

module.exports = {
    getUser,
    getUserByUsername,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    login
}