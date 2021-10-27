import { Eladio } from "#/exposed_apis";

interface Radio {
    name: string;
    url: string;
}

export const Radios = {
    List(): Radio[] {
        return [];
    }
}

export function GetApiByName<T extends keyof Eladio & string>(name: T): Eladio[T] {
    return window[name];
}