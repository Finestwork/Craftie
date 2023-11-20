import { BrowserWindow, ipcMain, dialog } from 'electron';
import { basename } from 'path';
import vm from 'vm';
import { writeFile } from 'fs/promises';
import { getSaveDialogOptions } from '@helpers/FileStoreHelper';

export default class IPCHandler {
    /**
     * Constructs a new instance of the App class.
     * @constructor
     */
    constructor() {
        this.runCode();
        this.saveFile();
    }

    /**
     * Runs the provided code in a virtual machine context
     * and sends the log messages to the renderer process.
     * @private
     */
    private runCode() {
        ipcMain.on('runCode', async (event, code) => {
            const browserWindow = BrowserWindow.fromWebContents(event.sender);
            if (!browserWindow) return;

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

            // Send all log messages to the browser window
            browserWindow.webContents.send('displayCodeResult', context.logMessages);
        });
    }

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
                basename(filePath)
            );
        });
    }
}