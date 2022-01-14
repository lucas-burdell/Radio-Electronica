import fs from "fs";
import { ipcMain, dialog } from "electron";
import axios from "axios";
import { AddRadio, ReadRadiosFromUserData } from "./radio_persistance";

async function downloadListenPlsAsync(url: string) {
    try {
        const result = (await axios.get(url)).data;
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function handleListenPlsFileAsync(data: string): Promise<string> {
    if (!data) {
        throw new Error('No data!')
    }
    const matched = data.match(/File1=(.*)/);
    const urlString = matched ? matched[1] : undefined;
    if (urlString) {
        try {
            const url = new URL(urlString);
            if (url.pathname.endsWith("listen.pls")) {
                return await handleListenPlsFileAsync(await downloadListenPlsAsync(url.href))
            }
            return url.href;
        } catch (e) {
            throw new Error("File does not contain a valid stream url!: " + e)
        }
    } else {
        throw new Error("Unable to find a radio station within the file!")
    }
}

function getStreamUrlFromFileAsync(filePath: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', async (err, data) => {
            if (err) {
                reject(err.message);
                return;
            }
            try {
                const source = await handleListenPlsFileAsync(data);
                resolve(source);
            } catch (e) {
                reject(e);
            }
        })
    });
}

export async function openDialog(): Promise<{ url: string, name: string } | undefined> {
    const result = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: "Playlist", extensions: ['pls'] }] });
    if (!result.canceled) {
        try {
            const url = await getStreamUrlFromFileAsync(result.filePaths[0]) as string;
            return { url, name: result.filePaths[0] };
        } catch (e) {
            console.error(e);
            return undefined;
        }
    } else {
        return undefined;
    }
}

ipcMain.on('openPLSDialog', async (event) => {
    try {
        const result = await openDialog();
        if (result) {
            await AddRadio(result.url, result.name);
        }
        const radios = await ReadRadiosFromUserData();
        event.reply('loadedRadios', radios);
    } catch (e) {
        console.error(e);
        // event.reply('plsFileOpened', undefined);
    }
})
