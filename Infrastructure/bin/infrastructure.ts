#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';


const app = new cdk.App();
const envName = app.node.tryGetContext("envName");

new FrontendStack(app, `${envName}-FrontendStack`);
