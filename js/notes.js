const notesContainer = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note');

function createNoteElement(note) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'bg-cyan-500/40 p-4 rounded shadow';
  noteDiv.innerHTML = `
    <input type="text" class="bg-cyan-500/10 w-full mb-2 font-bold border-b" placeholder="Título" value="${note.title || ''}">
    <textarea class="bg-cyan-500/90 w-full h-60 border rounded p-2 resize-none" placeholder="Contenido">${note.content || ''}</textarea>
    <div class="bg-cyan-500/10 flex justify-end space-x-4 mt-2 text-xl">
      <button class="save-note text-green-600 hover:text-green-800" title="Guardar">💾</button>
      <button class="delete-note text-red-600 hover:text-red-800" title="Eliminar">🗑️</button>
      <button class="close-note text-gray-600 hover:text-gray-800" title="Cerrar">❌</button>
    </div>
  `;

  const titleInput = noteDiv.querySelector('input');
  const contentTextarea = noteDiv.querySelector('textarea');
  const saveButton = noteDiv.querySelector('.save-note');
  const deleteButton = noteDiv.querySelector('.delete-note');
  const closeButton = noteDiv.querySelector('.close-note');

  saveButton.addEventListener('click', async () => {
    const updatedNote = {
      id: note.id,
      title: titleInput.value,
      content: contentTextarea.value,
    };
    try {
      const result = await window.api.saveNote(updatedNote);
      if (result.success) {
        showMessage(updatedNote.id ? 'Nota actualizada correctamente' : 'Nota guardada correctamente');
      } else {
        showMessage('Error al guardar: ' + (result.error || 'Desconocido'));
      }
    } catch (err) {
      showMessage('Error al guardar');
      console.error('Error saving note:', err);
    }
  });

  deleteButton.addEventListener('click', async () => {
    console.log('Eliminando nota con ID:', note.id); // Depuración
    try {
      await window.api.deleteNote(note.id);
      noteDiv.remove();
      showMessage('Nota eliminada');
      loadNotes(); // Recargar las notas después de eliminar
    } catch (err) {
      showMessage('Error al eliminar');
      console.error('Error deleting note:', err);
    }
  });

  closeButton.addEventListener('click', () => {
    noteDiv.remove();
  });

  return noteDiv;
}

async function loadNotes() {
  try {
    const notes = await window.api.loadNotes();
    if (!Array.isArray(notes)) {
      throw new Error('Invalid notes data');
    }
    notes.sort((a, b) => a.id - b.id); // Orden: de más antiguo a más reciente
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      notesContainer.appendChild(createNoteElement(note));
    });
  } catch (err) {
    showMessage('Error al cargar notas');
    console.error('Error loading notes:', err);
  }
}

addNoteButton.addEventListener('click', async () => {
  const newNote = {
    id: Date.now(),
    title: '',
    content: '',
  };
  try {
    const result = await window.api.saveNote(newNote);
    if (result.success) {
      const noteElement = createNoteElement(newNote);
      notesContainer.appendChild(noteElement);
      showMessage('Nota guardada correctamente');
    } else {
      showMessage('Error al guardar: ' + (result.error || 'Desconocido'));
    }
  } catch (err) {
    showMessage('Error al guardar');
    console.error('Error creating note:', err);
  }
});

document.getElementById('load-all-notes').addEventListener('click', () => {
  loadNotes();
});

document.getElementById('close-window').addEventListener('click', () => {
  window.api.closeWindow();
});

function showMessage(text) {
  const message = document.createElement('div');
  message.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow';
  message.textContent = text;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 2000);
}

loadNotes(); // Cargar las notas al iniciar