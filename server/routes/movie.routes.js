const MoviesController = require('../controllers/movie.controllers')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) =>{

    //Movies
    app.get('/api/getMovies',  authenticate, MoviesController.getMovies ) 
    //app.get('/api/getMovies',  MoviesController.getMovies ) 
    
    app.get('/api/getOneMovie/:id', authenticate, MoviesController.getOneMovie)
    //app.get('/api/getOneMovie/:id', MoviesController.getOneMovie)
    
    //app.post('/api/newMovie', authenticate,  MoviesController.newMovie) 
    app.post('/api/newMovie',  MoviesController.newMovie) 

    //app.put('/api/updateMovie/:id', authenticate, MoviesController.updateMovie)
    app.put('/api/updateMovie/:id', MoviesController.updateMovie)
    
    //app.delete('/api/deleteMovie/:id', authenticate, MoviesController.deleteMovie)
    app.delete('/api/deleteMovie/:id', MoviesController.deleteMovie)

    //Movie - Review
    
    //app.put('/api/newReview',  authenticate, MoviesController.newMovieReview )
    app.put('/api/newReview/:id', MoviesController.newMovieReview )


    //app.get('/api/getReviews', authenticate, MoviesController.getMovieReviews) 
    app.get('/api/getReviews', MoviesController.getMovieReviews)


    //app.delete('/api/deleteReview', authenticate, MoviesController.deleteReview)
   
}