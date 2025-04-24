# 📝 GhostNotes
![Ícono de GhostNotes](image/icon.png)

¡**GhostNotes** es tu compañero perfecto para tomar notas de forma rápida y elegante! 🚀 Con un dock flotante siempre visible y una ventana de notas minimalista, esta app te permite gestionar tus ideas en cualquier momento. Diseñada con un estilo moderno y funcional, es ideal para usuarios que buscan simplicidad y eficiencia. 🎨💻

---

## ✨ Características

📍 **Dock Flotante**  
Un ícono circular (📝) que puedes arrastrar por la pantalla y que está siempre a tu alcance.  
- Doble clic para abrir la ventana de notas.  
- Botón de cierre (✕) para salir de la app.

📝 **Gestión de Notas**  
Crea, edita y elimina notas con facilidad.  
- **Crear**: Añade una nueva nota con ➕.  
- **Editar**: Modifica título y contenido, y guarda con 💾.  
- **Eliminar**: Borra notas con 🗑️ (eliminación inmediata).  
- **Cerrar**: Oculta la ventana con ❌.  
- **Recargar**: Actualiza la lista con 🔄.  
- Soporte para notas largas sin límite práctico.

💾 **Persistencia de Datos**  
Tus notas se guardan automáticamente en `C:\Users\<TuUsuario>\AppData\Roaming\barra-notas1\notes\notes.json` y persisten entre sesiones.

🎨 **Diseño Moderno**  
Interfaz estilizada con Tailwind CSS: fondo cian translúcido, bordes redondeados y botones interactivos.

📦 **Instalador Personalizado**  
Instalador para Windows con mensajes personalizados y desinstalador integrado.

---

## 🛠️ Tecnologías Usadas

⚡ **Electron**: Framework para aplicaciones de escritorio multiplataforma.  
📜 **JavaScript**: Lógica de la app (proceso principal y renderer).  
🎨 **HTML5/CSS**: Interfaz de usuario (dock y ventana de notas).  
💅 **Tailwind CSS**: Estilos modernos y consistentes.  
🌐 **Node.js**: Entorno para dependencias y empaquetado.  
🔧 **Electron Forge**: Herramienta para empaquetar y generar instaladores (con Squirrel para Windows).  
📋 **Inno Setup**: Personalización del instalador con mensajes.

---

## 📸 Capturas de Pantalla

**Dock Flotante** 📍  
![Dock de GhostNotes](image/flotante.png)

![Dock de GhostNotes](image/iconflotante.png)

**Ventana de Notas** 📝  
![Notas de GhostNotes](image/notes.png)


---

## 🔧 Instalación

Sigue estos pasos para instalar **GhostNotes** en tu computadora:

### 📋 Requisitos
- Sistema operativo: Windows (probado en Windows 10/11).  
- No se necesitan dependencias adicionales.

### 📥 Pasos para Instalar
1. Descarga el instalador `BarraNotasSetup.exe` desde `out/make/squirrel.windows/x64/`.  
   - **Nota**: El instalador se llama `BarraNotasSetup.exe` debido a una configuración anterior, pero instala GhostNotes.  
2. Ejecuta `BarraNotasSetup.exe`.  
   - Verás un mensaje: *"Bienvenido a la instalación de Barra Notas..."* (se actualizará en futuras versiones).  
   - Haz clic en "Siguiente".  
3. Sigue las instrucciones del asistente.  
   - La app se instala en `C:\Program Files (x86)\BarraNotas`.  
   - Se crean accesos directos en el escritorio y menú de inicio ("Barra Notas").  
4. Haz clic en "Finalizar" para abrir GhostNotes.

---

## 🚀 Para Desarrolladores: Modificar y Empaquetar

¿Quieres personalizar GhostNotes o empaquetarlo en otro computador? Aquí tienes los pasos:

### 📋 Requisitos
- **Node.js** (versión 18 o superior).  
- Editor de código (recomendado: Visual Studio Code).  
- Sistema operativo compatible con Electron (Windows, macOS, Linux).

### 📦 Pasos
1. **Clonar o Copiar el Proyecto**  
   Transfiere la carpeta del proyecto o clona el repositorio:  
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd barra-notas1
   ```

2. **Instalar Dependencias**  
   ```bash
   npm install
   ```

3. **Configurar Tailwind CSS**  
   Genera los estilos:  
   ```bash
   npx tailwindcss -i ./public/css/input.css -o ./public/css/tailwind.css
   ```  
   Para desarrollo, usa:  
   ```bash
   npm run tailwind
   ```

4. **Modificar el Código**  
   Archivos clave:  
   - `main.js`: Lógica principal (ventanas, persistencia).  
   - `public/notes.html`, `public/dock.html`: Interfaz.  
   - `js/notes.js`, `js/dock.js`: Lógica del renderer.  
   - `public/css/input.css`: Estilos con Tailwind.

5. **Probar Cambios**  
   Inicia la app en modo desarrollo:  
   ```bash
   npm start
   ```

6. **Empaquetar**  
   Genera el ejecutable:  
   ```bash
   npm run package
   ```  
   Esto crea `out/barra-notas-win32-x64/barra-notas.exe` (en Windows).

7. **Crear Instalador**  
   Genera el instalador:  
   ```bash
   npm run make
   ```  
   Encuentra `BarraNotasSetup.exe` en `out/make/squirrel.windows/x64/`.

8. **(Opcional) Personalizar Instalador**  
   - Instala [Inno Setup](https://jrsoftware.org/isdl.php).  
   - Usa `installer.iss` para compilar un instalador personalizado:  
     - Abre Inno Setup Compiler.  
     - Carga `installer.iss`.  
     - Compila para generar el instalador en `Output/`.

---

## 🎯 Instrucciones de Uso

📍 **Abrir Notas**  
Haz doble clic en el dock flotante (📝) para abrir la ventana de notas.

📝 **Gestionar Notas**  
- **Crear**: Clic en ➕ para una nueva nota.  
- **Editar**: Cambia título/content y guarda con 💾.  
- **Eliminar**: Usa 🗑️ para borrar (eliminación inmediata).  
- **Cerrar**: Clic en ❌ para ocultar la ventana.  
- **Recargar**: Usa 🔄 para actualizar la lista.

💾 **Persistencia**  
Tus notas se guardan automáticamente y persisten entre sesiones.

🚪 **Cerrar la App**  
Usa el botón ✕ en el dock para cerrar completamente.

---

## 🤝 Contribuir

¡Tus ideas son bienvenidas! 🌟 Para contribuir:  
1. 🍴 Haz un fork del repositorio.  
2. 🌱 Crea una rama (`git checkout -b mi-caracteristica`).  
3. ✍️ Realiza tus cambios y haz commit (`git commit -m "Añadir característica"`).  
4. 🚀 Sube tu rama (`git push origin mi-caracteristica`).  
5. 📬 Abre un Pull Request en GitHub.  

Por favor, sigue el estilo del código y añade comentarios si es necesario.

---

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.

---

## 📞 Soporte

¿Tienes problemas o sugerencias?  
- Contacta al desarrollador: [Tu correo o información de contacto].  
- Abre un issue en el repositorio (si está en GitHub).

¡Disfruta de tomar notas con **GhostNotes**! 📝✨