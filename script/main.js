const movies = [
  { title: 'Inception', year: '2010', director: 'Christopher Nolan', isRead: false },
  { title: 'The Godfather', year: '1972', director: 'Francis Ford Coppola', isRead: false },
  { title: 'Parasite', year: '2019', director: 'Bong Joon-ho', isRead: false },
  { title: 'Pulp Fiction', year: '1994', director: 'Quentin Tarantino', isRead: false },
  { title: 'Spirited Away', year: '2001', director: 'Hayao Miyazaki', isRead: false },
  { title: 'The Matrix', year: '1999', director: 'Lana and Lilly Wachowski', isRead: false },
  { title: '12 Angry Men', year: '1957', director: 'Sidney Lumet', isRead: false },
  { title: 'Mad Max: Fury Road', year: '2015', director: 'George Miller', isRead: false },
  { title: 'Get Out', year: '2017', director: 'Jordan Peele', isRead: false },
  { title: 'Arrival', year: '2016', director: 'Denis Villeneuve', isRead: false },
];

let updatedMovies = movies;

function addMovie() {
  const input = prompt('Enter movie info (title, year, director):');
  const [title, year, director] = input.split(',');
  const movie = { title: title.trim(), year: year.trim(), director: director.trim() };
  movie.isRead = false;

  movies.push(movie);
}

function listMovies() {
  for (let i = 0; i < updatedMovies.length; i++) {
    console.log(updatedMovies[i].title);
  }
}

function markAsWatched(title) {
  for (let i = 0; i < updatedMovies.length; i++) {
    if (updatedMovies[i].title === title) {
      updatedMovies[i].isRead = true;
    }
  }

  console.log(updatedMovies);
}

let running = true;
while (running) {
  const choice = prompt(`
📚 Movie Tracker
  1. Add Movie
  2. List Movie
  3. Mark Movie as Watched
  4. Exit
  Enter your choice:`);

  switch (choice) {
    case '1':
      addMovie();
      break;
    case '2':
      listMovies();
      break;
    case '3':
      const title = prompt('Enter the title of the book to mark as read:');
      markAsWatched(title);
      break;
    case '4':
      running = false;
      alert('Goodbye!');
      break;
    default:
      alert('Invalid choice.');
  }
}
