const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./uploader');
const slugify = require('../plugins/slugify');

let placeSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  slug:{
    type: String,
    unique: true
  },
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false
  },
  avatarImage: String,
  coverImage: String,
  openHour: Number,
  closeHour: Number
});

placeSchema.methods.updateImage = function(path, imageType){
  return uploader(path)
    .then(secure_url => this.saveImageUrl(secure_url,imageType));
};

placeSchema.methods.saveImageUrl = function(secureUrl,imageType){
  this[imageType+'Image'] = secureUrl;
  return this.save();
};

placeSchema.pre('save',function(next){
  this.slug = slugify(this.title);
  next();
})

placeSchema.plugin(mongoosePaginate);
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
