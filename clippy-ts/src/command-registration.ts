import { StringCommand } from "./command-model.js";
import { createTopTen } from "./command-top-10.js";
import { ReadCommandsFromFile } from "./command-loader.ts";


const BEARER_TOKEN = process.env.DISCORD_BEARER_TOKEN;
const DISCORD_APP_ID = process.env.DISCORD_APP_ID;
const DEPLOY_COMMANDS = process.env.DEPLOY_COMMANDS;

async function dropSteveCommands(jsonData: object) {
    const response = await fetch(`https://discord.com/api/v10/applications/${DISCORD_APP_ID}/commands`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${BEARER_TOKEN}`
        },
        body: JSON.stringify(jsonData),
    });
    const discordReply = await response.json();
    console.log(discordReply);
}

export function RegisterCommands(top10Commands: StringCommand[]) {
    const defaultCommands = [{
        "name": "listquotes",
        "type": 1,
        "description": "Retrieve a list of all available quotes"
    },
    ]
    const jsonData = {
        "name": "clippy",
        "type": 1,
        "description": "Your friendly quote machine",
        "options": [...top10Commands, ...defaultCommands]
    }
    const jsonData2 = {
        "name": "c",
        "type": 1,
        "description": "Your friendly quote machine",
        "options": [{
            "name": "quote",
            "required": true,
            "type": 3,
            "description": "Use from commandlist"
        }]
    }

    if (DEPLOY_COMMANDS == "indeed") {
        dropSteveCommands(jsonData2);
    }

}

const loadedInCommands = ReadCommandsFromFile();
const top10Commands = createTopTen(loadedInCommands);
RegisterCommands(top10Commands);
