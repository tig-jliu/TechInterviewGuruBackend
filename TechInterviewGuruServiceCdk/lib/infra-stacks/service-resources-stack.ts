import { Stack, StackProps } from "aws-cdk-lib";
import {
  Effect,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { CommonServiceStackProps } from "./stack-retriever";

export class ServiceResourceStack extends Stack {
  readonly ecsTaskRole: Role;

  constructor(scope: Construct, id: string, props: CommonServiceStackProps) {
    super(scope, id, props);
    this.ecsTaskRole = new Role(this, "tech-interview-guru-service-role", {
      roleName: "tech-interview-guru-service-role",
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
    });
    this.ecsTaskRole.addToPolicy(
      new PolicyStatement({
        actions: [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        effect: Effect.ALLOW,
        resources: ["*"],
      })
    );
  }
}
