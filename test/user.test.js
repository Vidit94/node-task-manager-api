const request = require('supertest')

const User = require('../src/models/user')
const app = require('../src/index')
const {userOne,userOneId,setUpDatabase} = require('./fixtures/db')

beforeEach(setUpDatabase)
// afterEach(()=>{
//     console.log("after Each")
// })

test('should signUp a new User', async () => {
    const response = await request(app).post('/users').send({
        name: 'Vidit',
        email: 'vidit@example.com',
        password: 'Mypass777!'
    }).expect(201)
// Assert that the data is created in DB
    const user = await User.findById(response.body.result._id)
    expect(user).not.toBeNull()

    // Assert  response bode name is same as we sent

    expect(response.body).toMatchObject({
        result:{
            name : 'Vidit',
            email: 'vidit@example.com'
        }
    })

})

test('Should login to the user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const userDB = await User.findById(userOneId)
    console.log("------------------")
    console.log(userDB)
    expect (response.body.token).toBe(userDB.tokens[1].token)
})

test('Should not login to the user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'Passskjsdhf'
    }).expect(400)
})

test('Should get Profile for User', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get Profile for User', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

// test('Should save the avatar for User', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
//         .attach('../node-course-images/profile-pic.jpg')
//         .expect(200)

//     const userDb = await User.findById(userOneId)
//     expect(userDb.avatar).toEqual(expect.any(Buffer))
// })

test('Should delete Profile for User', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const userDb = await User.findById(userOneId)
    expect(userDb).toBeNull()
})

test('Should not delete Profile for User', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})