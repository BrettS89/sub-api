const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const data = require('../../data');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);

describe('isLoggedIn', async () => {
	before(async () => {
		describe('/api/user/isloggedin', async () => {
			it('Should respond with a status 200', async () => {
				const res = await chai.request(app).get('/api/user/isloggedin').set({
					authorization: data.token,
				});

				expect(res).to.have.status(200);
			});

			it('Should respond with a user object', async () => {
				const res = await chai.request(app).get('/api/user/isloggedin').set({
					authorization: data.token,
				});
				const user = res.body.data.user;
				assert.typeOf(user, 'object');
			});

			it('Should respond with a status of 401', async () => {
				const res = await chai.request(app).get('/api/user/isloggedin').set({
					authorization: '',
				});

				expect(res).to.have.status(401);
			});
		});
	});
	it('Dummy test case, so before is executed', () => assert.strictEqual(1, 1));
});
