export interface Version {
    id?: number,
    title?: string,
    description?: string,
    downloadUrl?: string,
    platform?: VersionPlatform,
    createDate?: Date,
    htmlViewPage?: string,
    packageSize?: number,
    enable?: boolean,
    disabled?: boolean,
    versionNumber?: string,
    projectName?: string,
}

enum VersionPlatform {
    Android, Ios, Macos, Windows, Linux
}