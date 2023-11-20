import MainWindow from './MainWindow';
import { globalShortcut } from 'electron';

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
    }
    public destroy() {
        globalShortcut.unregisterAll();
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

    /**
     * Switch tab when left/right arrow + alt key is pressed.
     * @private
     */
    private switchTab() {
        globalShortcut.register('Alt+Left', () => {
            this.mainWindow.mainWindow.webContents.send('onShortcutSwitchTabLeft');
        });
        globalShortcut.register('Alt+Right', () => {
            this.mainWindow.mainWindow.webContents.send('onShortcutSwitchTabRight');
        });
    }

    /**
     * Sends a message to the renderer that it needs to save the file.
     * @private
     */
    private onClickSaveFile() {
        globalShortcut.register('CmdOrCtrl+S', () => {
            this.mainWindow.mainWindow.webContents.send('onShortcutSaveFile');
        });
    }

    /**
     * Opens up dropdown when ctrl + t is pressed
     * @private
     */
    private openTabDropdown() {
        globalShortcut.register('CmdOrCtrl+t', () => {
            this.mainWindow.mainWindow.webContents.send('onShortcutOpenTabDropdown');
        });
    }
}
