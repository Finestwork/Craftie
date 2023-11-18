import { createApp } from './utils/App';
import { createWindow } from './utils/MainWindow';
import { createListeners } from './utils/IPCListeners';

createApp(createWindow);
createListeners();
