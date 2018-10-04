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

    var order,type,title,option,optional;

    for(i=0; i<(req.body.question).length; i++)
    {
        // order[i] = req.body.question[i].order;
        // type[i] = req.body.question[i].type;
        // title[i] = req.body.question[i].title;
        // option[i] = req.body.question[i].option;
        // optional[i] = req.body.question[i].optional;


        const question = new questions({
        
            survey: req.body.survey,
            question_no: req.body.question[i].order,
            title: req.body.question[i].title,
            type: req.body.question[i].type,
            options: req.body.question[i].options,
            optional: req.body.question[i].optional

        });
      
        question.save()
          .then(savedQuestions => res.json(savedQuestions))
          .catch(e => next(e));
    }

    
    
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

  module.exports = { create, list };