const Place = require('../models/Place');

function find(req,res,next){
  Place.findById(req.params.id)
  .then(place=>{
    req.place = place;
    next();
  }).catch(err=>{
    console.log(err);
    next(err);
  });
}

function index(req,res){
  Place.paginate({},{page: req.query.page || 1, limit: 10, sort:{_id: -1} })
  .then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function show(req,res){
  res.json(req.place);
}

function create(req,res){
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  })
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function update(req,res){
  let attributes = ['title','description','acceptsCreditCard','openHour','closeHour'];
  let placeParams = {};
  attributes.forEach(attr=>{
    console.log(attr);
    if(Object.prototype.hasOwnProperty.call(req.body,attr)){
      placeParams[attr] = req.body[attr];
    }
  });

  req.place = Object.assign(req.place, placeParams)
  req.place.save()
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  req.place.remove()
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

module.exports = {index, show, create, update, destroy, find};
