#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

new FrontendStack(app, `ediracoon-FrontendStack`);
new BackendStack(app, `ediracoon-BackendStack`);
