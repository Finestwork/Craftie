import { BrowserWindow, ipcMain } from 'electron';
import vm from 'vm';

export default class IPCHandler {
    /**
     * Constructs a new instance of the App class.
     * @constructor
     */
    constructor() {
        this.runCode();
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
}
