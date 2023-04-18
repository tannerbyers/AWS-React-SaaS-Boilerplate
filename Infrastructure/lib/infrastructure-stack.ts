import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
const path = require('path');

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket for Frontend    
    const myBucket = new s3.Bucket(this, "my-static-website-bucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,        
      websiteIndexDocument: "index.html"
   });

  // Deploy S3 Bucket as website    
   const deployment = new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
    sources: [s3Deployment.Source.asset("../../ui/dist")],
    destinationBucket: myBucket
 });

 new cdk.CfnOutput(this, "UI url", {
  value: deployment.deployedBucket.bucketWebsiteUrl,
});


  }
}
