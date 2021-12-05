import { FileHelper } from "#/exposed_apis";
import { ipcRenderer } from "electron";

export class FileHelperImpl implements FileHelper {
    private listener: ((newUrl: string) => void) | undefined;

    constructor() {
        ipcRenderer.on('plsFileOpened', (_, ...args) => {
            if (this.listener && args[0]) {
                this.listener(args[0])
            }
        });
    }
    public removeListener(listener: (newUrl: string) => void): void {
        if (this.listener === listener) {
            this.listener = undefined;
        }
    }
    public openPLSFileDialog(): void {
        ipcRenderer.send('openPLSDialog');

    }
    public onNewPLSOpened(listener: (newUrl: string) => void): void {
        this.listener = listener;
    }
}