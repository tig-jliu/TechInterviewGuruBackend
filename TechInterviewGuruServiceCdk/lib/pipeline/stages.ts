export enum AwsAccount {
  PROD = "211125456749",
}

export enum AwsRegion {
  US_EAST_1 = "us-east-1",
  US_WEST_2 = "us-west-2",
}

export interface StageProps {
  stage: string;
  accountId: string;
  region: AwsRegion;
  isProd: boolean;
}

export enum Stage {
  DEV = "development",
  BETA = "beta",
  PROD = "prod",
}

export const STAGES: Array<StageProps> = [
  {
    stage: Stage.PROD,
    accountId: AwsAccount.PROD,
    region: AwsRegion.US_WEST_2,
    isProd: true,
  },
];

export const DEV: StageProps = {
  stage: Stage.DEV,
  accountId: process.env["DEV_AWS_ACCOUNT_ID"]
    ? process.env["DEV_AWS_ACCOUNT_ID"]
    : "",
  region: AwsRegion.US_WEST_2,
  isProd: false,
};
