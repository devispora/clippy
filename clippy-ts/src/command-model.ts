import { InteractionType } from "discord-interactions";

export interface StringCommand{    
    name: string,
    type: number,
    description: string 
}
export interface IncomingInteraction {
    id: string;
    type: InteractionType;
    data: IncomingCommand
}

export interface IncomingCommand {
    id: string,
    name: string,
    options: [IncomingSubCommand],
    type: number
}

export interface IncomingSubCommand {
    name: string,
    type: number
    options?: [IncomingSubCommand] 
    value?: string
}
