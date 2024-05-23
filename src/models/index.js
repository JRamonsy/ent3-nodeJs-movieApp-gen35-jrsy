const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// movie
Movie.belongsToMany(Genre, { through: 'movies_genres' });
Genre.belongsToMany(Movie, { through: 'movies_genres' });

Movie.belongsToMany(Actor, { through: 'movies_actors' });
Actor.belongsToMany(Movie, { through: 'movies_actors' });

Movie.belongsToMany(Director, { through: 'movies_directors' });
Director.belongsToMany(Movie, { through: 'movies_directors' });

// actor
// Actor.belongsToMany(Movie, { through: 'actors_movies' });
// Movie.belongsToMany(Actor, { through: 'actors_movies' });