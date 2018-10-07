const questions = require('./questions.model')


/**
 * Create new user
 * @property {string} req.body.surveyName 
 * @property {string} req.body.description
 * @property {string} req.body.theme 
 * @property {string} req.body.url
 * @returns {questions}
 */
function create(req, res, next) {
    let questionsList = [];
    for (i = 0; i < (req.body.question).length; i++) {
        const question = {
            survey: req.body.survey,
            question_no: req.body.question[i].order,
            title: req.body.question[i].title,
            type: req.body.question[i].type,
            options: req.body.question[i].options,
            optional: req.body.question[i].optional

        };
        questionsList.push(question);
    }

    questions.bulkInsert(questionsList)
        .then(savedQuestions => res.json({ message: savedQuestions ? 'questions updated successfully' : 'error updating questions' }))
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
    questions.list({ limit, skip })
        .then(questions => res.json(questions))
        .catch(e => next(e));
}

function viewOne(req, res, next) {
    questions.find({ survey: req.params.id }, questions)
        .then(questions => res.json(questions))
        .catch(e => next(e));
}

module.exports = { create, list, viewOne };