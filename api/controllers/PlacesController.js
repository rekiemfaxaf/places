const Place = require('../models/Place');
const upload = require('../config/upload');
const uploader = require('../models/uploader');

function find(req,res,next){
  Place.findOne({slug:req.params.id})
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

function create(req,res,next){
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  })
  .then(doc=>{
    req.place = doc;
    next();
  }).catch(err=>{
    console.log(err);
    next(err);
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

function multerMiddleware(){
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1}
  ]);
}

function saveImage(req,res){
  if(req.place){
    const files = ['avatar','cover'];
    const promises = [];
    files.forEach(imageType=>{
      if(req.files && req.files[imageType]){
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path,imageType));
      }
    });

    Promise.all(promises).then(results => {
      console.log(results);
      res.json(req.place);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
  }else{
    res.status(4422).json({
      error: req.error || 'Could not save place'
    });
  }
}

module.exports = {index, show, create, update, destroy, find, multerMiddleware,saveImage};
