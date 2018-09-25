const Survey= require('./survey.model')


/**
 * Create new user
 * @property {string} req.body.surveyName 
 * @property {string} req.body.description
 * @property {string} req.body.theme 
 * @property {string} req.body.url
 * @returns {Survey}
 */
function create(req, res, next) {
    console.log('in survey controller');
    const survey = new Survey({
        surveyName: req.body.surveyName,
        description: req.body.description,
        theme: req.body.theme,
        url: req.body.url
    });
  
    survey.save()
      .then(savedSurvey => res.json(savedSurvey))
      .catch(e => next(e));
  }

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Survey[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Survey.list({ limit, skip })
      .then(surveys => res.json(surveys))
      .catch(e => next(e));
  }

  module.exports = { create, list };