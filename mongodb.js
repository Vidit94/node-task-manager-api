// const mongodb = require('mongodb');
// // const MongoClient = mongodb.MongoClient;
// // const ObjectID = mongodb.ObjectID;

// const {MongoClient,ObjectID} = mongodb;
// // const id =ObjectID();
// // console.log(id)
// // console.log(id.getTimestamp())

// const connectionUrl = 'mongodb://127.0.0.1:27017';
// const databaseName = 'task-manager';

// MongoClient.connect(connectionUrl,{useNewUrlParser : true , useUnifiedTopology: true,} ,(error,client)=>{
//     if(error){
//        return console.log('Unable to connect to database : '+ error)      
//     }
//     // console.log('Connected Successfully')
//     const db = client.db(databaseName);
//     // db.collection('users').insertOne({
//     //     name : 'Try User',
//     //     age : 27
//     // },(error,result)=>{
//     //     if(error){   
//     //         return console.log('error occured : '+error)  
//     //     }
//     //     console.log(result.ops)
//     // })

//     // db.collection('users').insertMany([{
//     //     name : 'Jen',
//     //     age:28
//     // },{
//     //     name : 'Ross',
//     //     age:29
//     // }],(error,result) => {
//     //     if(error){
//     //         return console.log('error occured : '+error)
//     //     }
//     //     console.log(result.ops)
//     // })


//     // db.collection('tasks').insertMany([{
//     //     description:"Create an task Collection",
//     //     completed:true
//     // },{
//     //     description:"Use Insert On method",
//     //     completed:false
//     // },{
//     //     description:"Check the documnet in compass",
//     //     completed:true
//     // }],
//     // (error,result)=>{
//     //     if(error){
//     //         return console.log(error)
//     //     }
//     //     else{
//     //         console.log(result.ops)
//     //     }
//     // })
	
	
// })


// // CRUD create read update delete

// const { MongoClient, ObjectId } = require('mongodb')

// const connectionURL = 'mongodb://127.0.0.1:27017'
// // const databaseName = 'task-manager'
// const databaseName = 'testDB'


// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }

//     const db = client.db(databaseName)
    
//     // db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {
//     //     if (error) {
//     //         return console.log('Unable to fetch')
//     //     }

//     //     console.log(user)
//     // })

//     // db.collection('users').find({ age: 27 }).toArray((error, users) => {
//     //     console.log(users)
//     // })

//     // db.collection('tasks').findOne({ _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
//     //     console.log(task)
//     // })

//     // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
//     //     console.log(tasks)
//     // })

// //     const updatePromise = db.collection('users').updateOne({
// //         _id: new ObjectId("60ed8ffa33457a4224c47609")
// //     },{
// //         $set:{
// //             name:"Vidit"
// //         }
// //     })

// //     updatePromise.then((result)=>{
// //         console.log(result)
// //     }).catch((error)=>{
// //         console.log(error)
// //     })



// // ---------------------OR---------------------------------

// // db.collection('users').updateOne({
// //     _id: new ObjectId("60ed8ffa33457a4224c47609")
// // },{
// //     $set:{
// //         name:"Vidit1"
// //     }
// // }).then((result)=>{
// // console.log(result)
// // }).catch((error)=>{
// //     console.log(error)
// // })
// // // })

// // db.collection('users').updateOne({
// //     _id: new ObjectId("60ed8ffa33457a4224c47609")
// // },{
// //     $inc:{
// //         age:1
// //     }
// // }).then((result)=>{
// // console.log(result)
// // }).catch((error)=>{
// //     console.log(error)
// // })
// // db.collection('users').updateOne({
// //     _id: new ObjectId("60ed8ffa33457a4224c47609")
// // },{
// //     $rename:{
// //         age1:"age"
// //     }
// // }).then((result)=>{
// // console.log(result)
// // }).catch((error)=>{
// //     console.log(error)
// // })

// // db.collection('users').updateMany({
// //     age:34
// // },{
// //     $set:{
// //         age:32
// //     }
// // }).then((result)=>{
// //     console.log(result.modifiedCount)
// // }).catch((error)=>{
// //     console.log(error)
// // })

// db.collection('users').deleteMany({
//     age:32
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })
// })


