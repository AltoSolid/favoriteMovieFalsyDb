const addMovieModal = document.getElementById("add-modal")
const startAddMovieBtn = document.querySelector("header button");

const backdrop = document.getElementById("backdrop");

const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const listRoot = document.getElementById("movie-list");


const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = "";
    }
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert("Please enter valid values (rating between 1 and 5).");
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    updateUI();
    renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
};

const deleteMovie = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = movieId => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
    let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

    //Tricky part to "solve" the problem with "too many eventsListeners"
    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
    confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");
    cancelDeletionBtn.removeEventListener("click", closeMovieDeletionModal);

    cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);
    confirmDeletionBtn.addEventListener("click", deleteMovie.bind(null, movieId));
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const renderNewMovie = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class="movie-element__image"> 
        <img src="${imageUrl}" alt="${title}-image">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>`;
    newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id));
    listRoot.append(newMovieElement);
};

startAddMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler)