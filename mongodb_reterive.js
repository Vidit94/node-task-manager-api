const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient,ObjectID} = mongodb;
// const id =ObjectID();
// console.log(id)
// console.log(id.getTimestamp())

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl,{ useUnifiedTopology: true },(error,client)=>{
    const db = client.db(databaseName);
    // db.collection('users').findOne({name:"Jen"},(error,response)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(response)
    // })
    // db.collection('users').findOne({age:27},(error,response)=>{
        // db.collection('users').findOne({_id:new ObjectID('60ed395734b7e424989d0700')},(error,response)=>{
    //     if(error){
    //                 return console.log(error)
    //             }
    //     console.log(response)
    // })
    // db.collection('users').find({age:27}).toArray((error,response)=>{
    //     console.log(response)
    // })
    // db.collection('users').find({age:27}).count((error,count)=>{
    //     console.log(count)
    // })
})

