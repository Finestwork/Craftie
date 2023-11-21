import { screen, shell, BrowserWindow } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../build/icons/256x256.png?asset';

export default class MainWindow {
    private _mainWindow: BrowserWindow | null;

    constructor() {
        this._mainWindow = null;
    }
    get mainWindow(): BrowserWindow | null {
        return this._mainWindow;
    }

    /**
     * @desc Create the browser window
     */
    createWindow() {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;

        this._mainWindow = new BrowserWindow({
            minWidth: 420,
            minHeight: 400,
            width: Math.ceil(width * 0.7),
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
        this.listeners();
        this.handleFileLoad();
    }

    private listeners() {
        if (this._mainWindow === null) return;

        this._mainWindow.on('ready-to-show', () => {
            this._mainWindow?.show?.();
        });

        this._mainWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny' };
        });

        this._mainWindow.webContents.openDevTools({
            mode: 'detach'
        });
    }

    /**
     * @desc HMR for renderer base on electron-vite cli. Load the remote URL for development or the local html file for production.
     */
    private handleFileLoad() {
        if (this._mainWindow === null) return;

        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            this._mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
        } else {
            this._mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
        }
    }
}
