#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ClippyDeployment } from '../lib/clippy-deployment-stack';

const app = new cdk.App();
new ClippyDeployment(app, 'ClippyDeploymentStack');
