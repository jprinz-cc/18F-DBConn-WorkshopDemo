var Musician = require('../models/musician');

// Display list of all Musician.

exports.musician_list = function (req, res, next) {

    Musician.find()
        .sort([['last_name', 'ascending']])
        .exec(function (err, list_musicians) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('musician_list', {
                title: 'Musician List',
                musician_list: list_musicians
            });
        });

};


// Display detail page for a specific Musician.
exports.musician_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Musician detail: ' + req.params.id);
};

// Display Musician create form on GET.
exports.musician_create_get = function (req, res, next) {
    res.render('musician_form', {
        title: 'Create Musician'
    });
};

// Handle Musician create on POST.
exports.musician_create_post = function (req, res, next) {


    var musician = new Musician({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
    });
    musician.save(function (err) {
        if (err) {
            return next(err);
        }
        // Successful - redirect to new Musician record.
        res.redirect(musician.url);
    });

};

// Display Musician delete form on GET.
exports.musician_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Musician delete GET');
};

// Handle Musician delete on POST.
exports.musician_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Musician delete POST');
};

// Display Musician update form on GET.
exports.musician_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Musician update GET');
};

// Handle Musician update on POST.
exports.musician_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Musician update POST');
};
