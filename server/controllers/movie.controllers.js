const Movies = require("../models/movie.model");

const getMovies = (req, res) => {
  Movies.find(req.body)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getOneMovie = (req, res) => {
  Movies.findById(req.params.id)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      console.log(error);
    });
};

const newMovie = async (req, res) => {
    //para que guarde el user en movie

    //req.body.user = req.user.id;

    console.log(req)
  Movies.create(req.body)
    .then((resultado) => {
      console.log(req.body);
      res.json(resultado);
    })
    .catch((error) => {
      console.log(error);
      // res.json(error)
      res.status(400).json(error);
    });
};

const updateMovie = (req, res) => {
  Movies.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
    .then((resultado) => {
      console.log(req.body);
      res.json(resultado);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const deleteMovie = (req, res) => {
  Movies.deleteOne({ _id: req.params.id })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      console.log(error);
    });
};

const newMovieReview = async (req, res) => {
  const { name, rating, comment, movieId } = req.body;

  //console.log("user name", req.user.name)
  //console.log("user ", req.user._id)

  const review = {
    //user: req.user._id,
    //name: req.user.name,
    name: name,
    rating: Number(rating),
    comment: comment
  };


const movie = await Movies.findById(req.params.id);


console.log("esto trajo movie de la consulta", movie)

/*   const isReviewed = movie.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  ); */
  const isReviewed = false;
  
  if (isReviewed) {
    movie.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    movie.reviews.push(review);
    movie.numOfReviews = movie.reviews.length;
  }

  movie.ratings =
    movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
    movie.reviews.length;

   await movie.save({ validateBeforeSave: false });
   res.status(200).json({
     success: true,
   });


};

const getMovieReviews = async (req, res) => {
  const movie = await Movies.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: movie.reviews,
  });
};

module.exports = {
  getMovies,
  getOneMovie,
  newMovie,
  updateMovie,
  deleteMovie,
  newMovieReview,
  getMovieReviews,
  // deleteReview
};
