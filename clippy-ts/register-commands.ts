import * as fs from 'fs';

const BEARER_TOKEN = process.env.DISCORD_BEARER_TOKEN;
const DISCORD_APP_ID = process.env.DISCORD_APP_ID;

export function ReadCommandsFromFile() {
    try {
        const data = fs.readFileSync('./resources/example-command-file.json', 'utf8');
        console.log(JSON.parse(data));
    } catch (err) {
        console.error(err);
    }
}

async function dropSteveCommand(jsonData: object) {
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


export function RegisterCommands() {
    const jsonData = {
        "name": "steve",
        "type": 1,
        "description": "steve"
    }
    dropSteveCommand(jsonData)
}

ReadCommandsFromFile();
RegisterCommands();