import { verify } from "discord-verify/node";
import * as crypto from "crypto";


export async function performDVerification(publicKey: string, signature: string, timestamp: string, body: string) {
    const isValid = await verify(
		body,
		signature,
		timestamp,
		publicKey,
		crypto.webcrypto.subtle
	);
    return isValid;

}