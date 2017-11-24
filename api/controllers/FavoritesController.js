const paramsBuilder = require('./helpers').paramsBuilder;
const FavoritePlace = require('../models/FavoritePlace');

const validParams = ['_place'];

function find(req,res,next){
  FavoritePlace.findById(req.params.id)
    .then(fav=>{
      req.mainObj = fav;
      req.favorite = fav;
      next();
    }).catch(next);
}

function create(req,res){
  let params = paramsBuilder(validParams,req.body);
  params['_user'] = req.user.id;
  console.log(params);

  FavoritePlace.create(params)
    .then(favorite=>{
      console.log("then")
      res.json(favorite);
    }).catch(error=>{
      console.log(error);
      res.status(422).json({error});
    });
}

function destroy(req,res){
  req.favorite.remove()
    .then(doc=>{
      res.json({})
    }).catch(error=>{
      res.status(500).json({error});
    });
}

module.exports = {find,create,destroy};
