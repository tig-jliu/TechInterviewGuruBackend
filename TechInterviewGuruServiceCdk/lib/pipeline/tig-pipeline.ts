import { Stack, StackProps } from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { STAGES, StageProps } from "./stages";
import { TigPipelineAppStage } from "./pipeline-stage";

export class TigPieline extends Stack {
  readonly servicePipeline: CodePipeline;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.servicePipeline = this.getPipeline(id);
    for (let stage of STAGES) {
      this.addStage(scope, stage);
    }
  }

  private getPipeline(id: string): CodePipeline {
    const pipeline = new CodePipeline(this, id, {
      pipelineName: "tech-interview-guru-service",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "tig-jliu/TechInterviewGuruBackend",
          "main"
        ),
        commands: [
          "cd TechInterviewGuruServiceCdk",
          "npm ci",
          "npm run build",
          "npx cdk synth",
        ],
      }),
    });
    return pipeline;
  }

  private addStage(scope: Construct, stageProps: StageProps) {
    const deploymentStageProps = {
      env: { account: stageProps.accountId, region: stageProps.region },
      stageName: stageProps.stage
    };

    this.servicePipeline.addStage(
      new TigPipelineAppStage(this, stageProps.stage, deploymentStageProps)
    );
  }
}
