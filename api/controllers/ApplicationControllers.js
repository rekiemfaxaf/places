const paramsBuilder = require('./helpers').paramsBuilder;

const Application = require('../models/Application');
const User = require('../models/User');

const validParams = ['origins','name'];

function find(req,res,next){
  Application.findById(req.params.id)
    .then(application=>{
      req.mainObj = application;
      req.application = application;
      next();
    }).catch(next);
}

function index(req,res,next){

}

function create(req,res){
  let params = paramsBuilder(validParams,req.body);
  Application.create(params)
    .then(Application=>{
      console.log("then")
      res.json(Application);
    }).catch(error=>{
      console.log(error);
      res.status(422).json({error});
    });
}

function destroy(req,res){
  req.application.remove()
    .then(doc=>{
      res.json({})
    }).catch(error=>{
      res.status(500).json({error});
    });
}

module.exports = {find,create,destroy,index};
