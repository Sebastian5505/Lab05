document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const saveBtn = document.getElementById("save-btn");
  const notesList = document.getElementById("notes-list");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const undoBtn = document.getElementById("undo-btn");

  let notes = [];
  let lastDeletedNote = null;
  let lastDeletedIndex = null;
  let toastTimeout = null;

  // Prevención de notas vacías: deshabilita el botón si no hay texto
  function validateForm() {
    const isTitleValid = titleInput.value.trim().length > 0;
    const isContentValid = contentInput.value.trim().length > 0;
    saveBtn.disabled = !(isTitleValid && isContentValid);
  }

  titleInput.addEventListener("input", validateForm);
  contentInput.addEventListener("input", validateForm);

  // Mostrar mensaje de estado y botón Deshacer
  function showToast(message, showUndo = false) {
    clearTimeout(toastTimeout);
    toastMessage.textContent = message;

    if (showUndo) {
      undoBtn.classList.remove("hidden");
    } else {
      undoBtn.classList.add("hidden");
    }

    toast.classList.remove("hidden");

    toastTimeout = setTimeout(() => {
      toast.classList.add("hidden");
      lastDeletedNote = null;
    }, 5000);
  }

  // Dibujar notas en pantalla
  function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const noteCard = document.createElement("article");
      noteCard.className = "note-card";
      noteCard.innerHTML = `
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.content)}</p>
        <button class="btn-delete" onclick="deleteNote(${index})">Eliminar</button>
      `;
      notesList.appendChild(noteCard);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }

  // Evento para agregar nota
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newNote = {
      title: titleInput.value.trim(),
      content: contentInput.value.trim()
    };

    notes.push(newNote);
    renderNotes();
    noteForm.reset();
    validateForm();
    showToast("Nota agregada con éxito");
  });

  // Función global para borrar notas
  window.deleteNote = function(index) {
    lastDeletedNote = notes[index];
    lastDeletedIndex = index;
    notes.splice(index, 1);
    renderNotes();
    showToast("Nota eliminada", true);
  };

  // Botón Deshacer
  undoBtn.addEventListener("click", () => {
    if (lastDeletedNote !== null) {
      notes.splice(lastDeletedIndex, 0, lastDeletedNote);
      renderNotes();
      lastDeletedNote = null;
      toast.classList.add("hidden");
      showToast("Acción cancelada: Nota restaurada");
    }
  });
});