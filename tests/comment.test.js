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

// describe('Add a comment', () => {
// 	it('should add a comment', async () => {
// 		const res = await request(app).post("/comments")
// 			.send({
// 				postId: "646e6251a34105ae63319ac6",
// 				content: "Let's have BBQ"
// 			})
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(201)
// 			expect(res.body.content).toEqual('Let\'s have BBQ')
// 	})
// })

// describe('Get /comments', () => { 
// 	it('should return all the comments', async () => {
// 		const res = await request(app)
// 			.get('/comments')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 	})
// })

// describe('Get a single comment, /comments/:id', () => { 
// 	it('should return a comment by id', async () => {
// 		const res = await request(app)
// 			.get('/comments/646e35620ab9b90004fe8225')
// 			.set('Authorization', `Bearer ${token}`)
// 			expect(res.status).toEqual(200)
// 			expect(res.body.content).toEqual('Late sun')
// 	})
// })

// describe('Update a comment, /comments/:id', () => { 
// 	it('should update a comment by id', async () => {
// 		const res = await request(app)
// 			.put('/comments/646e630c232fc32d38a183b4')
// 			.set('Authorization', `Bearer ${token}`)
// 			.send({
// 				postId: '646e6251a34105ae63319ac6',
// 				content: 'Planning for BBQ'
// 			})
// 			expect(res.status).toEqual(200)
// 			expect(res.body.content).toEqual('Planning for BBQ')
// 	})
// })

describe('Delete a comment, /comments/:id', () => {
	it('should delete a comment', async () => {
		const res = await request(app)
			.delete('/comments/646f242dace52b877bbc395b')
			.set('Authorization', `Bearer ${token}`)
			expect(res.status).toEqual(200)
	})
})
