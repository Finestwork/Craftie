import MainWindow from './MainWindow';
import { globalShortcut } from 'electron';

export default class KeyboardShortcuts {
    /**
     * Constructs a new instance of the App class.
     * @constructor
     * @param {MainWindow} mainWindow - The main window of the application.
     */
    constructor(private mainWindow: MainWindow) {
        this.runCode();
    }

    /**
     * Run code when alt+enter keys are pressed.
     * @private
     */
    private runCode() {
        globalShortcut.register('Alt+Enter', () => {
            this.mainWindow.mainWindow.webContents.send('onShortcutKeyRunCode');
        });
    }
}
