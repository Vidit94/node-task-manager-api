const express = require('express')
const router = new express.Router();
const User = require('./../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload an image'))
        }

        callback(undefined, true)
    }
})


router.get('/test', (req, res) => {
    res.send("From a new File")
})

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const result = await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthenticationToken()
        // console.log('result ',result);
        res.status(201).send({ result, token }) 
    }
    catch (e) {
        console.log('e : ', e);
        res.status(400).send(e)
    }

    // user.save().then((result)=>{
    //     res.status(201).send(result)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentails(req.body.email, req.body.password)
        const token = await user.generateAuthenticationToken();
        res.send({ user, token })
    }
    catch (e) {
        console.log(e)
        res.status(400).send("Invalid Login")
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("")
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        // const users = await User.find();
        // res.send(users)
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send("Service is down")
    }
    // User.find().then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send("Service is down")
    // })
})

router.patch('/users/me', auth, async (req, res) => {
    try {


        const updates = Object.keys(req.body)
        // console.log(updates)
        const allowedupdates = ['name', 'email', 'password', 'age']
        const isvalidOperation = updates.every((update) => allowedupdates.includes(update))
        // console.log(isvalidOperation)
        if (!isvalidOperation) {
            return res.status(400).send({ error: 'Invalid Updates' })
        }

        const user = await User.findById(req.user.id);
        if (user) {
            updates.forEach((update) => user[update] = req.body[update])
            await user.save();
        }

        // if(updates)
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).end("User Not found in DB with this ID")
        }
        res.send(user)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


// router.get('/users/:id', async (req, res) => {

//     const name = req.params.id;
//     try {
//         const result = await User.findOne({ name: name });
//         if (!result) {
//             res.status(400).send("data Not found")
//         }
//         res.send(result)
//     } catch (e) {
//         res.status(500).send(e)
//     }
//     // User.findOne({name:name}).then((result)=>{
//     //     if(!result){
//     //         res.status(400).send("data Not found")
//     //     }
//     //     res.send(result)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)
//     // })
// })



// router.patch('/users/:id', async (req, res) => {
//     try {


//         const updates = Object.keys(req.body)
//         // console.log(updates)
//         const allowedupdates = ['name', 'email', 'password', 'age']
//         const isvalidOperation = updates.every((update) => allowedupdates.includes(update))
//         // console.log(isvalidOperation)
//         if (!isvalidOperation) {
//             return res.status(400).send({ error: 'Invalid Updates' })
//         }

//         const user = await User.findById(req.params.id);
//         if (user) {
//             updates.forEach((update) => user[update] = req.body[update])
//             await user.save();
//         }

//         // if(updates)
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if (!user) {
//             res.status(404).end("User Not found in DB with this ID")
//         }
//         res.send(user)
//     }
//     catch (e) {
//         console.log(e)
//         res.status(500).send(e)
//     }
// })
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
    sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error("User/Image not found")
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }
    catch (e) {
        res.status(404).send({ error: e.message })
    }
})
// router.delete('/users/:id',auth, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send("user not found")
//         }
//         res.send(user)
//     } catch (e) {
//         console.log(e)
//         res.status(500).send(e)
//     }
// })

// router.get('/users/:id',(req,res)=>{
//     const _id = req.params.id;
//     User.findById({_id}).then((result)=>{
//         if(!result){
//             res.status(400).send("data Not found")
//         }
//         res.send(result)
//     }).catch((e)=>{
//         res.status(500).send("Error with the data")
//     })
// })

module.exports = router;