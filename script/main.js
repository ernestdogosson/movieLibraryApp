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

  // Reset all to inactive style (Gray text)
  const inactiveClass = "text-gray-400 hover:text-white pb-1 transition-colors";
  btnAll.className = inactiveClass;
  btnWatched.className = inactiveClass;
  btnUnwatched.className = inactiveClass;

  // Set active style (White text + Indigo Border)
  const activeClass =
    "text-white border-b-2 border-indigo-500 pb-1 font-medium transition-colors";

  if (filter === "all") {
    btnAll.className = activeClass;
  } else if (filter === "watched") {
    btnWatched.className = activeClass;
  } else if (filter === "unwatched") {
    btnUnwatched.className = activeClass;
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
      <div class="text-center py-12 text-gray-500">
        <p class="text-sm">No movies found in this category.</p>
      </div>
    `;
    return;
  }

  moviesList.innerHTML = filteredMovies
    .map(
      (movie) => `
    <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600 mb-3 hover:bg-gray-700 transition-colors shadow-sm">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h3 class="text-lg font-bold text-white">${movie.title}</h3>
            ${
              movie.isWatched
                ? '<span class="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">✓ Watched</span>'
                : ""
            }
          </div>
          <p class="text-sm text-gray-400 font-medium">${movie.year} • ${movie.director}</p>
        </div>

        <div class="flex items-center gap-3">
          <button
            onclick="toggleWatched('${movie.title.replace(/'/g, "\\'")}')"
            class="text-sm font-medium transition-colors ${
              movie.isWatched
                ? "text-gray-400 hover:text-white"
                : "text-indigo-400 hover:text-indigo-300"
            }"
          >
            ${movie.isWatched ? "Unwatch" : "Mark Watched"}
          </button>

          <button
            onclick="removeMovie('${movie.title.replace(/'/g, "\\'")}')"
            class="text-rose-400 hover:text-rose-300 transition-colors p-1"
            title="Delete Movie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
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

// Initial render
renderMovies();
updateStats();
