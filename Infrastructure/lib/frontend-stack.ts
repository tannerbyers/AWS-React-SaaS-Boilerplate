import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { config } from "dotenv";
config();

const app = new cdk.App();
export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucketName =
      process.env.WEBSITE_BUCKET_NAME || "saas-template-bucket";
    const userPoolName =
      process.env.USER_POOL_NAME || "saas-template-user-pool";
    const frontendDistPath =
      process.env.FRONTEND_DIST_PATH || "../Frontend/dist";

    // Create S3 Bucket for Frontend
    const websiteBucket = new s3.Bucket(this, websiteBucketName, {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      // This most likely should be removed in production env. This allows for easy deletion of s3 for template testing
      autoDeleteObjects: true
    
    });

    // Deploy S3 Bucket as website
    const deployment = new s3Deployment.BucketDeployment(
      this,
      "deployStaticWebsite",
      {
        sources: [s3Deployment.Source.asset(frontendDistPath)],
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
    new cognito.UserPool(this, userPoolName + "id", {
      userPoolName: userPoolName,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
    });
  }
}
