var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MovieSchema = new Schema(
  {
    title: {type: String, required: true},
    release_year: {type: String, required: true}
  }
);
MovieSchema
.virtual('url')
.get(function () {
  return '/catalog/movie/' + this._id;
});
module.exports = mongoose.model('Movie', MovieSchema);
