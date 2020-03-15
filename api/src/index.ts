import * as express from "express";

function main(): void {
  const app: express.Express = express();

  app.get(
    "",
    (_: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
      return res.status(200).json({ hello: "world" });
    }
  )

  app.listen(process.env.PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`API listening on port ${process.env.PORT}`);
  });
}

main();
