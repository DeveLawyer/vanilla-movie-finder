const API_KEY = 'c7b0c63482ff66b0ccc08caa0d7dc895';
const POP_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('.search');

// initially get popular movies
getMovie(POP_URL);

async function getMovie(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  // filter nully-poster results
  const filteredData = respData.results.filter(movie => movie.poster_path);

  showData(filteredData);
}

function showData(movies) {
  // clear main
  main.innerHTML = '';

  if (movies.length !== 0) {
    movies.forEach(movie => {
      const { poster_path, title, vote_average, overview } = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `<img
                               src="${IMG_PATH}${poster_path}"
                               alt="${title}"
                             />
                             <div class="movie-info">
                               <h3 class=${getClassByLength(title)}>${title}</h3>
                               <span class=${getClassByVotes(vote_average)}>${vote_average}</span>
                             </div>
                             <div class="overview">
                               <h4>Overview:</h4>
                               ${overview}
                             </div>
                             `;

      main.append(movieEl);
    });
  } else {
    const movieNotFound = document.createElement('h2');
    movieNotFound.classList.add('not-found');
    movieNotFound.innerHTML = `Sorry... "${search.value}" movie not found 😔`;

    main.append(movieNotFound);

    search.value = '';
  }
}

function getClassByLength(title) {
  if (title.length > 40) {
    return 'small-size';
  }
  return 'normal-size';
}

function getClassByVotes(votes) {
  if (votes >= 8) {
    return 'green';
  }
  if (votes >= 5) {
    return 'orange';
  }
  return 'red';
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovie(SEARCH_URL + searchTerm);
  }
});
