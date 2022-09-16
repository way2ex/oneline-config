import fs from "fs-extra";
import { logger, resolvePath } from "../../utils/utils.js";
import prettier from "prettier";
import type { Config } from "./get-config-content.js";
export function addRecommendationExtension(config: Config) {
  const extensionPath = resolvePath(".vscode/extensions.json");
  const contentObj = {
    recommendations: ["esbenp.prettier-vscode"],
  };
  if (fs.existsSync(extensionPath)) {
    const originContent = fs.readJsonSync(extensionPath);
    Object.assign(contentObj, {
      ...originContent,
      recommendations: ["esbenp.prettier-vscode", ...(originContent.recommendations || [])],
    });
  }
  fs.mkdirp(resolvePath(".vscode"));
  fs.writeFileSync(extensionPath, prettier.format(JSON.stringify(contentObj), { ...config, parser: "json" }));
  logger.success("add recommendation extensions successfully.");
}

export function setDefaultFormatter(config: Config) {
  const settingPath = resolvePath(".vscode/settings.json");
  const contentObj = fs.existsSync(settingPath) ? fs.readJsonSync(settingPath) : {};
  contentObj["editor.defaultFormatter"] = "esbenp.prettier-vscode";
  contentObj["editor.formatOnSave"] = true;
  contentObj["[vue]"] = {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  };
  fs.mkdirp(resolvePath(".vscode"));
  fs.writeFileSync(settingPath, prettier.format(JSON.stringify(contentObj), { ...config, parser: "json" }));
  logger.success("set default formtter successfully.");
}
