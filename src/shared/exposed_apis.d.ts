export interface FileHelper {
    openPLSFileDialog(): void;
    onNewPLSOpened(listener: (newUrl: string) => void): void;
    removeListener(listener: (newUrl: string) => void): void;
}

export interface Eladio {
    fileHelper: FileHelper
}