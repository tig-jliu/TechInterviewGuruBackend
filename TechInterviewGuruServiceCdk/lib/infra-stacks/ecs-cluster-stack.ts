import { Stack, StackProps } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { Cluster, ICluster } from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";
import { CommonServiceStackProps } from "./stack-retriever";

export interface EcsClusterStackProps extends CommonServiceStackProps {
  readonly vpc: IVpc;
}

export class EcsClusterStack extends Stack {
  readonly cluster: ICluster;
  constructor(scope: Construct, id: string, props: EcsClusterStackProps) {
    super(scope, id, props);
    this.cluster = new Cluster(this, id, { vpc: props.vpc });
  }
}
