export interface ipcRenderer {
    send: (channel: string, data?: any) => Promise<void>,
    receive: (channel: string, func: (...args: any[]) => void) => Promise<void>
}

declare global {
    interface Window {
        ipcRenderer: ipcRenderer
    }
}