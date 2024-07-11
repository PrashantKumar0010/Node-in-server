const path = require('path')
const express = require('express')
const fs = require('fs')
const MyUrl = require('url')
const router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json())
const NewPath = path.join(__dirname, '../models/personData.js')
const person = require(NewPath)


router.get('/', async (req, res) => {
    try {

        const UserData = await person.find({})
        console.log("show Data: ")
        res.status(200).json(UserData)

    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })
    }
})

router.get('/user', async (req, res) => {
    try {
        let d = new Date();
        let NewData = d.toString().slice(0, 24)
        const path = MyUrl.parse(req.url, true)
        const searchKey = path.query.mobile
        const UserData = await person.find({ mobile: searchKey })
        if (UserData.length == 0) {
            res.json({ Status: 'no data found' })
        } else {
            fs.appendFile('log.txt', `date ${NewData} path ${JSON.stringify(path)} searchingKey ${searchKey}, data--> ${UserData}\n`, (err) => {
                console.log()
            })
            res.status(200).json(UserData)
        }

    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })
    }
})

router.post('/', async (req, res) => {
    //  using try and catch for handling the error
    try {
        const InComingData = req.body
        const NewPerson = new person(InComingData)
        const SavePerson = await NewPerson.save()
        console.log("data saved: ")
        res.status(200).json(SavePerson)

    } catch (error) {
        console.log("error saving person: ", error)
        res.status(500).send({ error: 'internal server error' })
    }
})
router.put('/update/:id', async (req, res) => {
    try {
        const personId = req.params.id
        const NewData = req.body
        const UserData = await person.findByIdAndUpdate(personId, NewData, {
            new: true,
            runValidators: true
        })

        if (!UserData) {
            res.status(404).json({ error: 'Person Not found: ' })
        }


        res.status(200).json(UserData)
    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })
    }

})

router.delete('/:mobile', async (req, res) => {

    try {
        const deleteKey = req.params.mobile
        console.log(deleteKey)
        const deleteData = await person.findOneAndDelete({ mobile: deleteKey })
        if (!deleteData) {
            res.status(400).json({ status: 'no data found' })
        }
        else {
            res.status(200).json([{ status: deleteData }, { User_id: deleteData._id }])
        }
    } catch (error) {
        console.log("Internal error: ", error)
        res.status(500).send({ error: 'Not found' })

    }
})

module.exports = router