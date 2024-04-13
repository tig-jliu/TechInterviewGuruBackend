import { Stack, StackProps } from "aws-cdk-lib";
import { StageProps } from "../pipeline/stages";
import { VpcStack } from "./vpc-stack";
import { Construct } from "constructs";
import { ServiceResourceStack } from "./service-resources-stack";
import { EcsClusterStack } from "./ecs-cluster-stack";
import { EcsServiceStack } from "./ecs-service-stack";

export interface CommonServiceStackProps extends StackProps {
  stackPrefix: string;
  stage: string;
}

export class StacksRetriver {
  /**
   * Get all the stacks to be deployed.
   */
  public static getStacks(
    scope: Construct,
    stackProps: CommonServiceStackProps
  ) {
    let stacksToBeDeployed: Stack[] = [];
    const vpcStack = new VpcStack(
      scope,
      `${stackProps.stackPrefix}-vpc-${stackProps.stage}`,
      stackProps
    );
    const serviceResourceStack = new ServiceResourceStack(
      scope,
      `${stackProps.stackPrefix}-ServiceResources-${stackProps.stage}`,
      stackProps
    );
    const ecsClusterStack = new EcsClusterStack(
      scope,
      `${stackProps.stackPrefix}-EcsCluster-${stackProps.stage}`,
      {
        ...stackProps,
        vpc: vpcStack.vpc,
      }
    );
    const ecsServiceStack = new EcsServiceStack(
      scope,
      `${stackProps.stackPrefix}-EcsService-${stackProps.stage}`,
      {
        ...stackProps,
        cluster: ecsClusterStack.cluster,
        ecsTaskRole: serviceResourceStack.ecsTaskRole,
      }
    );
    ecsClusterStack.addDependency(vpcStack);
    ecsServiceStack.addDependency(ecsClusterStack);
    ecsServiceStack.addDependency(serviceResourceStack);

    stacksToBeDeployed.push(vpcStack, 
      serviceResourceStack, ecsClusterStack, ecsServiceStack);
    return stacksToBeDeployed;
  }
}
