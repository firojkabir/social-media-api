const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index")

require("dotenv").config()

let token = ''

beforeEach(done => {
	mongoose.connect(process.env.DB_URL)
	done()
})

afterEach(done => {
	mongoose.connection.close()
	done()
})

// describe("Create user", () => {
// 	it('should create an user', async () => {
// 		const res = await request(app).post('/auth/register').send({
// 			name: "Batman",
// 			email: "batman@gmail.com",
// 			password: "asd123",
// 			age: 25,
// 			country: "BD"
// 		})
// 		expect(res.statusCode).toBe(201)
// 		expect(res.body.name).toBe('Batman')
// 	})
// })

describe('User login', () => {
	it('should login user', (done) => {
		request(app)
			.post("/auth/login")
			.send({
				email: "rimon2665@gmail.com",
				password: "asd123"
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				token = res.body['token'] 
				done()
			})
	})
})

// describe('Get /users', () => {
// 	it('should return the user', (done) => {
// 		request(app)
// 			.get('/users')
// 			.set('Authorization', `Bearer ${token}`)
// 			.expect(200)
// 			.end((err, res) => {
// 				if (err) return done(err)
// 				return done()
// 			})
// 	})
// })

// describe('Get user by id /users/:id', () => {
// 	it('should return a user by id', async () => {
// 		const res = await request(app)
// 			.get('/users/646ce1f563f250f051e60f2f')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 			expect(res.body.email).toEqual('batman@gmail.com')
// 	})
// })

// describe('Update a user /users/:id', () => {
// 	it('should update a user', async () => {
// 		const res = await request(app)
// 			.put('/users/646ce1f563f250f051e60f2f')
// 			.set('Authorization', `Bearer ${token}`)
// 			.send({
// 				name: 'Batman updated',
// 				email: 'batman@gmail.com',
// 				password: 'asd123',
// 				age: 25,
// 				country: 'BD'
// 			})
// 			expect(res.status).toEqual(200)
// 			expect(res.body.name).toEqual('Batman updated')
// 	})
// })

describe('Follow a user', () => {
	it('should follow a user', async () => {
		const res = await request(app)
			.put('/users/646ce1f563f250f051e60f2f/follow')
			.set('Authorization', `Bearer ${token}`)
			expect(res.status).toEqual(200)
	})
})

// describe('Unfollow a user', () => {
// 	it('should unfollow a user', async () => {
// 		const res = await request(app)
// 			.put('/users/646cbfdb7e6a85476715237a/unfollow')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 	})
// })

// describe('Delete a user, /user/:id', () => {
// 	it('should delete a user', async () => {
// 		const res = await request(app)
// 			.delete('/users/6469f1964f3553d5c9087ae2')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 	})
// })
