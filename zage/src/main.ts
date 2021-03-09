#!/usr/bin/env node

import { createReadStream, createWriteStream, existsSync } from "fs";
import { spawn } from "child_process";
import { once } from "events";

(async () => {
  const inputFileName = process.argv[2];
  if (inputFileName === undefined) {
    console.error("no input file path");
    process.exit(1);
  }

  if (!existsSync(inputFileName)) {
    console.error(`input file (${inputFileName}) does not exist`);
    process.exit(1);
  }

  const recipientsFile = process.argv[3];
  if (recipientsFile === undefined) {
    console.error("no recipients file path");
    process.exit(1);
  }

  if (!existsSync(recipientsFile)) {
    console.error(`input file (${recipientsFile}) does not exist`);
    process.exit(1);
  }

  const input = createReadStream(inputFileName);
  const zstd = spawn("zstd", ["-19", "-c"]);
  const age = spawn("age", ["-R", recipientsFile]);
  const output = createWriteStream(`${inputFileName}.zst.age`);

  input.pipe(zstd.stdin);
  zstd.stdout.pipe(age.stdin);
  age.stdout.pipe(output);

  await once(output, "close");
})();
