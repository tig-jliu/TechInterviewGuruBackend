import { StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CommonServiceStackProps,
  StacksRetriver,
} from "./infra-stacks/stack-retriever";
import { DEV } from "./pipeline/stages";

export class DevSetup {
  constructor(
    private readonly awsAccount: string,
    private readonly app: Construct
  ) {
    this.setup();
  }

  private setup() {
    const stackProps: CommonServiceStackProps = {
      stackPrefix: process.env["USER"] || "",
      env: {
        account: this.awsAccount,
        region: DEV.region,
      },
      stage: DEV.stage,
    };
    StacksRetriver.getStacks(this.app, stackProps);
  }
}
