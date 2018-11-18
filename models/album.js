var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlbumSchema = new Schema(
  {
    name: {type: String, required: true},
    musician: {type: Schema.ObjectId, ref: 'Musician', required: true},
	genre: [{type: Schema.ObjectId, ref: 'Genre'}]
  }
);
AlbumSchema
.virtual('url')
.get(function () {
  return '/catalog/album/' + this._id;
});
module.exports = mongoose.model('Album', AlbumSchema);

