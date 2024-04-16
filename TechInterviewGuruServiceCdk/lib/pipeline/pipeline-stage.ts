import { Stack, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CommonServiceStackProps, StacksRetriver } from "../infra-stacks/stack-retriever";

export class TigPipelineAppStage extends Stage {
    
    constructor(scope: Construct, stageName: string, props: StageProps) {
      super(scope, stageName, props);

      this.getAllStacks(this, props);      
    }

    private getAllStacks(scope: Construct, stageProps: StageProps): Stack[] {
        const stackProps: CommonServiceStackProps = {
          stackPrefix: "tig",
          env: stageProps.env,
          stage: stageProps.stageName || "test",
        };
        return StacksRetriver.getStacks(scope, stackProps);
    }
}