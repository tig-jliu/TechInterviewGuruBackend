import { DEV } from "./pipeline/stages";
import { DevSetup } from "./dev-setup";
import { TigPieline } from "./pipeline/tig-pipeline";
import { App } from "aws-cdk-lib";

const app = new App();
new TigPieline(app, "tig-service-pipeline");
if (DEV.accountId) {
  new DevSetup(DEV.accountId, app);
}
