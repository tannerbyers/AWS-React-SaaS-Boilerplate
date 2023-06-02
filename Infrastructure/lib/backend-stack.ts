import { Construct } from "constructs";
import lambda = require("aws-cdk-lib/aws-lambda");
import apigw = require("aws-cdk-lib/aws-apigateway");

import * as cdk from "aws-cdk-lib";
export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Lambdas defined individually, each handler is in individual file
     */

    const x12ParserLambda = new lambda.Function(this, "x12ParserLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("../backend/parser"),
      handler: "x12Parser.handler",
    });

    const x12ValidatorLambda = new lambda.Function(this, "x12ValidatorLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("../backend/validator"),
      handler: "x12Validator.handler",
    });

    /**
     * Routes defined individually on API Gateway
     */
    const restApi = new apigw.RestApi(this, "ediracoon-api", {
      deployOptions: {
        stageName: "dev",
      },
    });

    const x12ParserMethod = restApi.root
      .addResource("x12parser")
      .addMethod(
        "POST",
        new apigw.LambdaIntegration(x12ParserLambda, { proxy: true })
      );

    const x12ValidatorMethod = restApi.root
      .addResource("x12validator")
      .addMethod(
        "POST",
        new apigw.LambdaIntegration(x12ValidatorLambda, { proxy: true })
      );
  }
}
