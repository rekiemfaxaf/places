const mongoose = require('mongoose');

const dbName = 'places_facilito_api';

module.exports = {
  connect: () => mongoose.connect('mongodb://127.0.0.1/'+dbName),
  dbName,
  connection: ()=> {
    if(mongoose.connecition)
      return mongoose.connection;
    return this.connect;
  }
}
