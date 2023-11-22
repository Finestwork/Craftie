import MainWindow from './MainWindow';
import { globalShortcut } from 'electron';
import type { OpenDialogOptions } from 'electron';
import { dialog } from 'electron';
import { readFile } from 'fs';
import { basename, extname } from 'path';

export default class KeyboardShortcuts {
    /**
     * Constructs a new instance of the App class.
     * @constructor
     * @param {MainWindow} mainWindow - The main window of the application.
     */
    constructor(private mainWindow: MainWindow) {}

    // Register all shortcuts
    public register() {
        this.runCode();
        this.switchTab();
        this.onClickSaveFile();
        this.openTabDropdown();
        this.closeActiveTab();
        this.openFile();
        this.reformatCode();
    }

    public destroy() {
        globalShortcut.unregisterAll();
    }

    /**
     * Run code when alt+enter keys are pre
     */
    private runCode() {
        globalShortcut.register('Alt+Enter', () => {
            this._sendWebContents('onShortcutKeyRunCode');
        });
    }

    /**
     * Switch tab when left/right arrow + alt key is pre
     */
    private switchTab() {
        globalShortcut.register('Alt+Left', () => {
            this._sendWebContents('onShortcutSwitchTabLeft');
        });
        globalShortcut.register('Alt+Right', () => {
            this._sendWebContents('onShortcutSwitchTabRight');
        });
    }

    /**
     * Sends a message to the renderer that it needs to save the
     */
    private onClickSaveFile() {
        globalShortcut.register('CmdOrCtrl+S', () => {
            this._sendWebContents('onShortcutSaveFile');
        });
    }

    /**
     * Opens up dropdown when ctrl + t is pr
     */
    private openTabDropdown() {
        globalShortcut.register('CmdOrCtrl+t', () => {
            this._sendWebContents('onShortcutOpenTabDropdown');
        });
        globalShortcut.register('Escape', () => {
            this._sendWebContents('onShortcutCloseTabDropdown');
        });
    }

    /*
     * Close active text editor
     */
    private closeActiveTab() {
        globalShortcut.register('CommandOrControl+W', () => {
            this._sendWebContents('closeActiveTab');
        });
    }

    /*
     * Open up a file
     */
    private openFile() {
        globalShortcut.register('CommandOrControl+O', async () => {
            const CurrentBrowserWindow = this.mainWindow.mainWindow;
            if (!CurrentBrowserWindow) return;

            const DialogOptions: OpenDialogOptions = {
                title: 'Importing a file',
                filters: [
                    { name: 'Javascript', extensions: ['js'] },
                    {
                        name: 'SCSS',
                        extensions: ['scss']
                    }
                ],
                properties: ['openFile', 'multiSelections']
            };
            const Result = await dialog.showOpenDialog(CurrentBrowserWindow, DialogOptions);

            if (Result.canceled) return;
            Result.filePaths.forEach((filePath) => {
                readFile(filePath, 'utf-8', (err, data) => {
                    if (err) {
                        return;
                    }

                    const Extension = extname(filePath).split('.')[1].toLowerCase();
                    const Filename = basename(filePath);

                    this._sendWebContents('fileOpened', filePath, Filename, Extension, data);
                });
            });
        });
    }

    /*
     * Reformat the code
     */
    private reformatCode() {
        globalShortcut.register('CmdOrCtrl+Alt+Shift+L', () => {
            this._sendWebContents('onShortcutReformatCode');
        });
    }

    private _sendWebContents(channel: string, ...args) {
        if (this.mainWindow.mainWindow === null) return;
        this.mainWindow.mainWindow.webContents.send(channel, ...args);
    }
}
