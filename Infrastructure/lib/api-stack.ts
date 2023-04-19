import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apig from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

const path = require('path');

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const tableName = "subscriptions"
    // Create DB Table if it doesnt exists
    const table = new dynamodb.Table(this, "Base", {
      tableName: tableName,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY // this deletes db with cdk destroy command
    });

    //Import existing DynamoDB table
    // const table = dynamodb.Table.fromTableName(this, "StocksTable", "Stocks");
  
    //AWS Lambda Functions w/ Express Server
    const serverlessExpressFunction = new lambda.Function(
      this,
      "serverlessExpressFunction",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        functionName: "serverlessExpressFunction",
        //this might be able to be removed. Added in case the api calls take longer than default 3 seconds
        timeout: cdk.Duration.seconds(300),
        handler: 'index.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../API')),      
        environment: {
          DYNAMODB_TABLE: tableName,
          DYNAMODB_SECRET_ACCESS_KEY: process.env.DYNAMODB_SECRET_ACCESS_KEY || "",
          DYNAMODB_ACCESS_KEY_ID: process.env.DYNAMODB_ACCESS_KEY_ID || ""
        },
      }
    );

    //CloudWatch Logs Policy
    const cloudWatchLogsPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
      ],
    });
    cloudWatchLogsPolicy.addAllResources();

    //Grant CloudWatch access to Lambda Functions
    serverlessExpressFunction.addToRolePolicy(cloudWatchLogsPolicy);

    // 👇 create a dynamodb policy statement
    const dynamoDBPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['dynamodb:PutItem', 'dynamodb:Get*'],
    });
    dynamoDBPolicy.addAllResources();

    //Grant CloudWatch access to Lambda Functions
    serverlessExpressFunction.addToRolePolicy(dynamoDBPolicy);


    //Grant ReadWrite access to Lambda Functions
    table.grantReadWriteData(serverlessExpressFunction);

    // Lambda Integrations
    const serverlessExpressFunctionIntegration =
      new HttpLambdaIntegration('LambdaProxyIntegration', serverlessExpressFunction);

    //Http Api
    const httpApi = new apig.HttpApi(this, "httpApi", {
      apiName: "httpApi",
      createDefaultStage: true,
      corsPreflight: {
        allowMethods: [
          apig.CorsHttpMethod.GET,
          apig.CorsHttpMethod.HEAD,
          apig.CorsHttpMethod.OPTIONS,
          apig.CorsHttpMethod.POST,
        ],
        allowOrigins: ['*'],
        allowHeaders: ['*'],
        exposeHeaders: ['*']
      },
    });
    //Http Api Routes
    httpApi.addRoutes({
      integration: serverlessExpressFunctionIntegration,
      methods: [apig.HttpMethod.ANY],
      path: "/",
    });

    //Http Api proxy integration Routes
    httpApi.addRoutes({
      integration: serverlessExpressFunctionIntegration,
      methods: [apig.HttpMethod.ANY],
      path: "/{proxy+}",
    });

    // API and Service Endpoints
    const httpApiEndpoint = httpApi.apiEndpoint;

    new cdk.CfnOutput(this, "Api version endpoint: ", {
      value: httpApiEndpoint,
    });

    new cdk.CfnOutput(this, "env: ", {
      value: process.env.DYNAMODB_ACCESS_KEY_ID || "",
    });

  }
}
