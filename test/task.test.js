const request = require('supertest')
const task = require('../src/models/task')
const app = require('../src/index')
const {userOne,userOneId,setUpDatabase} = require('./fixtures/db')

beforeEach(setUpDatabase)

test('Should Create taskk for user', async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:"First task"
        })
        .expect(201)
})