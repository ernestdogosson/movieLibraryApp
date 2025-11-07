const movies = [
  {
    title: "Inception",
    year: "2010",
    director: "Christopher Nolan",
    isRead: false,
  },
  {
    title: "The Godfather",
    year: "1972",
    director: "Francis Ford Coppola",
    isRead: false,
  },
  { title: "Parasite", year: "2019", director: "Bong Joon-ho", isRead: false },
  {
    title: "Pulp Fiction",
    year: "1994",
    director: "Quentin Tarantino",
    isRead: false,
  },
  {
    title: "Spirited Away",
    year: "2001",
    director: "Hayao Miyazaki",
    isRead: false,
  },
  {
    title: "The Matrix",
    year: "1999",
    director: "Lana and Lilly Wachowski",
    isRead: false,
  },
  {
    title: "12 Angry Men",
    year: "1957",
    director: "Sidney Lumet",
    isRead: false,
  },
  {
    title: "Mad Max: Fury Road",
    year: "2015",
    director: "George Miller",
    isRead: false,
  },
  { title: "Get Out", year: "2017", director: "Jordan Peele", isRead: false },
  {
    title: "Arrival",
    year: "2016",
    director: "Denis Villeneuve",
    isRead: false,
  },
];

let updatedMovies = movies;

// function addMovie() {
//   const input = prompt('Enter movie info (title, year, director):');
//   const [title, year, director] = input.split(',');
//   const movie = { title: title.trim(), year: year.trim(), director: director.trim() };
//   movie.isRead = false;

//   movies.push(movie);
// }

// function listMovies() {
//   for (let i = 0; i < updatedMovies.length; i++) {
//     console.log(updatedMovies[i].title);
//   }
// }

// function markAsWatched(title) {
//   for (let i = 0; i < updatedMovies.length; i++) {
//     if (updatedMovies[i].title === title) {
//       updatedMovies[i].isRead = true;
//     }
//   }

// ---------------------------------------------------------------------------------------

const addMovie = () => {
  const input = prompt("Enter movie info (title, year, director):");
  const [title, year, director] = input.split(",");
  const movie = updatedMovies.push({
    title: title.trim(),
    year: year.trim(),
    director: director.trim(),
    isRead: false,
  });
};

const removeMovie = () => {
  const input = prompt("Enter title of movie to be deleted");
  const delEntry = updatedMovies.filter((movie) => movie.title !== input);

  return delEntry;
};

const listMovies = (choice) => {
  // UpdatedMovies exists and has data
  if (!updatedMovies || updatedMovies.length === 0) {
    console.log("No movies in the list!");
    return;
  }

  if (isNaN(choice)) {
    // Show all movies
    console.log("\n📺 All Movies:");
    updatedMovies.forEach((movie) => {
      console.log(`- ${movie.title}`);
    });
  } else if (choice === 1) {
    // Show watched movies
    const watchedMovies = updatedMovies.filter((movie) => movie.isRead);
    console.log("\n✅ Watched Movies:");
    if (watchedMovies.length === 0) {
      console.log("No watched movies yet!");
    } else {
      watchedMovies.forEach((movie) => {
        console.log(`- ${movie.title}`);
      });
    }
  } else if (choice === 2) {
    // Show not watched movies
    const notWatchedMovies = updatedMovies.filter((movie) => !movie.isRead);
    console.log("\n⏳ Not Watched Movies:");
    if (notWatchedMovies.length === 0) {
      console.log("You've watched everything!");
    } else {
      notWatchedMovies.forEach((movie) => {
        console.log(`- ${movie.title}`);
      });
    }
  } else {
    console.log("Invalid choice. Please enter 1 or 2, or leave blank.");
  }
};

const markAsWatched = (name) => {
  const movieTitle = updatedMovies.find((movie) => movie.title === name);
  movieTitle.isRead = true;
};

let running = true;
while (running) {
  const choice = prompt(`
📚 Movie Tracker
  1. Add Movie
  2. Remove Movie
  3. List Movie
  4. Mark Movie as Watched
  5. Exit
  Enter your choice:`);

  switch (choice) {
    case "1":
      addMovie();
      break;
    case "2":
      removeMovie();
      break;
    case "3":
      let choice = parseInt(
        prompt(
          "Select: \n 1. Watched\n 2. Not Watched\n Leave blank for list of all movies",
        ),
      );
      listMovies(choice);
      break;
    case "4":
      const title = prompt(
        "Enter the title of the movie to be mark as watched:",
      );
      markAsWatched(title);
      break;
    case "5":
      running = false;
      alert("Goodbye!");
      break;
    default:
      alert("Invalid choice.");
  }
}
