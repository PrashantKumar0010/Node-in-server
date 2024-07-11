const path = require('path')
const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json())
const NewPath = path.join(__dirname, '../models/menu.js')
console.log(NewPath)
const menu = require(NewPath)

router.get('/', async (req, res) => {

    res.status(200).json({ status: "ok" })
})

router.get('/showRecipe', async (req, res) => {
    try {
        const UserData = await menu.find({})
        res.status(200).json(UserData)

    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })
    }
})
router.get('/GetRecipe/:recipeName', async (req, res) => {
    try {
        const searchKey = req.params.recipeName
        console.log('searchKey ', searchKey)
        const UserData = await menu.find({ name: searchKey })
        res.status(200).json(UserData)

    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })
    }
})
router.post('/AddItem', async (req, res) => {
    try {
        const InComingData = req.body
        const NewPerson = new menu(InComingData)
        const SavePerson = await NewPerson.save()
        console.log("data saved: ")
        res.status(200).json(SavePerson)

    } catch (error) {
        console.log("error saving person: ", error)
        res.status(500).send({ error: 'internal server error' })
    }

})
router.delete('/deleteRecipe/:name', async (req, res) => {
    try {
        const deleteKey = req.params.name
        const deleteData = await menu.deleteOne({ name: deleteKey })
        res.status(201).json(deleteData)
    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })
    }
})
module.exports = router