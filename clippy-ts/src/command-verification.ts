import nacl from 'tweetnacl';

export function performNaclVerification(publicKey: string, signature: string, timestamp: string, body: string){
    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, 'hex'),
        Buffer.from(publicKey, 'hex')
      );
      return isVerified
}