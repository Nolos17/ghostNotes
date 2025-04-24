module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'public/icon', // Ícono para la app
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: 'public/icon.ico', // Ícono para el instalador
        shortcutName: 'GhostNotes', // Nombre del acceso directo
        setupExe: 'GhostNotes.exe', // Nombre del instalador
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ]
};