import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */


interface IncomingInteraction {
    id: string;
    type: InteractionType;
    name: string;
}

const publicKey = process.env.PUBLIC_DISCORD_KEY;

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
    console.log(event)
    if (event.body) {
        const signature = event.headers['x-signature-ed25519']
        const timestamp = event.headers['x-signature-timestamp']
        if (signature && timestamp && publicKey) {
            const isValidRequest = verifyKey(event.body, signature, timestamp, publicKey);
            if (isValidRequest) {

                try {
                    let incomingCommand: IncomingInteraction = JSON.parse(event.body);
                    if (incomingCommand.type == InteractionType.PING) {
                        console.log('good ping flow');
                        return {
                            statusCode: 200,
                            body: JSON.stringify({ "type": InteractionResponseType.PONG }),
                        }
                    }

                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                content: 'Hi there yoss',
                            }
                        }),
                    };
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log('bad ping flow');
                return {
                    statusCode: 401,
                    body: JSON.stringify('invalid request signature'),
                };
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };

    }

};
