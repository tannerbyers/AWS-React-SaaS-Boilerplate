"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendStack = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const cdk = require("aws-cdk-lib");
class BackendStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        /**
         * Lambdas defined individually, each handler is in individual file
         */
        const parserLambda = new lambda.Function(this, 'addLambdaHandler', {
            runtime: lambda.Runtime.NODEJS_16_X,
            code: lambda.Code.fromAsset('../backend'),
            handler: 'parser.handler',
        });
        // const subtractLambda = new lambda.Function(this, 'subtractLambdaHandler', {
        //   runtime: lambda.Runtime.NODEJS_12_X,
        //   code: lambda.Code.fromAsset('BackendStacklambda-fns/single-purpose-function'),
        //   handler: 'subtract.handler',                
        // });
        // const multiplyLambda = new lambda.Function(this, 'multiplyLambdaHandler', {
        //   runtime: lambda.Runtime.NODEJS_12_X,
        //   code: lambda.Code.fromAsset('lambda-fns/single-purpose-function'),
        //   handler: 'multiply.handler',                
        // });
        /**
         * Routes defined individually on API Gateway
         */
        let gateway = new apigw.LambdaRestApi(this, 'SinglePurposeFunctionAPI', {
            handler: parserLambda,
            proxy: false
        });
        gateway.root.resourceForPath('parser').addMethod('PUT', new apigw.LambdaIntegration(parserLambda));
    }
}
exports.BackendStack = BackendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmQtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWtEO0FBQ2xELG9EQUFxRDtBQUNyRCxtQ0FBbUM7QUFDbkMsTUFBYSxZQUFhLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU1Qjs7V0FFRztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDakUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3pDLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsOEVBQThFO1FBQzlFLHlDQUF5QztRQUN6QyxtRkFBbUY7UUFDbkYsaURBQWlEO1FBQ2pELE1BQU07UUFFTiw4RUFBOEU7UUFDOUUseUNBQXlDO1FBQ3pDLHVFQUF1RTtRQUN2RSxpREFBaUQ7UUFDakQsTUFBTTtRQUdOOztXQUVHO1FBRUgsSUFBSSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUN0RSxPQUFPLEVBQUUsWUFBWTtZQUNyQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0NBQ0Y7QUF0Q0Qsb0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuaW1wb3J0IGxhbWJkYSA9IHJlcXVpcmUoJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnKTtcclxuaW1wb3J0IGFwaWd3ID0gcmVxdWlyZSgnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknKTtcclxuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5leHBvcnQgY2xhc3MgQmFja2VuZFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExhbWJkYXMgZGVmaW5lZCBpbmRpdmlkdWFsbHksIGVhY2ggaGFuZGxlciBpcyBpbiBpbmRpdmlkdWFsIGZpbGVcclxuICAgICAqL1xyXG5cclxuICAgIGNvbnN0IHBhcnNlckxhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ2FkZExhbWJkYUhhbmRsZXInLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJy4uL2JhY2tlbmQnKSxcclxuICAgICAgaGFuZGxlcjogJ3BhcnNlci5oYW5kbGVyJywgICAgICAgICAgICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjb25zdCBzdWJ0cmFjdExhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ3N1YnRyYWN0TGFtYmRhSGFuZGxlcicsIHtcclxuICAgIC8vICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXHJcbiAgICAvLyAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnQmFja2VuZFN0YWNrbGFtYmRhLWZucy9zaW5nbGUtcHVycG9zZS1mdW5jdGlvbicpLFxyXG4gICAgLy8gICBoYW5kbGVyOiAnc3VidHJhY3QuaGFuZGxlcicsICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gY29uc3QgbXVsdGlwbHlMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdtdWx0aXBseUxhbWJkYUhhbmRsZXInLCB7XHJcbiAgICAvLyAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxyXG4gICAgLy8gICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYS1mbnMvc2luZ2xlLXB1cnBvc2UtZnVuY3Rpb24nKSxcclxuICAgIC8vICAgaGFuZGxlcjogJ211bHRpcGx5LmhhbmRsZXInLCAgICAgICAgICAgICAgICBcclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdXRlcyBkZWZpbmVkIGluZGl2aWR1YWxseSBvbiBBUEkgR2F0ZXdheVxyXG4gICAgICovXHJcbiAgICBcclxuICAgIGxldCBnYXRld2F5ID0gbmV3IGFwaWd3LkxhbWJkYVJlc3RBcGkodGhpcywgJ1NpbmdsZVB1cnBvc2VGdW5jdGlvbkFQSScsIHtcclxuICAgICAgaGFuZGxlcjogcGFyc2VyTGFtYmRhLFxyXG4gICAgICBwcm94eTogZmFsc2VcclxuICAgIH0pO1xyXG5cclxuICAgIGdhdGV3YXkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ3BhcnNlcicpLmFkZE1ldGhvZCgnUFVUJywgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKHBhcnNlckxhbWJkYSkpO1xyXG4gIH1cclxufVxyXG4iXX0=