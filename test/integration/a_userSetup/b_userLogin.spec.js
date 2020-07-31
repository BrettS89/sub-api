const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const data = require('../../data');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);

describe('userLogin', async () => {
	before(async () => {
		describe('/api/user/login', () => {
			it('Should respond with a status 200', async () => {
				const res = await chai.request(app).post('/api/user/login').send({
					email: 'blsodie@gmail.com',
					password: 'password',
				});
				expect(res).to.have.status(200);
			});

			it('Should return an auth token', async () => {
				const res = await chai.request(app).post('/api/user/login').send({
					email: 'blsodie@gmail.com',
					password: 'password',
				});
				const token = res.body.data.token;
				data.token = token;
				assert.typeOf(token, 'string');
			});

			it('Should return an user object', async () => {
				const res = await chai.request(app).post('/api/user/login').send({
					email: 'blsodie@gmail.com',
					password: 'password',
				});
				const user = res.body.data.user;
				assert.typeOf(user, 'object');
			});

			it('Should respond with a status 401', async () => {
				const res = await chai.request(app).post('/api/user/login').send({
					email: 'blsodie@gmail.com',
					password: 'password1',
				});
				expect(res).to.have.status(401);
			});

			it('Should respond with a status 404', async () => {
				const res = await chai.request(app).post('/api/user/login').send({
					email: 'blsodi@gmail.com',
					password: 'password1',
				});
				expect(res).to.have.status(404);
			});
		});
	});
	it('Dummy test case, so before is executed', () => assert.strictEqual(1, 1));
});
