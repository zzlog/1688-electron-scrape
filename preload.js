const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  scrape1688: (url) => ipcRenderer.invoke('scrape-1688', url),
});
