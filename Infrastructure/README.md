# Frontend Infrastructure Project

This project sets up an infrastructure for a frontend template in AWS using AWS CDK (Cloud Development Kit). The following AWS services are used:

- Amazon S3: A simple storage service used to host the static website files.
- AWS CloudFront: A global content delivery network that accelerates the delivery of the static website files.
- AWS Cognito: A user authentication and management service.

## Usage

First you will need to update the values in cdk.json to your aws account settings and preferences. 

Sure, here's an example entry you could add to your readme:

## Customizing CDK deployment

- `account`: (**required**)The AWS account ID where the resources should be deployed. Default is the account where the CDK is executed.
- `region`:  (**required**)The AWS region where the resources should be deployed. Default is the region where the CDK is executed.
- `websiteBucketName`: The name of the S3 bucket that will host the static website content. Default is `my-static-website-bucket`.
- `userPoolName`: The name of the Cognito user pool that will be created. Default is `saas-userpool`.

To customize these options, update the corresponding values in the `cdk.json` file. For example, to deploy the resources to a different account and region, update the `account` and `region` values accordingly:

```json
{
  "app": "npx ts-node ./bin/app.ts",
  "context": {
    "account": "123456789012",
    "region": "us-west-2",
    ... rest of existing config
  }
}
```

Once the `cdk.json` file has been updated, run `cdk deploy` to deploy the resources to the new AWS account and region with the customized options.