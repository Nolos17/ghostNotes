const boton = document.getElementById('boton');
let isDragging = false;
let startX, startY, winX, winY;
let hasMoved = false;
const moveThreshold = 5; // Umbral de movimiento en píxeles

// Dimensiones del ícono y límites de la pantalla
const iconWidth = 48;
const iconHeight = 48;
const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updatePosition(newX, newY) {
  // Restringe la posición dentro de los límites de la pantalla
  const clampedX = clamp(newX, 0, screenWidth - iconWidth);
  const clampedY = clamp(newY, 0, screenHeight - iconHeight);
  window.api.moveDock({ x: clampedX, y: clampedY }); // Enviar como objeto
}

boton.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.screenX;
  startY = e.screenY;
  winX = window.screenX;
  winY = window.screenY;
  hasMoved = false;
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const dx = e.screenX - startX;
    const dy = e.screenY - startY;
    const newX = winX + dx;
    const newY = winY + dy;

    const deltaX = Math.abs(newX - winX);
    const deltaY = Math.abs(newY - winY);

    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      hasMoved = true;
      requestAnimationFrame(() => updatePosition(newX, newY));
    }
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    if (!hasMoved) {
      window.api.newNote();
    }
  }
});