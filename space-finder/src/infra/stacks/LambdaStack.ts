import { Stack, StackProps } from 'aws-cdk-lib'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
// import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}

export class LambdaStack extends Stack {

    public readonly spacesLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)


        // const helloLambda = new LambdaFunction(this, 'HelloLambda', {
        // const helloLambda = new NodejsFunction(this, 'HelloLambda', {

        const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
             entry: (join(__dirname, '..','..', 'services', 'spaces', 'handler.ts')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        })

        // helloLambda.addToRolePolicy(new PolicyStatement({
        //     effect: Effect.ALLOW,
        //     actions:[
        //         's3:ListAllMyBuckets',
        //         's3:ListBucket'
        //     ],
        //     resources: ["*"] // bad practice
        // }))

        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda)

    }
}