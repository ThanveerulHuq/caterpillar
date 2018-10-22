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
    var today = new Date();
    var dateTime = formatDate(today);

    var tempGenId = req.body.surveyName + req.body.theme + dateTime;
    var genId = tempGenId.replace(/\s/g, "");
    var genUrl = req.body.surveyName + "/" + req.body.theme +"/"+genId;
    const survey = new Survey({
        _id: genId,
        surveyName: req.body.surveyName,
        description: req.body.description,
        theme: req.body.theme,
        url: genUrl
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

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  module.exports = { create, list };