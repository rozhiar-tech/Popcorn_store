'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".containerr");

// const API = 'e3ba83efee8dd4f97c52f27960082fa6';
// const API_URL = TMDB_BASE_URL + "/person/popular?api_key=" + API + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";



const autorun = async() => {
    const actors = await fethActors();

    renderActors(actors.results);

};



const constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};


const fethActors = async() => {
    const url = constructUrl(`person/popular`);
    const res = await fetch(url);
    // console.log(res.json());
    return res.json();
}

const actorDetail = async(actor) => {
    const actorRes = await fethActor(actor.id);
    console.log(actorRes);
    renderActor(actorRes);

}

const fethActor = async(actorId) => {
    const url = constructUrl(`person/${actorId}`);
    const res = await fetch(url);
    return res.json();
};

const renderActors = (actors) => {
    actors.map((actor) => {
        console.log(actor.name);
        const movieDiv = document.getElementById("nowPlaying");
        const divCard = document.createElement("div");
        divCard.className = "animation box-content h-60 w-48 p-12 border-0 bg-gray-700 mx-9 my-1 bg-no-repeat bg-cover bg-center";
        divCard.style.backgroundImage = `url(${BACKDROP_BASE_URL+actor.profile_path})`;

        divCard.innerHTML = `
            <div class="overlay h-full">
                <div class="actorheader-text text-4xl"></div>
                <p class="actormovie-style text-lg text-white mt-48 ml-5  ">${actor.name}</p>
                <p class="actormovie-style text-lg text-white mt-3 ml-5 text-sm  ">${knownFor(actor)}</p>
              
            </div>
        `;
        movieDiv.appendChild(divCard);
        divCard.addEventListener("click", () => {
            actorDetail(actor);
            // lastCA.remove();
        });
        CONTAINER.appendChild(movieDiv);

    });

}

function knownFor(actor) {
    let known = "";
    actor.known_for.map((movie) => {
        known += movie.title + ", ";
    });
    return known;
}

const renderActor = (actor) => {
    CONTAINER.innerHTML = `
     <div  class="bg-black w-full   absolute  ">
        <div class="flex mt-16 ml-10">
            <div class="mainmovie-div bg-gray-300 bg-no-repeat bg-cover bg-center "  style="background-Image: url(${BACKDROP_BASE_URL+actor.profile_path})">
                <div class="movie-triangle1 z-50  absolute"></div>
                <div class="movie-triangle2 z-50  absolute"></div>
            </div>

            <div class="red-circle w-9 h-9 bg-red-900 ml-36 mt-3 rounded-full "></div>
            <div class="line-1 rounded absolute "></div>

            <div class="mainmovie-div flex flex-col gap-24  bg-black ml-24 ">
                <div class="">
                    <p class="moviesparaghrap  mt-3  text-center text-5xl text-red-900 ">${actor.name}</p>
                </div>
                <div class="">
                    <p class="moviesparaghrap2 font-bold  text-center text-lg text-white "></p>
                </div>
                <div class="flex">
                    <p class="moviesparaghrap   text-center text-4xl mt-10 text-red-900 ">Ratings:</p>
                    <div class="star-icon flex mt-10 ml-5 text-white text-4xl"></div>
                </div>
            </div>

        </div>
      
       
    `;
}

document.addEventListener("DOMContentLoaded", autorun);