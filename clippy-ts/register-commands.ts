import * as fs from 'fs';



export function ReadCommandsFromFile() {
    console.log('hi');
    try {
        const data = fs.readFileSync('./resources/example-command-file.json', 'utf8');
        console.log(JSON.parse(data));
    } catch (err) {
        console.error(err);
    }
}


export function RegisterCommands() {

}

ReadCommandsFromFile();