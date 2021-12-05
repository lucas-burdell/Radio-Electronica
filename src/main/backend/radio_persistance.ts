import { Radio } from "#/SharedTypes";
import { app, ipcMain } from "electron";
import fs from 'fs';

export async function ReadRadiosFromUserData(): Promise<Radio[]> {
    const path = app.getPath('userData');
    const results = (await fs.promises.readFile(`${path}/radios.json`)).toString();
    return JSON.parse(results) as Radio[];
}

ipcMain.on('loadRadios', async (event) => {
    try {
        const result = await ReadRadiosFromUserData();
        event.reply('loadedRadios', result);
    } catch (e) {
        console.error(e);
        event.reply('loadedRadios', undefined);
    }
})
