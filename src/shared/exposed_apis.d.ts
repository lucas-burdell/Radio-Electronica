import { Radio } from "./SharedTypes";

export interface FileHelper {
    openPLSFileDialog(): void;
    onNewPLSOpened(listener: (newUrl: string) => void): void;
    removeListener(listener: (newUrl: string) => void): void;
}

export interface RadioService {
    GetList(): Promise<Radio[]>
}

export interface Eladio {
    fileHelper: FileHelper
    radioService: RadioService
}