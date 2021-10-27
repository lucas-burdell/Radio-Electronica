import { Eladio, FileHelper } from "#/exposed_apis";
import { contextBridge, ipcRenderer } from "electron";

function convertClassToObject<T>(theClass: T): T {
  const originalClass = theClass;
  const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass)) as Array<keyof T>;
  let obj: Partial<T> = {};
  keys.forEach((key) => {
    if (key !== 'constructor') {
      const original = originalClass[key];
      if (typeof original === 'function') {
        obj[key] = original.bind(originalClass);
      } else {
        obj[key] = original;
      }
    }
  });
  return obj as T;
}

function expose<T>(name: keyof Eladio, api: T) {
  const objectified = convertClassToObject(api);
  contextBridge.exposeInMainWorld(name, objectified);
}

class FileHelperImpl implements FileHelper {
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

expose<FileHelper>('fileHelper', new FileHelperImpl());