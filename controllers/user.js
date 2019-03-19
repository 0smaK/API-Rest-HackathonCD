'use strict'

const User = require('../models/user')

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

function addUser(req, res) {
    console.log("Petición POST: /users")
    console.log(req.body)

    let user = new User()
    user.nombre = req.body.nombre
    user.apellidos = req.body.apellidos
    user.username = req.body.username
    user.password = req.body.password
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

function updateUser(req, res) {
    let userID = req.params.userId
    let update = req.body

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
    getUsers,
    addUser,
    updateUser,
    deleteUser
}