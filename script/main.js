const movies = [
  {
    title: "Inception",
    year: "2010",
    director: "Christopher Nolan",
    isWatched: false,
  },
  {
    title: "The Godfather",
    year: "1972",
    director: "Francis Ford Coppola",
    isWatched: false,
  },
  {
    title: "Parasite",
    year: "2019",
    director: "Bong Joon-ho",
    isWatched: false,
  },
  {
    title: "Pulp Fiction",
    year: "1994",
    director: "Quentin Tarantino",
    isWatched: false,
  },
  {
    title: "Spirited Away",
    year: "2001",
    director: "Hayao Miyazaki",
    isWatched: false,
  },
  {
    title: "The Matrix",
    year: "1999",
    director: "Lana and Lilly Wachowski",
    isWatched: false,
  },
  {
    title: "12 Angry Men",
    year: "1957",
    director: "Sidney Lumet",
    isWatched: false,
  },
  {
    title: "Mad Max: Fury Road",
    year: "2015",
    director: "George Miller",
    isWatched: false,
  },
  {
    title: "Get Out",
    year: "2017",
    director: "Jordan Peele",
    isWatched: false,
  },
  {
    title: "Arrival",
    year: "2016",
    director: "Denis Villeneuve",
    isWatched: false,
  },
];

let currentFilter = "all";

function toggleAddForm() {
  const form = document.getElementById("addForm");
  const btn = document.getElementById("btnToggleForm");

  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Cancel";
  } else {
    form.classList.add("hidden");
    btn.textContent = "+ Add Movie";
    clearForm();
  }
}

function clearForm() {
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputYear").value = "";
  document.getElementById("inputDirector").value = "";
}

function addMovie() {
  const title = document.getElementById("inputTitle").value.trim();
  const year = document.getElementById("inputYear").value.trim();
  const director = document.getElementById("inputDirector").value.trim();

  if (title && year && director) {
    movies.push({
      title,
      year,
      director,
      isWatched: false,
    });

    clearForm();
    toggleAddForm();
    renderMovies();
    updateStats();
  }
}

function removeMovie(title) {
  const index = movies.findIndex((movie) => movie.title === title);
  if (index > -1) {
    movies.splice(index, 1);
    renderMovies();
    updateStats();
  }
}

function toggleWatched(title) {
  const movie = movies.find((movie) => movie.title === title);
  if (movie) {
    movie.isWatched = !movie.isWatched;
    renderMovies();
    updateStats();
  }
}

function filterMovies(filter) {
  currentFilter = filter;

  const btnAll = document.getElementById("btnAll");
  const btnWatched = document.getElementById("btnWatched");
  const btnUnwatched = document.getElementById("btnUnwatched");

  btnAll.className = "text-gray-400 hover:text-gray-600 pb-1";
  btnWatched.className = "text-gray-400 hover:text-gray-600 pb-1";
  btnUnwatched.className = "text-gray-400 hover:text-gray-600 pb-1";

  if (filter === "all") {
    btnAll.className = "text-gray-900 border-b-2 border-gray-900 pb-1";
  } else if (filter === "watched") {
    btnWatched.className = "text-gray-900 border-b-2 border-gray-900 pb-1";
  } else if (filter === "unwatched") {
    btnUnwatched.className = "text-gray-900 border-b-2 border-gray-900 pb-1";
  }

  renderMovies();
}

function renderMovies() {
  const moviesList = document.getElementById("moviesList");

  let filteredMovies = movies;
  if (currentFilter === "watched") {
    filteredMovies = movies.filter((movie) => movie.isWatched);
  } else if (currentFilter === "unwatched") {
    filteredMovies = movies.filter((movie) => !movie.isWatched);
  }

  if (filteredMovies.length === 0) {
    moviesList.innerHTML = `
      <div class="text-center py-12 text-gray-400">
        <p class="text-sm">No movies to display</p>
      </div>
    `;
    return;
  }

  moviesList.innerHTML = filteredMovies
    .map(
      (movie) => `
    <div class="border-b border-gray-100 pb-3 last:border-0">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="text-base font-medium text-gray-900">${movie.title}</h3>
            ${
              movie.isWatched
                ? '<span class="text-xs text-green-600">✓ Watched</span>'
                : ""
            }
          </div>
          <p class="text-sm text-gray-500">${movie.year} · ${movie.director}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 text-sm">
          <button
            onclick="toggleWatched('${movie.title.replace(/'/g, "\\'")}')"
            class="text-gray-600 hover:text-gray-900 py-1 px-2 sm:px-0"
          >
            ${movie.isWatched ? "Unwatch" : "Watch"}
          </button>
          <button
            onclick="removeMovie('${movie.title.replace(/'/g, "\\'")}')"
            class="text-gray-400 hover:text-red-600 py-1 px-2 sm:px-0"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function updateStats() {
  const watchedCount = movies.filter((movie) => movie.isWatched).length;
  const totalCount = movies.length;
  const unwatchedCount = totalCount - watchedCount;

  document.getElementById("watchedCount").textContent = watchedCount;
  document.getElementById("totalCount").textContent = totalCount;
  document.getElementById("unwatchedCount").textContent = unwatchedCount;
}

renderMovies();
updateStats();
