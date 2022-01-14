import { RadioService } from "#/exposed_apis";
import { Radio } from "#/SharedTypes";
import { ipcRenderer } from "electron";

export class RadioServiceImpl implements RadioService {

    private listener: ((radios: Radio[]) => void) | undefined;
    private radioPromises: ((radios: Radio[]) => void)[] = [];
    constructor() {
        ipcRenderer.on('loadedRadios', (_, ...args) => {
            if (this.listener && args[0]) {
                this.listener(args[0])
            }
            console.log('got radios!', args[0]);
            this.radioPromises.forEach((x) => x(args[0]));
            this.radioPromises = [];
        });
    }
    GetList(): Promise<Radio[]> {
        const promise = new Promise<Radio[]>((resolve) => {
            this.radioPromises.push((radios) => resolve(radios));
            ipcRenderer.send('loadRadios');
        });
        return promise;
    }

    public removeListener(listener: (radios: Radio[]) => void): void {
        if (this.listener === listener) {
            this.listener = undefined;
        }
    }

    public addListener(listener: (radios: Radio[]) => void): void {
        this.listener = listener;
    }
}