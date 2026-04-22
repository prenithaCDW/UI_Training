function saveSameNote15Times() {
  const note = {
    title: "Summer Time - A Long Short Story",
    image: "https://picsum.photos/300/200"
    };

  const notes = [];

  for (let i = 0; i < 15; i++) {
    notes.push({
      id: i,
      title: note.title,
      image: note.image,
      updatedAt: 1776679148386,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reprehenderit ea error deleniti? Saepe aliquid architecto maxime illo labore fuga atque sint quae facere in debitis perspiciatis, totam similique ipsa.",
      color: "yellow"
    });
  }

  localStorage.setItem("notes", JSON.stringify(notes));
}

// call it
saveSameNote15Times();