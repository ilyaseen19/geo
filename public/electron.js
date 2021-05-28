
const { app, BrowserWindow } = require('electron')
const isDev = require("electron-is-dev")
const path = require("path")

function createWindow () {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    }
  })

  // win.maximize();
  win.show();
//   win.removeMenu();

  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

if(isDev){
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true
    })
  } catch (_) {}
}
