import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_cognito as cognito } from "aws-cdk-lib";

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket for Frontend
    const websiteBucket = new s3.Bucket(this, "my-static-website-bucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    // Deploy S3 Bucket as website
    const deployment = new s3Deployment.BucketDeployment(
      this,
      "deployStaticWebsite",
      {
        sources: [s3Deployment.Source.asset("../Frontend/dist")],
        destinationBucket: websiteBucket,
      }
    );

    new cdk.CfnOutput(this, "UI url", {
      value: deployment.deployedBucket.bucketWebsiteUrl,
    });

    // Create OAI
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "MyOriginAccessIdentity",
      /* all optional props */ {}
    );

    // Connect cloudfront with OAI
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "MyDistribution",
      {
        errorConfigurations: [
          // Added to support SPA routing
          {
            errorCode: 403,
            responseCode: 200,
            errorCachingMinTtl: 0,
            responsePagePath: "/index.html",
          },
          {
            errorCode: 404,
            responseCode: 200,
            errorCachingMinTtl: 0,
            responsePagePath: "/index.html",
          },
        ],
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
              originAccessIdentity: originAccessIdentity,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    // Set Up cognito
    new cognito.UserPool(this, 'saasuserpool', {
      userPoolName: 'saas-userpool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
    
    });
    
  }
}
