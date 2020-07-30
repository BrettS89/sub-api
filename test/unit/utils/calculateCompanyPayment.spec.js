const assert = require('chai').assert;
const calculateCompanyPayment = require('../../../src/utils/calculateCompanyPayment');

// one for percentage at cost
// one for hard cost at cost
const value1 = 12.93;
const output1 = calculateCompanyPayment(value1, '5e8508e0293b450017137874');

// one for percentage at nine
// one for hard cost at nine
const output2 = calculateCompanyPayment(value1, '5e8508e0293b450017302874');

describe('calculateCompanyPayment', () => {
	it('Should return a number', () => {
		assert.typeOf(output1, 'number');
	});

	it('Should return price minus 2.9% minus 30 cents', () => {
		let amount = value1 - value1 * 0.029 - 0.3;
		amount = amount.toFixed(2);
		amount = Math.round(amount * 100);
		assert.equal(amount, output1);
	});

	it('Should return a value of 1226', () => {
		assert.equal(output1, 1226);
	});

	it('Should return price - 9%', () => {
		const toRemove = value1 * 0.09;
		let amount = (value1 - toRemove).toFixed(2);
		amount = Math.round(amount * 100);
		assert.equal(amount, output2);
	});

	it('Should return a value of 1177', () => {
		assert.equal(output2, 1177);
	});
});
