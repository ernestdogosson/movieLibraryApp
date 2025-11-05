const movies = [
  { title: 'Inception', year: '2010', director: 'Christopher Nolan' },
  { title: 'The Godfather', year: '1972', director: 'Francis Ford Coppola' },
  { title: 'Parasite', year: '2019', director: 'Bong Joon-ho' },
  { title: 'Pulp Fiction', year: '1994', director: 'Quentin Tarantino' },
  { title: 'Spirited Away', year: '2001', director: 'Hayao Miyazaki' },
  { title: 'The Matrix', year: '1999', director: 'Lana and Lilly Wachowski' },
  { title: '12 Angry Men', year: '1957', director: 'Sidney Lumet' },
  { title: 'Mad Max: Fury Road', year: '2015', director: 'George Miller' },
  { title: 'Get Out', year: '2017', director: 'Jordan Peele' },
  { title: 'Arrival', year: '2016', director: 'Denis Villeneuve' },
];

function addMovie() {
  const input = prompt('Enter movie info (title, year, director):');
  const [title, year, director] = input.split(',');
  const movie = { title: title.trim(), year: year.trim(), director: director.trim() };

  return movies.push(movie);
}

addMovie();

console.log(movies);
