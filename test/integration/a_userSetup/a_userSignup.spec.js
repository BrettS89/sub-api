const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);

describe('userRegister', async () => {
	before(async () => {
		await mongoose.connection.db.dropDatabase();
		describe('/api/user/register', () => {
			it('Should respond with a status 201', async () => {
				const res = await chai.request(app).post('/api/user/register').send({
					email: 'blsodie@gmail.com',
					password: 'password',
				});
				expect(res).to.have.status(201);
			});

			it('Should respond with a status 400', async () => {
				const res = await chai.request(app).post('/api/user/register').send({
					email: 'blsodie@gmail.com',
					password: 'password',
				});
				expect(res).to.have.status(400);
			});

			it('Should return an auth token', async () => {
				const res = await chai.request(app).post('/api/user/register').send({
					email: 'blsodie2@gmail.com',
					password: 'password',
				});
				const token = res.body.data.token;
				assert.typeOf(token, 'string');
			});

			it('Should return an user object', async () => {
				const res = await chai.request(app).post('/api/user/register').send({
					email: 'blsodie3@gmail.com',
					password: 'password',
				});
				const user = res.body.data.user;
				assert.typeOf(user, 'object');
			});
		});
	});
	it('Dummy test case, so before is executed', () => assert.strictEqual(1, 1));
});
