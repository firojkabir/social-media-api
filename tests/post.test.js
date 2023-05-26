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

describe('User login', () => {
	it('should login user', (done) => {
		request(app)
			.post("/auth/login")
			.send({
				email: "batman@gmail.com",
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

describe('Create a post', () => {
	it('should create a post', async () => {
		const res = await request(app).post("/posts")
			.send({
				content: "Following day will be brighter :)"
			})
			.set('Authorization', `Bearer ${token}`)
			expect(res.status).toEqual(201)
			expect(res.body.content).toEqual('Following day will be brighter :)')
	})
})

// describe('Get /posts', () => { 
// 	it('should return all the posts', async () => {
// 		const res = await request(app)
// 			.get('/posts')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 	})
// })

// describe('Get a single post, /posts/:id', () => { 
// 	it('should return a post by id', async () => {
// 		const res = await request(app)
// 			.get('/posts/646de021aa609ccccf496a7a')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 			expect(res.body.content).toEqual('Tomorrow will be brighter :)')
// 	})
// })

// describe('Update a post, /posts/:id', () => { 
// 	it('should update a post by id', async () => {
// 		const res = await request(app)
// 			.put('/posts/646de021aa609ccccf496a7a')
// 			.set('Authorization', `Bearer ${token}`)
// 			.send({
// 				content: 'Tomorrow will be sunny :)'
// 			})
// 			expect(res.status).toEqual(200)
// 			expect(res.body.content).toEqual('Tomorrow will be sunny :)')
// 	})
// })

// describe('Like/unlike a post, /posts/:id/like', () => {
// 	it('should like/unlike a post by id', async () => {
// 		const res = await request(app)
// 			.put('/posts/646de021aa609ccccf496a7a/like')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 	})
// })

// describe('Delete a post, /posts/:id', () => {
// 	it('should delete a post', async () => {
// 		const res = await request(app)
// 			.delete('/posts/646ddf6d2a365623d977525d')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 	})
// })
