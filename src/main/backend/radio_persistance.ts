import { Radio } from "#/SharedTypes";
import { app, ipcMain } from "electron";
import fs from 'fs';


const USERDATA = app.getPath('userData');
const RADIOS_PATH = `${USERDATA}/radios.json`;

if (!fs.existsSync(RADIOS_PATH)) {
    fs.writeFileSync(RADIOS_PATH, '[]', { flag: 'w+' });
}

export async function AddRadio(url: string, name: string): Promise<void> {
    const radios = await ReadRadiosFromUserData();
    radios.push({ url, name })
    await SaveRadios(radios);
}

export async function SaveRadios(radios: Radio[]): Promise<void> {
    await fs.promises.writeFile(`${USERDATA}/radios.json`, JSON.stringify(radios));
}

export async function ReadRadiosFromUserData(): Promise<Radio[]> {
    try {
        const results = (await fs.promises.readFile(`${USERDATA}/radios.json`, { flag: 'a+' })).toString('utf8');
        const parsed = JSON.parse(results);
        console.log(results, parsed);
        if (!Array.isArray(parsed)) {
            return [];
        } else {
            return parsed as Radio[];
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

ipcMain.on('loadRadios', async (event) => {
    try {
        const result = await ReadRadiosFromUserData();
        event.reply('loadedRadios', result);
    } catch (e) {
        console.error(e);
        event.reply('loadedRadios', []);
    }
})
