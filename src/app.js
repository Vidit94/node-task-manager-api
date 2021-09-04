const app = require('./index')
const port = process.env.PORT

app.listen(port, () => {
    console.log("Server is running on Port :" + port)
})

// app.use((req,res,next)=>{
//     console.log(req.method)
//     if(req.method=='GET'){
//         res.send("Get is disabled")
//     }
//     else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send("Under maintenance");
// })






// const jwt = require('jsonwebtoken');

// const myFunction = async () =>{
//     const token = jwt.sign({_id:'abc123'},process.env.JWT_SECRET,{expiresIn : '1 sec'})
//     console.log(token)
//     const data = jwt.verify(token,process.env.JWT_SECRET)
//     console.log(data)
// }

// myFunction()
// const bcrypt = require('bcryptjs')
// const myFunction = async()=>{
//     const password = "Red12345!";
//     const hashedPassword = await bcrypt.hash(password,8)
//     console.log(hashedPassword)

//     const isMatched = await bcrypt.compare('red12345!',hashedPassword)
//     console.log(isMatched)
// }
// const User = require('./models/user')

// const myFunction = async() =>{


//     // const task = await Task.findById('611e3cead462073a7cf70e1d')
//     // await task.populate('owner').execPopulate()
//     // console.log(task)

//     const user = await User.findById('611e2ded97bf0e3c20491a85')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// myFunction();


// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// })