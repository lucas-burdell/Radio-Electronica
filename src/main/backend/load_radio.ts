import fs from "fs";
import { ipcMain, dialog } from "electron";
import axios from "axios";

async function downloadListenPlsAsync(url: string) {
    return (await axios.get(url)).data;
}

async function handleListenPlsFileAsync(data: string): Promise<string> {
    if (!data) {
        throw new Error('No data!')
    }
    const matched = data.match(/File1(.*)/);
    const urlString = matched ? matched[1] : undefined;
    if (urlString) {
        try {
            const url = new URL(urlString);
            if (url.pathname.endsWith("listen.pls")) {
                return await handleListenPlsFileAsync(await downloadListenPlsAsync(url.href))
            }
            return url.href;
        } catch (e) {
            throw new Error("File does not contain a valid stream url!")
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

ipcMain.on('toMain', async (event) => {
    const result = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: "Playlist", extensions: ['pls'] }] })
    try {
        const url = await getStreamUrlFromFileAsync(result.filePaths[0]);
        event.reply('fromMain', url);
    } catch (e) {
        event.reply('fromMain', new Error(e as string));
    }
})