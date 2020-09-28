const API_KEY = 'c7b0c63482ff66b0ccc08caa0d7dc895';
const POP_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

const main = document.querySelector('main');

async function getMovie() {
  const resp = await fetch(POP_URL);
  const respData = await resp.json();

  respData.results.forEach(movie => {
    const { poster_path, title, vote_average } = movie;
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
                           `;
    main.append(movieEl);
  });
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

getMovie();
