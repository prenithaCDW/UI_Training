const backArrow = document.querySelector(".arrow-icon");
const deleteBtn = document.querySelector(".delete-note-button");
const deleteModal = document.querySelector(".delete-note-container");
const deleteClose = document.querySelector(".delete-note-icon");
const overlay = document.querySelector(".overlay");
const editBtn = document.querySelector(".edit-note-button");
const editPanel = document.querySelector(".edit-notes-container");
const editCloseBtn = document.querySelector(".edit-notes-header-icon");
const editSaveBtn = document.querySelector(".edit-notes-footer-save-button");
const editTitleInput = document.querySelector(".edit-notes-body-title");
const editImageInput = document.querySelector(".edit-notes-body-image");
const editContentInput = document.querySelector(".edit-notes-body-content");
const editColorCircles = document.querySelectorAll(".edit-notes-footer-color-container .color-circle");
const singleContainer = document.querySelector(".single-note-container");
const titleElement = document.querySelector(".note-description-heading");
const dateElement = document.querySelector(".note-description-date");
const contentElement = document.querySelector(".note-description-content");
const imageContainer = document.querySelector(".note-description-image");
const colorCircle = document.querySelector(".note-description-color");
const leaveContainer = document.querySelector(".leave-container");
const leaveConfirm = document.querySelector(".leave-confirm");
const leaveClose = document.querySelector(".leave-icon");
const deleteConfirm = document.querySelector(".delete-note-confirm");
//obtain active note
let notes = JSON.parse(localStorage.getItem("notes")) || [];
const activeNoteId = Number(localStorage.getItem("activeNoteId"));
const activeNote = notes.find(n => Number(n.id) === activeNoteId);
if (!activeNote) {
    window.location.href = "http://127.0.0.1:5500/pocket-notes/index.html";
}
let selectedColor = activeNote.color;

//back arrow 
backArrow.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/pocket-notes/index.html";
});

deleteBtn.addEventListener("click", () => {
    deleteModal.style.display = "block";
    overlay.style.display = "block";
});

deleteClose.addEventListener("click", () => {
    deleteModal.style.display = "none";
    overlay.style.display = "none";
});

editColorCircles.forEach(circle => {
    circle.addEventListener("click", () => {
        editColorCircles.forEach(c => c.classList.remove("selected"));
        circle.classList.add("selected");
        selectedColor = [...circle.classList].find(
            cls => cls !== "color-circle" && cls !== "selected"
        );
    });
});

function validateEdit() {
    editSaveBtn.disabled =
        !editTitleInput.value.trim() ||
        !editContentInput.value.trim();
}

//editcontainer functions
editTitleInput.addEventListener("input", validateEdit);
editContentInput.addEventListener("input", validateEdit);
editBtn.addEventListener("click", () => {
    editPanel.style.display = "flex";
    overlay.style.display = "block";
    editTitleInput.value = activeNote.title;
    editImageInput.value = activeNote.image || "";
    editContentInput.value = activeNote.content;
    editColorCircles.forEach(c => c.classList.remove("selected"));
    document.querySelector(`.edit-notes-footer-color-container .${activeNote.color}`).classList.add("selected");
    editSaveBtn.disabled = false;
});

editSaveBtn.addEventListener("click", () => {
    activeNote.title = editTitleInput.value.trim();
    activeNote.image = editImageInput.value.trim();
    activeNote.content = editContentInput.value.trim();
    activeNote.color = selectedColor;
    activeNote.updatedAt = Date.now();
    localStorage.setItem("notes", JSON.stringify(notes));
    editPanel.style.display = "none";
    overlay.style.display = "none";
    renderSingleNote();
});

editCloseBtn.addEventListener("click", () => {
    editPanel.style.display = "flex";
    overlay.style.display = "block";
    leaveContainer.style.display="block";
});

//leave container functions
leaveConfirm.addEventListener("click",()=>{
    editPanel.style.display = "none";
    overlay.style.display = "none";
    leaveContainer.style.display="none";
});

leaveClose.addEventListener("click",()=>{
    editPanel.style.display = "flex";
    overlay.style.display = "block";
    leaveContainer.style.display="none";
});

//rendering single note
function renderSingleNote() {
    titleElement.textContent = activeNote.title;
    dateElement.textContent = formatDate(activeNote.updatedAt);
    contentElement.textContent = activeNote.content;

    colorCircle.className = "note-description-color";
    colorCircle.classList.add(activeNote.color);

    imageContainer.innerHTML = "";
    imageContainer.style.display = "none";
    if (activeNote.image && activeNote.image.trim()) {
        const img = document.createElement("img");
        img.src = activeNote.image;
        img.onerror = () => {
            imageContainer.innerHTML = "";
        };
        imageContainer.appendChild(img);
        imageContainer.style.display = "block";
    }
}

//time format for notes
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

//deleting single note
deleteConfirm.addEventListener("click", () => {
    notes = notes.filter(n => n.id !== activeNoteId);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.removeItem("activeNoteId");
    window.location.href = "http://127.0.0.1:5500/pocket-notes/index.html";
});

renderSingleNote();