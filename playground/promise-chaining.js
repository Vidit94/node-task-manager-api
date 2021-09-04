require('../src/db/mongoose')
const User = require('../src/models/user')

// 60fe68cd470ee7507433b4b6
User.findByIdAndUpdate('60fe68cd470ee7507433b4b6',{age :1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((countresult)=>{
    console.log(countresult)
}).catch((e)=>{
    console.log(e)
})


const updateAgeAndCount = async(id,age1)=>{
await User.findByIdAndUpdate(id,{age:age1});
return(await User.countDocuments({age:age1}))
}

updateAgeAndCount('60f2a90078718e3d68da3c89',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log('e', e)
})