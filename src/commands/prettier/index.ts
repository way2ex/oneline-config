import inquirer from "inquirer";
import { ConfigFileType, prettierIgnoreContent, TYPES } from "./const.js";
import { getConfig, getConfigContent } from "./get-config-content.js";
import fs from "fs-extra";

import prettier from "prettier";
import { logger, resolvePath } from "../../utils/utils.js";
import { addRecommendationExtension, setDefaultFormatter } from "./set-vscode.js";
import { installPackage } from "./install-package.js";

export async function configPrettier() {
  const jsonFile = resolvePath("package.json");
  const pkgJson = fs.readJsonSync(jsonFile);
  const anwsers: {
    configType: ConfigFileType;
    shouldAddRecommendationPlugin: boolean;
    shouldSetDefaultFormatter: boolean;
    pkgManager: "npm" | "pnpm" | "yarn";
  } = await inquirer.prompt([
    {
      type: "list",
      name: "configType",
      message: "Where do you want to put the config",
      choices: pkgJson.type === "module" ? Object.values(TYPES).filter((file) => !file.endsWith(".js")) : Object.values(TYPES),
    },
    {
      type: "confirm",
      name: "shouldAddRecommendationPlugin",
      message: "Do you want to add Prettier plugin as recommendation for VSCode?",
    },
    {
      type: "confirm",
      name: "shouldSetDefaultFormatter",
      message: "Do you want to set prettier as default formatter and format code onSave",
    },
    {
      type: "list",
      name: "pkgManager",
      message: "Which package manager do you want to use?",
      choices: ["npm", "pnpm", "yarn"],
    },
  ]);
  const config = getConfig();
  pkgJson.scripts = Object.assign({}, pkgJson.scripts, {
    "format-all": "prettier --write ./src",
  });
  if (anwsers.configType === TYPES.PACKAGE_JSON) {
    pkgJson.prettier = config;
  } else {
    const filePath = resolvePath(anwsers.configType);
    const configContent = getConfigContent(anwsers.configType, config);
    fs.writeFileSync(filePath, configContent);
  }
  const newContent = JSON.stringify(pkgJson);
  fs.writeFileSync(jsonFile, prettier.format(newContent, { ...config, parser: "json" }));
  logger.success("config file created successfully.");
  // vscode
  if (anwsers.shouldAddRecommendationPlugin) {
    addRecommendationExtension(config);
  }
  if (anwsers.shouldSetDefaultFormatter) {
    setDefaultFormatter(config);
  }
  fs.writeFileSync(".prettierignore", prettierIgnoreContent);
  logger.success("write .prettierignore file successfully.");

  await installPackage(anwsers.pkgManager);
}
