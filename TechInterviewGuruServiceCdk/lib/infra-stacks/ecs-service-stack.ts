import { Duration, Stack } from "aws-cdk-lib";
import {
  ContainerImage,
  ICluster,
} from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Role } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { CommonServiceStackProps } from "./stack-retriever";

export interface EcsServiceStackProps extends CommonServiceStackProps {
  readonly cluster: ICluster;
  readonly ecsTaskRole: Role;
}

export class EcsServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: EcsServiceStackProps) {
    super(scope, id, props);

    const ecsEc2Service = new ApplicationLoadBalancedFargateService(
      this,
      "tech-interview-guru-service",
      {
        cluster: props.cluster,
        desiredCount: 2,
        cpu: 2048,
        memoryLimitMiB: 4096,
        taskImageOptions: {
          image: ContainerImage.fromAsset("../TechInterviewGuruService"),
          containerPort: 8080,
        }
      }
    );

    ecsEc2Service.targetGroup.configureHealthCheck({
      port: "traffic-port",
      path: "/health",
      interval: Duration.seconds(5),
      timeout: Duration.seconds(4),
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 2,
      healthyHttpCodes: "200",
    });

    const springbootAutoScaling = ecsEc2Service.service.autoScaleTaskCount({
      maxCapacity: 4,
      minCapacity: 2,
    });

    springbootAutoScaling.scaleOnCpuUtilization("cpu-autoscaling", {
      targetUtilizationPercent: 45,
      policyName: "cpu-autoscaling-policy",
      scaleInCooldown: Duration.seconds(30),
      scaleOutCooldown: Duration.seconds(30),
    });
  }
}
