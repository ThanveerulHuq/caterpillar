const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const ResponseSchema = new mongoose.Schema({

   
    survey: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: false,
    },
    response: {
        type: String,
        default:'default'
    },
    skipped:{
        type: String,
        default:'default'
    }
});


ResponseSchema.method({
});

/**
 * Statics
 */
ResponseSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<response, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((response) => {
        if (response) {
          return response;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Survey[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },


  bulkInsert(data){
      return this.insertMany(data);
  }
};

/**
 * @typedef response
 */
module.exports = mongoose.model('response', ResponseSchema);