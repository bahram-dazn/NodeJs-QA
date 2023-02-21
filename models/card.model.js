const Joi = require('joi');
const checkLuhn = require('./../utils/card.util.js');

carSchema = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z ]*$/).required().min(0).max(20),
  pan: Joi.string().required().min(0).max(19).custom((value, helper) => {

    if (!checkLuhn(value)) {
        return helper.message("This is not a valid card")

    } else {
        return true
    }
  }),
  limit: Joi.number().integer().required(),
  balance: Joi.number().integer()
});
module.exports = carSchema;