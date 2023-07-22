import jsonFile from "../resources/emerald-command-file.json" assert { type: "json" };; 

export interface CommandFromFileList {
    commands: Map<string, string>
}

export function ReadCommandsFromFile(): Map<string, string> {
    try {
        const map = new Map<string, string>(Object.entries(jsonFile.commands));
        return map;
    } catch (err) {
        console.error(err);
    }
    return new Map<string, string>();
}
