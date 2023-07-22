import { StringCommand } from "./command-model.ts";

enum Top10Commands {
    time = 'time',
    construction = 'construction',
    depression = 'depression',
    czerny = 'czerny',
    help = 'help',
    doombro = 'doombro',
    uninstall = 'uninstall',
    safespace = 'safespace',
    saltyvets = 'saltyvets'
}


export function CreateHardLinkedCommand(commandName: string) : StringCommand{
    return {
        "name": commandName,
        "type": 1,
        "description": "refer to help for more info"
    }
}

export function createTopTen(map: Map<string,string>){
    const hardListedCommands = []
    for (let [key] of map) {
        // Verify the top 10 values are all still there
        if(Object.values<string>(Top10Commands).includes(key)){
            hardListedCommands.push(CreateHardLinkedCommand(key))
        }
    }
    const top10size = Object.keys(Top10Commands).length;
    if (hardListedCommands.length != top10size){
        console.log(`Expected ${top10size} but only found ${hardListedCommands.length} in top 10`);
    }else{
        console.log(`All predicted ${top10size} of the 'top 10' are found`)
    }
    return hardListedCommands
}
