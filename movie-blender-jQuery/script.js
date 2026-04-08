$(document).ready(function () {
  const $videoElement = $(".video-container");
  const $titleElement = $(".movie-title");
  const $descriptionElement = $(".movie-description");
  const $movieSection = $(".movies-container");
  const $commentsContainer = $(".comments-container");
  const $playBtn = $(".play-btn");
  const $icon = $playBtn.find("i");
  function loadMovieData() {
    $.getJSON("./data/video.json").done(function (dataMovie) {

      $videoElement.attr("src", dataMovie.videoUrl);
      $titleElement.text(dataMovie.title);
      $descriptionElement.text(dataMovie.description);

      $.each(dataMovie.comments, function (_,commentData) {
        const $divComment = $("<div>").addClass("comment-content");
        const $img = $("<img>").addClass("comment-image").attr("src", commentData.image).attr("alt", commentData.name);
        const $divContent = $("<div>").addClass("content");
        const $name = $("<h5>").addClass("comment-name").text(commentData.name);
        const $comment = $("<p>").addClass("comment").text(commentData.comment);

        $divContent.append($name,$comment);
        $divComment.append($img, $divContent);
        $commentsContainer.append($divComment)
        $movieSection.append($commentsContainer);
      });
    })
      .fail(function (error) {
        console.error("Error loading movie data:", error);
      });
  }
  loadMovieData();

  function displayPoster() {
    $.getJSON('./data/posters.json').done(function (dataPoster) {

      const $posterContainer = $('.posters-container');
      dataPoster.forEach(poster => {
        const $posterCard = $('<figure>').addClass('posters-card');
        const $posterImage = $('<img>').addClass('posters-image').attr("src", poster.imageUrl).attr("alt", poster.title)
        $posterCard.append($posterImage);
        $posterContainer.append($posterCard);
      });
    })
      .fail(function (error) {
        console.error('Error fetching movies:', error);
      });
  }
  displayPoster();

  $playBtn.on("click", function () {
    if ($videoElement.get(0).paused) {
      $videoElement.get(0).play();
    } else {
      $videoElement.get(0).pause();
    }
  });

  $videoElement.on("play", function () {
    $icon.removeClass("fa-play").addClass("fa-pause");
  });

  $videoElement.on("pause", function () {
    $icon.removeClass("fa-pause").addClass("fa-play");
  });
});
