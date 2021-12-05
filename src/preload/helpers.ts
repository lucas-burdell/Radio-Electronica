import { Eladio } from "#/exposed_apis";
import { contextBridge } from "electron";

export function convertClassToObject<T>(theClass: T): T {
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

export function Expose<T>(name: keyof Eladio, api: T) {
    const objectified = convertClassToObject(api);
    contextBridge.exposeInMainWorld(name, objectified);
}