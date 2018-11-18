#! /usr/bin/env node

console.log('This script populates some test albums, musicians, genres, movies, and albuminstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Album = require('./models/album');
var Musician = require('./models/musician');
var Genre = require('./models/genre');
var Movie = require('./models/movie');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var musicians = [];
var genres = [];
var albums = [];
var movies = [];


function musicianCreate(first_name, last_name, d_birth, cb) {
  musiciandetail = {first_name:first_name , last_name: last_name }
  if (d_birth != false) musiciandetail.date_of_birth = d_birth

  var musician = new Musician(musiciandetail);

  musician.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Musician: ' + musician);
    musicians.push(musician)
    cb(null, musician)
  }  );
}

function movieCreate(title, release_year, cb) {
  moviedetail = {title:title , release_year: release_year }

  var movie = new Movie(moviedetail);

  movie.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Movie: ' + movie);
    movies.push(movie)
    cb(null, movie)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function albumCreate(name, musician, genre, cb) {
  albumdetail = {
    name: name,
    musician: musician,
  }
  if (genre != false) albumdetail.genre = genre

  var album = new Album(albumdetail);
  album.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Album: ' + album);
    albums.push(album)
    cb(null, album)
  }  );
}

function createGenreMusicians(cb) {
    async.parallel([
        function(callback) {
          musicianCreate('Phillip', 'Glass', '1963-05-05', callback);
        },
        function(callback) {
          musicianCreate('Max', 'Richter', '1922-10-8', callback);
        },
        function(callback) {
          musicianCreate('David', 'Bowie', '1950-03-02', callback);
        },
        function(callback) {
          genreCreate("Neo-classical", callback);
        },
        function(callback) {
          genreCreate("Movie", callback);
        },
        function(callback) {
          genreCreate("Rock", callback);
        },
        ],
        // optional callback
        cb);
}


function createAlbums(cb) {
    async.parallel([
        function(callback) {
          albumCreate('Memoryhouse', musicians[1], [genres[1],], callback);
        },
        function(callback) {
          albumCreate("Glassworks", musicians[0], [genres[0],], callback);
        },
        function(callback) {
          albumCreate("Greatest Hits", musicians[2], [genres[2],], callback);
        },
        function(callback) {
          albumCreate("Mishima", musicians[0], [genres[0],], callback);
        }
        ],
        // optional callback
        cb);
}

function createMovies(cb) {
    async.parallel([
        function(callback) {
          movieCreate('Star Wars', '1977', callback);
        },
        function(callback) {
          movieCreate("Avengers: Infinity War", '2018', callback);
        },
        function(callback) {
          movieCreate("Titanic", '1997', callback);
        },
        function(callback) {
          movieCreate("Lord of the Rings", "2001 - 2003", callback);
        }
        ],
        // optional callback
        cb);
}


async.series([
    createGenreMusicians,
    createAlbums,
    createMovies
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: ');

    }
    // All done, disconnect from database
    mongoose.connection.close();
});




