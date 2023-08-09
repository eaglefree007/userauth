const userController = require('../controller/userController')

const Router = require("express").Router()
Router.get("/user",userController.getUser)
Router.post("/user",userController.addUser)
Router.patch("/user/:id",userController.updateUser)

module.exports = Router