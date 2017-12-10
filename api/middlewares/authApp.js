const Application = require('../models/Application');

module.exports = function(options){
  let AuthApp = function(req,res,next){
    Application.count({}).then(appCount=>{
      if(appCount >0 && !req.application) return next(new Error('An application ins requiered toconsume this API'));
      if(!req.validRequest) return next(new Error('Origin invalid'));
      req.valiApp= true;
      next();
    }).catch(next);
  }

  AuthApp.unless = require('express-unless');
  return AuthApp;
}
