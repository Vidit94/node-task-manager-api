const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth');

const Task = require('./../models/task')

router.post('/tasks', auth, async (req, res) => {
    try {
        // const task = new Task(req.body);
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        const result = await task.save();
        res.status(201).send(result)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

})

//   /tasks?completed=true
//   /tasks?limit=10&skip=0&sortBy=completed:desc
router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({owner: req.user.id});
        const match = {};
        const sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
        }
        const user1 = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(user1.tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user.id });
        if (!task) {
            res.status(400).send('Data Not Found')
        }
        res.send(task)

    } catch (e) {
        res.status(500).send();
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedupdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowedupdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid Update" })
        }

        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (task) {
            updates.forEach((update) => task[update] = req.body[update])
            await task.save();
        }
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send({ error: "Id Not found" })
        }
        res.status(200).send(task)
    }
    catch (e) {
        return res.status(500).send({ error: e })
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;