const API_KEY = 'c7b0c63482ff66b0ccc08caa0d7dc895';
const POP_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

const main = document.querySelector('main');

async function getMovie() {
  const resp = await fetch(POP_URL);
  const respData = await resp.json();
  console.log(respData);
}

getMovie();
