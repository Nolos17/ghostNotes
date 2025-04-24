const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  saveNote: (note) => ipcRenderer.invoke('save-note', note),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
  deleteNote: (noteId) => ipcRenderer.invoke('delete-note', noteId),
  closeWindow: () => ipcRenderer.send('close-window'),
  moveDock: (position) => ipcRenderer.send('move-dock', position),
  newNote: () => ipcRenderer.send('new-note'),
  moveWindow: (position) => ipcRenderer.send('move-window', position),
  closeApp: () => ipcRenderer.send('close-app')
});