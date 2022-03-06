const elementById = (id) => {
  console.log(id);
 return document.getElementById(id);
//  document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));

    keyword.value = "";
    albumContainer.innerHTML = "";
    artistContainer.innerHTML = "";
};

const showArtists = (data) => {
  
// const showArtists = ({artist}) => {
  console.log(data);
  console.log(artists);
  // const {artist} = data;
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card"); //main card div tar
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "Not Available"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Country Not Available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Style Not Available"}</p>
  </div>
  <button onclick="fetchAlbums('${artist.idArtist}')" class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);

    albumContainer.innerHTML = "";
  });
};

const fetchAlbums = (id) => {
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  console.log(id);
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album))

  albumContainer.innerHTML = "";
  artistContainer.innerHTML = "";
};

// const showAlbum = ({album, image , text}) => {
const showAlbum = (data) => {
  console.log(data);
  const albumContainer = elementById("albums");
  data.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb ? album.strAlbumThumb : "https://pic.onlinewebfonts.com/svg/img_148071.png"}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum ? album.strAlbum : "Not listed names"}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
