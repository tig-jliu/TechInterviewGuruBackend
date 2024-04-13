import { Stack, StackProps } from "aws-cdk-lib";
import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { CommonServiceStackProps } from "./stack-retriever";

export class VpcStack extends Stack {
    public readonly vpc: IVpc;
    constructor(scope: Construct, id: string, props?: CommonServiceStackProps) {
        super(scope, id, props)
        this.vpc = new Vpc(this, id, {
            maxAzs: 2,
            natGateways: 1
        });
    }
}