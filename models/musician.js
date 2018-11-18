var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MusicianSchema = new Schema(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
	date_of_birth: {type: Date}
  }
);
MusicianSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});
MusicianSchema
.virtual('url')
.get(function () {
  return '/catalog/musician/' + this._id;
});
module.exports = mongoose.model('Musician', MusicianSchema);
