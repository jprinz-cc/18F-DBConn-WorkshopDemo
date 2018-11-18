var Movie = require('../models/movie');

// Display list of all Movie.

exports.movie_list = function (req, res, next) {

    Movie.find()
        .sort([['title', 'ascending']])
        .exec(function (err, list_movies) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('movie_list', {
                title: 'Movie List',
                movie_list: list_movies
            });
        });

};


// Display detail page for a specific Movie.
exports.movie_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie detail: ' + req.params.id);
};

// Display Movie create form on GET.
exports.movie_create_get = function (req, res, next) {
    res.render('movie_form', {
        title: 'Create Movie'
    });
};

// Handle Movie create on POST.
exports.movie_create_post = function (req, res, next) {


    var movie = new Movie({
        title: req.body.title,
        release_year: req.body.release_year
    });
    movie.save(function (err) {
        if (err) {
            return next(err);
        }
        // Successful - redirect to new Movie record.
        res.redirect(movie.url);
    });

};

// Display Movie delete form on GET.
exports.movie_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie delete GET');
};

// Handle Movie delete on POST.
exports.movie_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie delete POST');
};

// Display Movie update form on GET.
exports.movie_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie update GET');
};

// Handle Movie update on POST.
exports.movie_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie update POST');
};
