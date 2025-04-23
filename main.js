const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let dock = null;
let notesWindow = null;

function createDock() {
  if (dock) return;

  dock = new BrowserWindow({
    width: 48,
    height: 48,
    x: 50,
    y: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'js/preload.js'),
    },
  });

  dock.loadFile(path.join(__dirname, 'public/dock.html'));
}

function createNotesWindow() {
  if (notesWindow) {
    notesWindow.focus();
    return;
  }

  notesWindow = new BrowserWindow({
    width: 400,
    height: 420,
    x: 950,
    y: 100,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    backgroundColor: '#34C75980',
    webPreferences: {
      preload: path.join(__dirname, 'js/preload.js'),
    },
  });

  notesWindow.loadFile(path.join(__dirname, 'public/notes.html'));

  notesWindow.on('closed', () => {
    notesWindow = null;
    showDock();
  });

  hideDock();
}

function hideDock() {
  if (dock) dock.hide();
}

function showDock() {
  if (dock) dock.show();
}

ipcMain.on('move-dock', (event, position) => {
  const x = position.x;
  const y = position.y;
  if (typeof x !== 'number' || typeof y !== 'number') {
    console.error('Invalid move-dock arguments:', { x, y });
    return;
  }
  dock.setPosition(Math.round(x), Math.round(y));
});

ipcMain.on('new-note', () => {
  createNotesWindow();
});

ipcMain.on('close-window', () => {
  if (notesWindow) notesWindow.close();
});

ipcMain.on('move-window', (event, position) => {
  notesWindow.setPosition(position.x, position.y);
});

ipcMain.handle('load-notes', async () => {
  const filePath = path.join(__dirname, 'notes/notes.json');
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    if (!Array.isArray(parsedData)) throw new Error('Invalid notes data');
    return parsedData;
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([]));
      return [];
    }
    console.error('Error loading notes:', err);
    return [];
  }
});

ipcMain.handle('save-note', async (event, note) => {
  const filePath = path.join(__dirname, 'notes/notes.json');
  let notes = [];
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    notes = JSON.parse(data);
    if (!Array.isArray(notes)) throw new Error('Invalid notes data');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([]));
    } else {
      console.error('Error reading notes:', err);
      return { success: false, error: err.message };
    }
  }
  const existingIndex = notes.findIndex(n => n.id === note.id);
  if (existingIndex !== -1) {
    notes[existingIndex] = note;
  } else {
    notes.push(note);
  }
  try {
    await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
    return { success: true };
  } catch (err) {
    console.error('Error saving note:', err);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('delete-note', async (event, id) => {
  const filePath = path.join(__dirname, 'notes/notes.json');
  let notes = [];
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    notes = JSON.parse(data);
    if (!Array.isArray(notes)) throw new Error('Invalid notes data');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([]));
      return;
    }
    console.error('Error reading notes for delete:', err);
    return;
  }
  const updatedNotes = notes.filter(n => n.id !== id);
  try {
    await fs.writeFile(filePath, JSON.stringify(updatedNotes, null, 2));
  } catch (err) {
    console.error('Error deleting note:', err);
  }
});

app.whenReady().then(() => {
  createDock();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

if (require('electron-squirrel-startup')) app.quit();