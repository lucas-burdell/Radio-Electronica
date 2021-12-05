import { Eladio } from "#/exposed_apis";

export function GetApiByName<T extends keyof Eladio & string>(name: T): Eladio[T] {
    return window[name];
}