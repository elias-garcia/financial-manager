import "reflect-metadata";
import { container } from "tsyringe";

import { App } from "./app";

const app: App = container.resolve<App>(App);
app.bootstrap((port: number) => {
  // tslint:disable-next-line: no-console
  console.log(`API running on port ${port}`);
});
