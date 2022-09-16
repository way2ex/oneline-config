import path from "path";
import { cwd } from "process";
import chalk from "chalk";

export function resolvePath(relativePath: string) {
  return path.resolve(cwd(), relativePath);
}

export const logger = {
  info(str: string) {
    console.log(chalk.cyan(str));
  },
  error(str: string) {
    console.log(chalk.red(str));
  },
  success(str: string) {
    console.log(chalk.green(str));
  },
};
