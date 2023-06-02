"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendStack = void 0;
const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3Deployment = require("aws-cdk-lib/aws-s3-deployment");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({});
class FrontendStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const websiteBucketName = "saas-template-bucket";
        const userPoolName = "saas-template-user-pool";
        const frontendDistPath = "../Frontend/dist";
        // Create S3 Bucket for Frontend
        const websiteBucket = new s3.Bucket(this, websiteBucketName, {
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            websiteIndexDocument: "index.html",
            // This most likely should be removed in production env. This allows for easy deletion of s3 for template testing
            autoDeleteObjects: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
            accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
        });
        // Deploy S3 Bucket as website
        const deployment = new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
            sources: [s3Deployment.Source.asset(frontendDistPath)],
            destinationBucket: websiteBucket,
        });
        new cdk.CfnOutput(this, "UI url", {
            value: deployment.deployedBucket.bucketWebsiteUrl,
        });
        // Create OAI
        const originAccessIdentity = new aws_cdk_lib_1.aws_cloudfront.OriginAccessIdentity(this, "MyOriginAccessIdentity", 
        /* all optional props */ {});
        // Connect cloudfront with OAI
        const distribution = new aws_cdk_lib_1.aws_cloudfront.CloudFrontWebDistribution(this, "MyDistribution", {
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
        });
        // Set Up cognito
        new aws_cdk_lib_2.aws_cognito.UserPool(this, userPoolName + "id", {
            userPoolName: userPoolName,
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
            },
        });
    }
}
exports.FrontendStack = FrontendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udGVuZC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDLDhEQUE4RDtBQUM5RCw2Q0FBMkQ7QUFDM0QsNkNBQXFEO0FBQ3JELG1DQUFnQztBQUNoQyxJQUFBLGVBQU0sRUFBQyxFQUFFLENBQUMsQ0FBQztBQUNYLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzFDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxpQkFBaUIsR0FBRyxzQkFBc0IsQ0FBQztRQUNqRCxNQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztRQUMvQyxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO1FBRTVDLGdDQUFnQztRQUNoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQzNELGdCQUFnQixFQUFFLElBQUk7WUFDdEIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLGlIQUFpSDtZQUNqSCxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO1lBQ2xELGFBQWEsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMseUJBQXlCO1NBQ2hFLENBQUMsQ0FBQztRQUVILDhCQUE4QjtRQUM5QixNQUFNLFVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsQ0FDbEQsSUFBSSxFQUNKLHFCQUFxQixFQUNyQjtZQUNFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdEQsaUJBQWlCLEVBQUUsYUFBYTtTQUNqQyxDQUNGLENBQUM7UUFFRixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNoQyxLQUFLLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0I7U0FDbEQsQ0FBQyxDQUFDO1FBRUgsYUFBYTtRQUNiLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSw0QkFBVSxDQUFDLG9CQUFvQixDQUM5RCxJQUFJLEVBQ0osd0JBQXdCO1FBQ3hCLHdCQUF3QixDQUFDLEVBQUUsQ0FDNUIsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFVLENBQUMseUJBQXlCLENBQzNELElBQUksRUFDSixnQkFBZ0IsRUFDaEI7WUFDRSxtQkFBbUIsRUFBRTtnQkFDbkIsK0JBQStCO2dCQUMvQjtvQkFDRSxTQUFTLEVBQUUsR0FBRztvQkFDZCxZQUFZLEVBQUUsR0FBRztvQkFDakIsa0JBQWtCLEVBQUUsQ0FBQztvQkFDckIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDaEM7Z0JBQ0Q7b0JBQ0UsU0FBUyxFQUFFLEdBQUc7b0JBQ2QsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLGtCQUFrQixFQUFFLENBQUM7b0JBQ3JCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2hDO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2I7b0JBQ0UsY0FBYyxFQUFFO3dCQUNkLGNBQWMsRUFBRSxhQUFhO3dCQUM3QixvQkFBb0IsRUFBRSxvQkFBb0I7cUJBQzNDO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQ3pDO2FBQ0Y7U0FDRixDQUNGLENBQUM7UUFFRixpQkFBaUI7UUFDakIsSUFBSSx5QkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxHQUFHLElBQUksRUFBRTtZQUM5QyxZQUFZLEVBQUUsWUFBWTtZQUMxQixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakZELHNDQWlGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0ICogYXMgczMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zM1wiO1xyXG5pbXBvcnQgKiBhcyBzM0RlcGxveW1lbnQgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zMy1kZXBsb3ltZW50XCI7XHJcbmltcG9ydCB7IGF3c19jbG91ZGZyb250IGFzIGNsb3VkZnJvbnQgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgYXdzX2NvZ25pdG8gYXMgY29nbml0byB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XHJcbmNvbmZpZyh7fSk7XHJcbmV4cG9ydCBjbGFzcyBGcm9udGVuZFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCB3ZWJzaXRlQnVja2V0TmFtZSA9IFwic2Fhcy10ZW1wbGF0ZS1idWNrZXRcIjtcclxuICAgIGNvbnN0IHVzZXJQb29sTmFtZSA9IFwic2Fhcy10ZW1wbGF0ZS11c2VyLXBvb2xcIjtcclxuICAgIGNvbnN0IGZyb250ZW5kRGlzdFBhdGggPSBcIi4uL0Zyb250ZW5kL2Rpc3RcIjtcclxuXHJcbiAgICAvLyBDcmVhdGUgUzMgQnVja2V0IGZvciBGcm9udGVuZFxyXG4gICAgY29uc3Qgd2Vic2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgd2Vic2l0ZUJ1Y2tldE5hbWUsIHtcclxuICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZSxcclxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcclxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxyXG4gICAgICAvLyBUaGlzIG1vc3QgbGlrZWx5IHNob3VsZCBiZSByZW1vdmVkIGluIHByb2R1Y3Rpb24gZW52LiBUaGlzIGFsbG93cyBmb3IgZWFzeSBkZWxldGlvbiBvZiBzMyBmb3IgdGVtcGxhdGUgdGVzdGluZ1xyXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcclxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FDTFMsXHJcbiAgICAgIGFjY2Vzc0NvbnRyb2w6IHMzLkJ1Y2tldEFjY2Vzc0NvbnRyb2wuQlVDS0VUX09XTkVSX0ZVTExfQ09OVFJPTCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERlcGxveSBTMyBCdWNrZXQgYXMgd2Vic2l0ZVxyXG4gICAgY29uc3QgZGVwbG95bWVudCA9IG5ldyBzM0RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudChcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJkZXBsb3lTdGF0aWNXZWJzaXRlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBzb3VyY2VzOiBbczNEZXBsb3ltZW50LlNvdXJjZS5hc3NldChmcm9udGVuZERpc3RQYXRoKV0sXHJcbiAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHdlYnNpdGVCdWNrZXQsXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJVSSB1cmxcIiwge1xyXG4gICAgICB2YWx1ZTogZGVwbG95bWVudC5kZXBsb3llZEJ1Y2tldC5idWNrZXRXZWJzaXRlVXJsLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIE9BSVxyXG4gICAgY29uc3Qgb3JpZ2luQWNjZXNzSWRlbnRpdHkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eShcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJNeU9yaWdpbkFjY2Vzc0lkZW50aXR5XCIsXHJcbiAgICAgIC8qIGFsbCBvcHRpb25hbCBwcm9wcyAqLyB7fVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBDb25uZWN0IGNsb3VkZnJvbnQgd2l0aCBPQUlcclxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBjbG91ZGZyb250LkNsb3VkRnJvbnRXZWJEaXN0cmlidXRpb24oXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIFwiTXlEaXN0cmlidXRpb25cIixcclxuICAgICAge1xyXG4gICAgICAgIGVycm9yQ29uZmlndXJhdGlvbnM6IFtcclxuICAgICAgICAgIC8vIEFkZGVkIHRvIHN1cHBvcnQgU1BBIHJvdXRpbmdcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZXJyb3JDb2RlOiA0MDMsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxyXG4gICAgICAgICAgICBlcnJvckNhY2hpbmdNaW5UdGw6IDAsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGVycm9yQ29kZTogNDA0LFxyXG4gICAgICAgICAgICByZXNwb25zZUNvZGU6IDIwMCxcclxuICAgICAgICAgICAgZXJyb3JDYWNoaW5nTWluVHRsOiAwLFxyXG4gICAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgb3JpZ2luQ29uZmlnczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzM09yaWdpblNvdXJjZToge1xyXG4gICAgICAgICAgICAgIHMzQnVja2V0U291cmNlOiB3ZWJzaXRlQnVja2V0LFxyXG4gICAgICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OiBvcmlnaW5BY2Nlc3NJZGVudGl0eSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmVoYXZpb3JzOiBbeyBpc0RlZmF1bHRCZWhhdmlvcjogdHJ1ZSB9XSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTZXQgVXAgY29nbml0b1xyXG4gICAgbmV3IGNvZ25pdG8uVXNlclBvb2wodGhpcywgdXNlclBvb2xOYW1lICsgXCJpZFwiLCB7XHJcbiAgICAgIHVzZXJQb29sTmFtZTogdXNlclBvb2xOYW1lLFxyXG4gICAgICBzZWxmU2lnblVwRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgc2lnbkluQWxpYXNlczoge1xyXG4gICAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==