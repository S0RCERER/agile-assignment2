# Assignment 2 - Agile Software Practice.
​
Name: Ling Feng
​
## API endpoints.
​
 
 e.g.
​
Movies
- /api/movies/:id | GET | Gets a single movie 
- /api/movies/tmdb/movie/:id/images | GET | Get movie images from tmdb

Users
- /api/users/ | GET | Gets all users' information
- /api/users/ | POST | Authenticates a user
- /api/users/:id | Put | Updates information about a user
- /api/users/:userName/favourites | GET | Gets users favourites
- /api/users/:userName/favourites | POST | Add a favourite movieId to user's favourites

Genres
- /api/genres/local | GET | Gets genres from seedData
- /api/genres/tmdb | GET | Gets genres from tmdb

Reviews
- /api/reviews/movie/:id/reviews | GET | Gets a movie reviews
- /api/reviews/movie/:id/reviews/:username | POST | posts a review
​
## Test cases.
​
​
e.g. 
~~~
  Users endpoint
    GET /api/users
database connected to test on ac-onrdykm-shard-00-02.lgldymn.mongodb.net
      √ should return the 2 users and a status 200
    POST /api/users
      For a register action
        when the payload is correct
          √ should return a 201 status and the confirmation message (212ms)
      For an authenticate action
        when the payload is correct
          √ should return a 200 status and a generated token (190ms)
    POST /api/users/:username/favourites       
      for valid user name
        when the movie is not in favourites    
          √ should return user message and a status 201 (148ms)
        when the movie is in favourites        
          √ return error message and a status 403 (101ms)
      for invalid user name
        √ return error message and a status 500

  Movies endpoint
    GET /api/movies
      √ should return 20 movies and a status 200
    GET /api/movies/:id
      when the id is valid
        √ should return the matching movie (79ms)
      when the id is invalid
        √ should return the NOT found message (167ms)
    GET /api/movies/tmdb/upcoming/:page        
      when the page number is valid
        √ should return 20 movies of corresponding page from tmdb and a status 200 (153ms)    
      when the page number is invalid
        √ should return a empty result (214ms)
    GET /api/movies/tmdb/topRated/:page        
      when the page number is valid
        √ should return 20 movies of corresponding page from tmdb and a status 200 (193ms)    
      when the page number is invalid
        √ should return a empty result (155ms)

  Genres endpoint
    GET /api/genres/local
      √ should return 4 genres and status code 200
    GET /api/genres/tmdb
      √ should return a list of genres and status code 200 (85ms)

  Actors endpoint
    GET /api/actors
      √ should return 20 people and a status 200 (66ms)
    GET /api/actors/:id
      when the id is valid
        √ should an object of people and a status 200 (93ms)
      when the id is invalid
        √ should return 500 because this actor resource isn't accessible from TMDB (162ms)    
    GET /api/actors/popular
      √ should return 20 actors of corresponding page from tmdb and a status 200 (150ms)      
    GET /api/actors/:id/movies
      when the id is valid number
        √ should return an object containing all the actor's movies and status 200 (82ms)     
      when the id is not number
        √ should return 500 because this resource isn't accessible from TMDB (167ms)
    GET /api/actors/:id/images
      when the id is valid number
        √ should return an object containing all the actor's images and status 200 (88ms)     
      when the id is not number
        √ should return 500 because this resource isn't accessible from TMDB (166ms)

  Reviews endpoint
    GET /api/reviews/:id/reviews
      when the id is valid
        √ should a object contains a list of the reviews of the movie and a status 200        
      when movie id is invalid
        √ should return a status 404 and the corresponding message
    POST /api/reviews/movie/:id/reviews/:username
      when the id is valid
        The content is not empty
          √ should a object contains a list of the reviews of the movie and a status 200      
        The content is invalid
          √ should return a status 403 and the corresponding message
      when movie id is invalid
        √ should return a status 404 and the corresponding message


  28 passing (12s)

-|---------|----------|---------|---------|-------------------
 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-|---------|----------|---------|---------|-------------------
 |   76.33 |    60.65 |   74.28 |   79.38 |    

  |   96.55 |       50 |     100 |   96.55 |   

   |   96.55 |       50 |     100 |   96.55 | 20
  |    98.3 |      100 |   95.23 |   96.87 |   

   |   85.71 |      100 |       0 |   83.33 | 42
   |     100 |      100 |     100 |     100 |  

  |     100 |      100 |     100 |     100 |   

   |     100 |      100 |     100 |     100 |  

   |     100 |      100 |     100 |     100 |  

   |     100 |      100 |     100 |     100 |  

  |   87.32 |    68.18 |   85.71 |   91.11 |   

   |   84.21 |    68.18 |      85 |    87.5 | 20,32,37-38      
   |     100 |      100 |     100 |     100 |  

   |     100 |      100 |     100 |     100 |  

  |     100 |      100 |     100 |     100 |   

   |     100 |      100 |     100 |     100 |  

  |   79.72 |    65.21 |      75 |   78.87 |   

   |   79.72 |    65.21 |      75 |   78.87 | ...07,112,136,141
  |   74.43 |    62.68 |   80.64 |   77.01 |   

   |   71.29 |     61.4 |      76 |   73.01 | ...51-61,68,74,88
   |      88 |       70 |     100 |    87.5 | 20,31,35
  |   66.66 |        0 |      25 |   73.68 |   

   |   66.66 |        0 |      25 |   73.68 | 15-20
  |   81.81 |      100 |   33.33 |   81.81 |   

   |   81.81 |      100 |   33.33 |   81.81 | 11,14
  |   28.04 |     3.84 |       0 |   36.53 |   

   |     100 |      100 |     100 |     100 |  

   |     100 |      100 |     100 |     100 |  

   |   15.71 |     3.84 |       0 |      25 | 14-60,63-66      
   |     100 |      100 |     100 |     100 |  

   |     100 |      100 |     100 |     100 |  

-|---------|----------|---------|---------|-------------------
~~~
​
[ Markdown Tip: By wrapping the test results in fences (~~~), GitHub will display it in a 'box' and preserve any formatting.]
​
NOTE: Your test code should only contain the test cases you implemented. You must remove the test cases (it blocks) developed in the labs from your assignment submission.
​
## Independent Learning (if relevant)
​
I choose option b
coveralls:https://coveralls.io/gitlab/S0RCERER/agile-assignment2

## Related Links
github:https://github.com/S0RCERER/agile-assignment2
gitlab:https://gitlab.com/S0RCERER/agile-assignment2/-/pipelines
​
