import { program } from "commander"
import { configPrettier } from "./commands/prettier/index.js"
import fs from "fs-extra"
import { resolvePath } from "./utils/utils.js"

const pkgJson = fs.readJsonSync(resolvePath("package.json"))
program.name("oneline-config").description(pkgJson.description).version(`${pkgJson.version}`).usage("<command> [options]")

program.command("prettier").description("config prettier for project").action(configPrettier)

program.parse(process.argv)
