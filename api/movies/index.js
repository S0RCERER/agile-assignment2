import express from 'express';
import { movieReviews } from './moviesData';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { getUpcomingMovies, getTopRatedMovies, getMovieImages } from '../tmdb/tmdb-api';

const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    const movies = await movieModel.find();
    res.status(200).json(movies);
}));
// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
// Get movie reviews
router.get('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  // find reviews in list
  if (movieReviews.id == id) {
      res.status(200).json(movieReviews);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});
router.post('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  if (movieReviews.id == id) {
      req.body.created_at = new Date();
      req.body.updated_at = new Date();
      req.body.id = uniqid();
      movieReviews.results.push(req.body); //push the new review onto the list
      res.status(201).json(req.body);
  } else {
      res.status(404).json({
          message: 'The resource you requested could not be found.',
          status_code: 404
      });
  }
});
router.get('/:id/favourites', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user.favourites);
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find favourites' });
    }
});

router.get('/tmdb/upcoming/:page', asyncHandler( async(req, res) => {
    const page = parseInt(req.params.page);
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/topRated/:page', asyncHandler( async(req, res) => {
    const page = parseInt(req.params.page);
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/movie/:id/images', asyncHandler( async(req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

export default router;