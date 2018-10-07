const questions= require('./questions.model')


/**
 * Create new user
 * @property {string} req.body.surveyName 
 * @property {string} req.body.description
 * @property {string} req.body.theme 
 * @property {string} req.body.url
 * @returns {questions}
 */
function create(req, res, next) {

    console.log('in Questions controller');

    console.log((req.body.question).length);

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
        .then(savedQuestions => res.json({message:savedQuestions?'questions updated successfully':'error updating questions'}))
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

  
  

// // find all athletes who play tennis, selecting the 'name' and 'age' fields
// viewOne({ 'survey': 'jpi' }, function (err, questions) {
//   if (err) return handleError(err);
//   // 'athletes' contains the list of athletes that match the criteria.
// })

  module.exports = { create, list , viewOne: function(req, res,next){
    console.log('Viewing ' + req.params.id);
    questions.find({survey: req.params.id}, questions)
    .then(questions => res.json(questions))
    .catch(e => next(e));
    
}};