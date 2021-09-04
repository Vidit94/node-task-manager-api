require('../src/db/mongoose')
const Task = require('../src/models/task')

// 60fe68cd470ee7507433b4b7
// Task.findByIdAndDelete('60fe68cd470ee7507433b4b7').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((countresult)=>{
//     console.log(countresult)
// }).catch((e)=>{
//     console.log(e)
// })

// 60f2eb1d779c0d1d207a5d08

const deleteAndCount = async (id)=>{
    await Task.findByIdAndDelete(id)
    return await (Task.countDocuments({completed:false}))
}

deleteAndCount('60f2eb1d779c0d1d207a5d08').then((count)=>{console.log(count)}).catch((e)=>{console.log(e)})