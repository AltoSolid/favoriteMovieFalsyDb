const addMovieModal = document.getElementById("add-modal")
const startAddMovieBtn = document.querySelector("header button");

const backdrop = document.getElementById("backdrop");

const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInput();
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
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
};

startAddMovieBtn.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler)