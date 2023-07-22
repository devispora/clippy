import { InteractionType } from "discord-interactions";
import { ReadCommandsFromFile } from "./command-loader.ts";
import { IncomingInteraction } from "./command-model.ts";

const allCommandsRead = ReadCommandsFromFile();
const allCommandNames = [ ...allCommandsRead.keys() ];

function grabDesiredValue(commandValue: string){
    const attemptedResult = allCommandsRead.get(commandValue);
    if(attemptedResult){
        return attemptedResult
    }else{
        return 'I do not recognise this one'
    }    
}

export function processCommand(incomingCommand: IncomingInteraction){

    if (incomingCommand.type == InteractionType.APPLICATION_COMMAND) {
        const res = incomingCommand.data
        console.log(`incoming command: ${res.name}`)
        const subcommand = res.options[0].name;
        console.log(`incoming subcommand: ${subcommand}`)
        if(subcommand == 'quote'){
            const commandValue = res.options[0].value;
            if(commandValue){
                return grabDesiredValue(commandValue);
            }            
        } else if(subcommand == 'listquotes'){
            return allCommandNames
        }
        else{
            return grabDesiredValue(subcommand);
        }        
    }
}