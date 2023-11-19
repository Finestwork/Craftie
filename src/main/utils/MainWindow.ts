import { screen, shell, BrowserWindow } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../build/icons/256x256.png?asset';

export const createWindow = () => {
  let mainWindow: BrowserWindow | null = null;

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 420,
    minHeight: 400,
    width: width / 1.25,
    height: height / 1.25,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    title: 'Craftie',
    icon: icon,
    titleBarOverlay: {
      color: '#090B10',
      symbolColor: '#6A7080',
      height: 32
    },
    center: true,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show?.();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  mainWindow.webContents.openDevTools({
    mode: 'detach'
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  return mainWindow;
};
