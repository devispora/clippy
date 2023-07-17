import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Charset, NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';

import { Construct } from 'constructs';

export class ClippyDeployment extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'Clippy', {
      functionName: 'Clippy',
      runtime: Runtime.NODEJS_18_X,
      entry: '../clippy-ts/app.ts',
      handler: 'lambdaHandler',
      environment: {
        PUBLIC_DISCORD_KEY: ''
      }
      // bundling: {
      //   charset: Charset.UTF8,
      //   format: OutputFormat.ESM,
      //   mainFields: ["module", "main"],
      //   target: "node16.5",
      //   esbuildArgs: {
      //     "--conditions": "module",
      //   }
      // }
    });
  }
}


