const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const SurveySchema = new mongoose.Schema({

    surveyName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        default:'default'
    },
    url:{
        type: String,
        default:'/surveyApp'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


SurveySchema.method({
});

/**
 * Statics
 */
SurveySchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Survey, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((survey) => {
        if (survey) {
          return survey;
        }
        const err = new APIError('No such survey exists!', httpStatus.NOT_FOUND);
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
 * @typedef Survey
 */
module.exports = mongoose.model('Survey', SurveySchema);