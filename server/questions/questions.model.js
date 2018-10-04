const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const QuestionsSchema = new mongoose.Schema({

   
    survey: {
        type: String,
        required: true
    },
    question_no: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        default:'default'
    },
    type:{
        type: String,
        default:'default'
    },
    options: {
        type: [String],
        default: 'default'
    },
    optional:{
        type: String,
        default: 'default'
    }
});


QuestionsSchema.method({
});

/**
 * Statics
 */
QuestionsSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Survey, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((questions) => {
        if (questions) {
          return questions;
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
  }
};

/**
 * @typedef questions
 */
module.exports = mongoose.model('questions', QuestionsSchema);