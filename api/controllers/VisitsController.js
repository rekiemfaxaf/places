const paramsBuilder = require('./helpers').paramsBuilder;

const Visit = require('../models/Visit');
const User = require('../models/User');

const validParams = ['_place','reaction','observation'];

function find(req,res,next){
  Visit.findById(req.params.visit_id)
    .then(visit=>{
      req.mainObj = visit;
      req.favorite = visit;
      next();
    }).catch(next);
}

function index(req,res,next){
  let promise = null;
  if(req.place){
    promise = req.place.visits;
  }else if(req.user){
    promise = Visit.forUser(req.user.id, req.query.page || 1);
  }

  if(promise){
    promise.then(visits=>{
      res.json(visits);
    }).catch(error=>{
      res.status(500).json({error})
    })
  }else{
    res.status(404).json({})
  }

}

function create(req,res){
  let params = paramsBuilder(validParams,req.body);
  params['_user'] = req.user.id;
  console.log(params);

  Visit.create(params)
    .then(visit=>{
      console.log("then")
      res.json(visit);
    }).catch(error=>{
      console.log(error);
      res.status(422).json({error});
    });
}

function destroy(req,res){
  req.visit.remove()
    .then(doc=>{
      res.json({})
    }).catch(error=>{
      res.status(500).json({error});
    });
}

module.exports = {find,create,destroy,index};
