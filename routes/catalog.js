var express = require('express');
var router = express.Router();

// Require controller modules.
var album_controller = require('../controllers/albumController');
var musician_controller = require('../controllers/musicianController');
var genre_controller = require('../controllers/genreController');
var movie_controller = require('../controllers/movieController');
var catalog_controller = require('../controllers/catalogController');

// GET catalog home page.
router.get('/', catalog_controller.index);


/// MUSICIAN ROUTES ///

// GET request for creating Musician. NOTE This must come before route for id (i.e. display musician).
router.get('/musician/create', musician_controller.musician_create_get);

// POST request for creating Musician.
router.post('/musician/create', musician_controller.musician_create_post);

// GET request to delete Musician.
router.get('/musician/:id/delete', musician_controller.musician_delete_get);

// POST request to delete Musician.
router.post('/musician/:id/delete', musician_controller.musician_delete_post);

// GET request to update Musician.
router.get('/musician/:id/update', musician_controller.musician_update_get);

// POST request to update Musician.
router.post('/musician/:id/update', musician_controller.musician_update_post);

// GET request for one Musician.
router.get('/musician/:id', musician_controller.musician_detail);

// GET request for list of all Musicians.
router.get('/musicians', musician_controller.musician_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//Add a POST request for creating Genre here.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);


// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

/// ALBUM ROUTES ///

// GET request for creating a Album. NOTE This must come before routes that display Album (uses id).
router.get('/album/create', album_controller.album_create_get);

// POST request for creating Album.
router.post('/album/create', album_controller.album_create_post);

// GET request to delete Album.
router.get('/album/:id/delete', album_controller.album_delete_get);

// POST request to delete Album.
router.post('/album/:id/delete', album_controller.album_delete_post);

// GET request to update Album.
router.get('/album/:id/update', album_controller.album_update_get);

// POST request to update Album.
router.post('/album/:id/update', album_controller.album_update_post);

// GET request for one Album.
router.get('/album/:id', album_controller.album_detail);

// GET request for list of all Album items.
router.get('/albums', album_controller.album_list);


/// MOVIE ROUTES ///

// GET request for creating Movie. NOTE This must come before route for id (i.e. display movie).
router.get('/movie/create', movie_controller.movie_create_get);

// POST request for creating Movie.
router.post('/movie/create', movie_controller.movie_create_post);

// GET request to delete Movie.
router.get('/movie/:id/delete', movie_controller.movie_delete_get);

// POST request to delete Movie.
router.post('/movie/:id/delete', movie_controller.movie_delete_post);

// GET request to update Movie.
router.get('/movie/:id/update', movie_controller.movie_update_get);

// POST request to update Movie.
router.post('/movie/:id/update', movie_controller.movie_update_post);

// GET request for one Movie.
router.get('/movie/:id', movie_controller.movie_detail);

// GET request for list of all Movies.
router.get('/movies', movie_controller.movie_list);



module.exports = router;
