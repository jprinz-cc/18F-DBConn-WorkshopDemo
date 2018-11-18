const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');
var Album = require('../models/album');
var Musician = require('../models/musician');
var Genre = require('../models/genre');

// Display list of all Album.

exports.album_list = function(req, res, next) {

  Album.find({}, 'name musician')
    .populate('musician')
    .exec(function (err, list_albums) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('album_list', { title: 'Album List', album_list: list_albums });
    });

};

// Display detail page for a specific Album.
exports.album_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Album detail: ' + req.params.id);
};

// Display Album create form on GET.
exports.album_create_get = function(req, res, next) {

    // Get all authors and genres, which we can use for adding to our album.
    async.parallel({
        musicians: function(callback) {
            Musician.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('album_form', { title: 'Create Album', musicians: results.musicians, genres: results.genres });
    });

};

// Handle Album create on POST.
exports.album_create_post = [
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==='undefined')
            req.body.genre=[];
            else
            req.body.genre=new Array(req.body.genre);
        }
        next();
    },

    // Validate fields.
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('musician', 'Musician must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Album object with escaped and trimmed data.
        var album = new Album(
          { name: req.body.name,
            musician: req.body.musician,
            genre: req.body.genre
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                musician: function(callback) {
                    Musician.find(callback);
                },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (album.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render('album_form', { title: 'Create Album',musicians:results.musicians, genres:results.genres, album: album, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save album.
            album.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new album record.
                   res.redirect(album.url);
                });
        }
    }
];

// Display Album delete form on GET.
exports.album_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Album delete GET');
};

// Handle Album delete on POST.
exports.album_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Album delete POST');
};

// Display Album update form on GET.
exports.album_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Album update GET');
};

// Handle Album update on POST.
exports.album_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Album update POST');
};
