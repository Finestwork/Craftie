import { BrowserWindow, ipcMain, dialog } from 'electron';
import type { IpcMainEvent } from 'electron';
import { basename } from 'path';
import vm from 'vm';
import { writeFile } from 'fs/promises';
import sass from 'sass';
import { getSaveDialogOptions } from '@helpers/FileStoreHelper';

export default class IPCHandler {
    /**
     * Constructs a new instance of the App class.
     * @constructor
     */
    constructor() {
        this.runCode();
        this.saveFile();
        this.overwriteFile();
        this.saveFileBeforeClosing();
        this.showConfirmDialog();
    }

    /**
     * Runs the provided code in a virtual machine context
     * and sends the log messages to the renderer process.
     * @private
     */
    private runCode() {
        const runJavaScript = (browserWindow: BrowserWindow, code) => {
            const context = vm.createContext();
            context.console = {
                log: (message) => {
                    if (!context.logMessages) {
                        context.logMessages = [];
                    }
                    context.logMessages.push(message);
                }
            };
            vm.runInContext(code, context);

            // Send code the renderer process
            browserWindow.webContents.send('displayCodeResult', context.logMessages);
        };

        const runSass = (browserWindow: BrowserWindow, code) => {
            const Result = sass.compileString(code);
            // Send code the renderer process
            browserWindow.webContents.send('displayCodeResult', Result.css);
        };
        ipcMain.on('runCode', async (event, type: string, code: string) => {
            const browserWindow = BrowserWindow.fromWebContents(event.sender);
            if (!browserWindow) return;

            switch (type) {
                case 'js':
                    runJavaScript(browserWindow, code);
                    break;
                case 'sass':
                case 'scss':
                    runSass(browserWindow, code);
                    break;
            }
        });
    }

    /**
     * Saves the file
     * @private
     */
    private saveFile() {
        ipcMain.on('saveFile', async (event, type, code) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowserWindow) return;

            const DialogOptions = getSaveDialogOptions(type);

            const result = await dialog.showSaveDialog(CurrentBrowserWindow, DialogOptions);
            if (result.canceled) return;

            const { filePath } = result;

            if (!filePath) return;
            await writeFile(filePath, code, { encoding: 'utf-8' });

            // Tell the renderer to update the filePath and filename from FileStore
            CurrentBrowserWindow.webContents.send(
                'fileSavedSuccessfully',
                filePath,
                basename(filePath),
                code
            );
        });
    }

    /**
     * When file is already saved in the computer and user pressed 'ctr + s'
     * It will then overwrite the file's content
     *  @private
     */
    private overwriteFile() {
        ipcMain.on('overwriteFile', async (e, filePath: string, code: string) => {
            await this._overwriteFile(e, filePath, code);
        });
    }

    private saveFileBeforeClosing() {
        ipcMain.on('saveFileBeforeClosing', async (e, filePath: string, code: string) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(e.sender);
            if (!CurrentBrowserWindow) return;
            await this._overwriteFile(e, filePath, code);
            CurrentBrowserWindow.webContents.send('closeFile');
        });
    }

    private showConfirmDialog() {
        ipcMain.on('showConfirmDialog', async (e) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(e.sender);
            if (!CurrentBrowserWindow) return;
            const Result = dialog.showMessageBoxSync(CurrentBrowserWindow, {
                type: 'warning',
                buttons: ['Yes', 'No', 'Cancel'],
                defaultId: 2,
                title: 'Confirm',
                message: 'Do you want to save the changes you made to this document?',
                detail: "Your changes will be lost if you don't save them."
            });

            if (Result === 0) {
                CurrentBrowserWindow.webContents.send('saveFileBeforeClose');
                return;
            }

            if (Result === 1) {
                CurrentBrowserWindow.webContents.send('closeFile');
            }
        });
    }

    /**
     * Helpers
     */

    private async _overwriteFile(e: IpcMainEvent, filePath: string, code: string) {
        const CurrentBrowserWindow = BrowserWindow.fromWebContents(e.sender);
        if (!CurrentBrowserWindow) return;

        await writeFile(filePath, code, { encoding: 'utf-8' });

        // Tell the renderer to update previous content from FileStore
        CurrentBrowserWindow.webContents.send('updateFilePreviousContent', code);
    }
}
