//Elements
const newBtnNotes = document.querySelector(".new-button");
const panelNotes = document.querySelector(".new-notes-container");
const closeBtnNotes = document.querySelector(".new-notes-header-icon");
const addBtnNotes = document.querySelector(".new-notes-footer-add-button");
const titleInput = document.querySelector('.new-notes-body-title');
const imageInput = document.querySelector('.new-notes-body-image');
const contentInput = document.querySelector('.new-notes-body-content');
const colorCircles = document.querySelectorAll('.color-circle');
const emptyContainer = document.querySelector('.empty-container');
const notesGrid = document.querySelector('.notes-grid');
const deleteAllContainer = document.querySelector('.delete-all-container');
const deleteAllTrigger = document.querySelector('.delete-all-trigger');
const deleteAllConfirm = document.querySelector('.delete-all-confirm');
const deleteAllClose = document.querySelector('.delete-all-icon');
const loadMoreConatiner = document.querySelector('.load-more-button');
const leaveContainer = document.querySelector(".leave-container");
const leaveConfirm = document.querySelector(".leave-confirm");
const leaveClose = document.querySelector(".leave-icon");
const overlay = document.querySelector(".overlay");
//Object of colors
const NOTE_COLORS = {
    pink: '#e6cdeb',
    white: '#fcfcfc',
    green: '#f7cc7f',
    yellow: '#e7ee9b',
    orange: '#f2ab90'
};

const LOAD_BATCH = 10;
//State(local storage)
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let selectedColor = localStorage.getItem('lastColor') || "pink";
let visibleCount = LOAD_BATCH;

//open/close the new notes container
newBtnNotes.addEventListener("click", () => {
    panelNotes.style.display = 'flex';
    overlay.style.display = "block";;
});

closeBtnNotes.addEventListener("click", () => {
    leaveContainer.style.display = 'block';
    overlay.style.display = "block";;
});

leaveConfirm.addEventListener("click", () => {
  leaveContainer.style.display = "none";
  panelNotes.style.display = "none";
  overlay.style.display = "none"();
  resetForm(); 
});

leaveClose.addEventListener("click", () => {
  leaveContainer.style.display = "none";
});


//picking color
colorCircles.forEach(circle => {
    circle.addEventListener("click", () => {
        colorCircles.forEach(c => c.classList.remove("selected"));
        circle.classList.add("selected");
        selectedColor = [...circle.classList].find(cls => cls !== 'color-circle' && cls !== 'selected');
        localStorage.setItem('lastColor', selectedColor);
    });
});

//validation
titleInput.maxLength = 100;
titleInput.addEventListener("input", validate);
contentInput.addEventListener("input", validate);

//FUNCTION validate content
function validate() {
    addBtnNotes.disabled = !(titleInput.value.trim() && contentInput.value.trim());
}

//Add note
addBtnNotes.addEventListener("click", () => {
    const note = {
        id: Date.now(),
        title: titleInput.value.trim(),
        image: imageInput.value.trim(),
        content: contentInput.value.trim(),
        color: selectedColor,
        updatedAt: Date.now()
    };

    notes.unshift(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    visibleCount = LOAD_BATCH;
    renderNotes();
    toggleEmpty();
    resetForm();
    panelNotes.style.display = "none";
    overlay.style.display = "none"(); 
});

//rendering notes using fragment and sorted
function renderNotes() {
    notesGrid.innerHTML = ' ';
    const fragment = document.createDocumentFragment();
    notes.sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, visibleCount)
        .forEach(note => {
            const card = document.createElement("div");
            card.className = "note-card";
            card.style.backgroundColor = NOTE_COLORS[note.color];
            card.innerHTML = `
        <h2 class="note-title">${note.title}</h2>
        <div class="note-date">${formatDate(note.updatedAt)}</div>
        ${note.image? `<div class="note-image"><img src="${note.image}" alt="note image"></div>`: ""}
        <p class="note-content">${note.content}</p>
        `;
            const img = card.querySelector('img');
            if (img) {
                img.onerror = () => img.remove();
            }
            fragment.appendChild(card);
            card.addEventListener("click",()=>{
                localStorage.setItem("activeNoteId",note.id);
                window.location.href = "http://127.0.0.1:5500/pocket-notes/note.html";
            });
        });
    notesGrid.appendChild(fragment);
    loadMoreConatiner.style.display = notes.length > visibleCount ? "block" : "none";
}

//loading more button functions
loadMoreConatiner.addEventListener("click", () => {
    visibleCount += LOAD_BATCH;
    renderNotes();
});

//if empty how to hangle function
function toggleEmpty() {
    const hasNotes = notes.length > 0;
    emptyContainer.style.display = hasNotes ? 'none' : 'flex';
    notesGrid.style.display = hasNotes ? 'grid' : 'none';
    deleteAllTrigger.style.display = hasNotes ? 'inline-block' : 'none';
    loadMoreConatiner.style.display = hasNotes && notes.length > visibleCount ? "block" : "none";
}

//reset the values of notes
function resetForm() {
    titleInput.value = '';
    imageInput.value = '';
    contentInput.value = '';
    addBtnNotes.disabled = true;
}

//delete all button 
deleteAllTrigger.addEventListener("click", () => {
    if (!notes.length) {
        toggleEmpty();
        return;
    }
    deleteAllContainer.style.display = "block";
    overlay.style.display = "block";;
});

deleteAllClose.addEventListener("click", () => {
    deleteAllContainer.style.display = 'none';
      overlay.style.display = "none"();
});

deleteAllConfirm.addEventListener("click", () => {
    notes = [];
    localStorage.removeItem("notes");
    visibleCount = LOAD_BATCH;
    notesGrid.innerHTML = "";
    toggleEmpty();
    deleteAllContainer.style.display = "none";
      overlay.style.display = "none"();
});

//time format for notes
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

window.addEventListener("storage", () => {
  notes = JSON.parse(localStorage.getItem('notes')) || [];
  renderNotes();
});

//initial storage
renderNotes();
toggleEmpty();