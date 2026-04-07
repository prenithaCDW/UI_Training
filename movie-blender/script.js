const videoElement = document.querySelector(".video-container");
const titleElement = document.querySelector(".movie-title");
const descriptionElement = document.querySelector(".movie-description");
const movieSection = document.querySelector(".movies-container");
const commentsContainer=document.querySelector(".comments-container");
async function loadMovieData() {
    try {
        const response = await fetch("./data/video.json");
        const dataMovie = await response.json();
        videoElement.src = dataMovie.videoUrl;
        titleElement.textContent = dataMovie.title;
        descriptionElement.textContent = dataMovie.description;

        dataMovie.comments.forEach(commentData => {
            const divComment=document.createElement("div");
            divComment.className="comment-content";
            const img = document.createElement("img");
            img.className = "comment-image";
            img.src = commentData.image;
            img.alt = commentData.name;
            const divContent=document.createElement("div");
            divContent.className="content";
            const name = document.createElement("h5");
            name.className = "comment-name";
            name.textContent = commentData.name;
            const comment = document.createElement("p");
            comment.className = "comment";
            comment.textContent = commentData.comment;

            divComment.appendChild(img);
            divContent.appendChild(name);
            divContent.appendChild(comment);
            divComment.appendChild(divContent)
            commentsContainer.appendChild(divComment)
            movieSection.appendChild(commentsContainer);
        });
    } catch (error) {
        console.error("Error loading movie data:", error);
    }
}
loadMovieData();

async function displayPoster() {
  try {
    const response = await fetch('./data/posters.json');
    const dataPoster = await response.json();

    const posterContainer = document.querySelector('.posters-container');
    dataPoster.forEach(poster => {
      const posterCard = document.createElement('figure');
      posterCard.className = 'posters-card';
      const posterImage = document.createElement('img');
      posterImage.src = poster.imageUrl;
      posterImage.className='posters-image';
      posterImage.alt=poster.title;
      posterCard.appendChild(posterImage);
      posterContainer.appendChild(posterCard);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}
displayPoster();