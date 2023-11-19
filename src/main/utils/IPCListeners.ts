import { BrowserWindow, ipcMain } from 'electron';
import vm from 'vm';

export const createListeners = () => {
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
};
