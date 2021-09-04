// const mongoose = require('mongoose');
// const validator = require('validator')

// const url = process.env.MONGODB_URL


// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim:true
//     },
//     age: {
//         type: Number,
//         default:0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be positive Number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim:true,
//         minLength:7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('password cannot be Password !')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim:true,
//         lowercase:true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     }

// })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim:true,
//         required:true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const new_user = new User({
//     name: "   Jen  ",
//     email: "   email@email.com   ",
//     password:"   123443556"
// })

// const new_task =  new Task({
//     description:"First Task",
//     completed: true
// })

// new_task.save().then((result)=>{
//     console.log("Success: "+result)
// }).catch((error)=>{
//     console.log("Error occured : "+error)
// })

// new_user.save().then((result) => {
//     console.log("Success: " + result)
// }).catch((error) => {
//     console.log("Error occured : " + error)
// })