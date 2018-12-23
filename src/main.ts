import { app, BrowserWindow, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import { format } from 'url';

import { fileMenuTemplate } from '@/infrastructure/electron/mainMenu';

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Traverse',
    height: 600,
    width: 600,
    titleBarStyle: 'hiddenInset',
    resizable: true,
    // backgroundColor: '#22292f',
  });

  const filePath = format({
    pathname: join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(filePath);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(fileMenuTemplate));
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
