#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { ApiStack } from '../lib/api-stack';

const app = new cdk.App();
new ApiStack(app, 'PushEnhance-APIStack');
new FrontendStack(app, 'PushEnhance-FrontendStack');