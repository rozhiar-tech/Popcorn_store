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
         <section class=" w-max h-max my-auto my-72 p-12 flex">
            <!---->
            <div class="ActorPic box-content h-60 w-48 p-12 border-9-red bg-gray-700 absolute"  style="background-Image: url(${BACKDROP_BASE_URL+actor.profile_path})">
               
                    <div class="name text-red-800 font-Radley text-8xl mx-60 my-0 absolute">${actor.name}</div>
                    <div class="nameShadow  text-white font-Radley text-8xl text-8xl mx-60 my-2 absolute">
                        <h1> ${actor.name}</h1>
                    </div>
                </div>
            </div>
        </section>

        <div class="container mx-0 w-max h-max my-30 p-20">
            <h3 class="AB text-white font-Radley text-4xl my-5 mx-5"> About</h3>

            <div class="desc grid grid-cols-2 gap-10 mx-5">
                <div class="bttn w-24 h-10 bg-red-100 mr-40 text-2xl text-center rounded-lg text-red-800 font-Radley">
                    <p class="G"></p>Gender</p>
                </div>
                <div class="bttn w-24 h-9 bg-red-700 text-xl text-center rounded-lg ">
                    <p class="F text-white font-Radley">${getGender(actor)}</p>
                </div>
                <div class="bttn w-24 h-10 bg-red-100  text-2xl text-center rounded-lg ">
                    <p class="B text-red-800 font-Radley">Birthday</p>
                </div>
                <div class="bttn w-24 h-10 bg-red-700 text-sm text-center pt-2 rounded-lg ">
                    <p class="bD text-white font-Radley">${actor.birthday}</p>
                </div>
                <div class="bttn w-24 h-10 bg-red-100 text-2xl text-center rounded-lg">
                    <p class="BI text-red-800 font-Radley">Born in</p>
                </div>
                <div class="bttn w-24 h-15 bg-red-700 text-lg text-center rounded-lg ">
                    <p class="POB text-white font-Radley">${actor.place_of_birth}</p>
                </div>
                <div class="bttn w-24 h-9 bg-red-100 text-xl text-center rounded-lg">
                    <p class="P text-red-800 font-Radley">Popularity</p>
                </div>
            </div>
        </div>
        <div class="bio w-300 h-300 mr-80 p-12">
            <h2 class="text-white font-'Radley' text-4xl mx-10 mt-100">Bio</h2>
            <p class="text-white font-'Radley' text-lg mx-10 text-justify">${actor.biography}</p>

        </div>


        <div class="knownfor text-white font-'Radley' text-4xl mx-10 mt-0 mb-10">
            <h2>Known for</h2>
        </div>
        <div class="known flex grid-cols-4 jusitfy-between gap-20">
            <div class="movie1 box-content h-60 w-48 p-12 border-0 bg-gray-700 mx-9 my-1"></div>
            <div class="movie1 box-content h-60 w-48 p-12 border-0 bg-gray-700 mx-9 my-1"></div>
            <div class="movie1 box-content h-60 w-48 p-12 border-0 bg-gray-700 mx-9 my-1"></div>
            <div class="movie1 box-content h-60 w-48 p-12 border-0 bg-gray-700 mx-9 my-1"></div>



        </div>
        </section>
      
       
    `;
}

function getGender(actor) {
    let gender = "";
    if (actor.gender == 2) {
        gender = "male";
    } else {
        gender = "female";
    }
    return gender;
}

document.addEventListener("DOMContentLoaded", autorun);