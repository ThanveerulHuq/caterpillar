const response = require('./response.model')


/**
 * Create new user
 * @property {string} req.body.survey 
 * @property {string} req.body.question_no
 * @property {string} req.body.response 
 * @property {string} req.body.skipped
 * @returns {response}
 */
function create(req, res, next) {
    let responseList = [];
    
        const question = {
            survey: req.body.survey,
            answer: req.body.answer

        };
     

    response.save(responseList)
        .then(savedResponse => res.json({ message: savedResponse ? 'questions updated successfully' : 'error updating questions' }))
        .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {questions[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    response.list({ limit, skip })
        .then(response => res.json(response))
        .catch(e => next(e));
}

function viewOne(req, res, next) {
    response.find({ survey: req.params.id }, response)
        .then(response => res.json(response))
        .catch(e => next(e));
}

module.exports = { create, list, viewOne };