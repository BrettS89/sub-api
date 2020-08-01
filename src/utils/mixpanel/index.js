const Mixpanel = require('mixpanel');
const keys = require('../../config');
module.exports = Mixpanel.init(keys.mixpanelToken);
