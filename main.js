const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const scrape1688 = require('./scraper');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('renderer.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle('scrape-1688', async (event, url) => {
  return await scrape1688(url);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
