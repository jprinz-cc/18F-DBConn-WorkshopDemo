var Movie = require('../models/movie');
var Album = require('../models/album');
var Musician = require('../models/musician');
var Genre = require('../models/genre');


exports.media_list = function (req, res, next) {
    let mediaContent = [];

    switch (req.params.mediaID) {
        case "movie":
            Movie.find()
                .sort([['title', 'ascending']])
                .exec(function (err, list_movies) {
                    if (err) {
                        return next(err);
                    }
                    //Successful, so render
                    for (let i = 0; i < list_movies.length; i++) {
                        mediaContent.push({
                            "title": list_movies[i].title,
                            "release_year": list_movies[i].release_year
                        });

                    }
                    sendJsonResponse(res, 200, mediaContent);
                });
            break;

        case "musician":
            Musician.find()
                .sort([['last_name', 'ascending']])
                .exec(function (err, list_musicians) {
                    if (err) {
                        return next(err);
                    }
                    //Successful, so render
                    for (let i = 0; i < list_musicians.length; i++) {
                        mediaContent.push({
                            "first_name": list_musicians[i].first_name,
                            "last_name": list_musicians[i].last_name,
                            "date_of_birth": list_musicians[i].date_of_birth
                        });

                    }
                    sendJsonResponse(res, 200, mediaContent);
                });
            break;
    }
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}
