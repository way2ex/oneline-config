import { ConfigFileType, TYPES } from "./const.js";
import prettier from "prettier";
export type Config = Record<string, string | boolean | number | undefined>;
export function getConfig(): Config {
  return {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: false,
    jsxBracketSameLine: false,
    arrowParens: "always",
    requirePragma: false,
    insertPragma: false,
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",
    singleAttributePerLine: false,
  };
}
export function getConfigContent(fileType: ConfigFileType, config: Config): string {
  const jsonContent = JSON.stringify(config, null, 2);
  if (TYPES.PACKAGE_JSON === fileType || TYPES.JSON === fileType) {
    return prettier.format(jsonContent, { ...config, parser: "json" });
  }

  if (TYPES.CONFIG_JS === fileType || TYPES.RC_JS === fileType) {
    return prettier.format(`module.exports = ${jsonContent}`, {
      ...config,
      parser: "babel",
    });
  }

  const kvList = Object.entries(config).map(([k, v]) => {
    return [k, typeof v === "string" ? `"${v}"` : v];
  });
  if (TYPES.RC === fileType || TYPES.RC_YAML === fileType) {
    return kvList.map(([k, v]) => `${k}: ${v}`).join("\n");
  }

  if (TYPES.TOML === fileType) {
    return kvList.map(([k, v]) => `${k} = ${v}`).join("\n");
  }
  return jsonContent;
}
