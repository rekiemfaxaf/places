const mongoose = require('mongoose');
const randomstring = require('randomstring');

function assignRandomAndUniqueValueToField(app,field,next){
  const ramdonStr = randomstring.generate(20);

  let serachCritieria = {};
  serachCritieria[field] = ramdonStr;

  Application.count(serachCritieria).then(count=>{
    if(count > 0) return assignRandomAndUniqueValueToField(app,field,next);

    app[field] = ramdonStr;
    next();
  })
}

let applicationSchema = new mongoose.Schema({
  applicationId:{
    type:String,
    required: true,
    unique:true
  },
  secret: {
    type:String,
    required:true,
    unique:true
  },
  origins: String,
  name:String
})

applicationSchema.pre('validate', function(next){
  assignRandomAndUniqueValueToField(this, 'applicationId',()=>{
    assignRandomAndUniqueValueToField(this,'secret',next);
  })
})

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
