import { ConfigFileType, TYPES } from './const'

export function getContent (): Record<string, string | boolean | number> {
  return {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: '"as-needed"',
    jsxSingleQuote: false,
    trailingComma: '"es5"',
    bracketSpacing: true,
    bracketSameLine: false,
    jsxBracketSameLine: false,
    arrowParens: '"always"',
    rangeStart: 0,
    rangeEnd: Infinity,
    parser: 'None',
    filepath: 'None',
    requirePragma: false,
    insertPragma: false,
    proseWrap: '"preserve"',
    htmlWhitespaceSensitivity: '"css"',
    vueIndentScriptAndStyle: false,
    endOfLine: '"lf"',
    embeddedLanguageFormatting: '"auto"',
    singleAttributePerLine: false
  }
}
export function getConfigContent (fileType: ConfigFileType): string {
  const content = getContent()
  const jsonContent = JSON.stringify(content, null, 2)
  if (TYPES.PACKAGE_JSON === fileType || TYPES.JSON === fileType) {
    return jsonContent
  }

  if (TYPES.CONFIG_JS === fileType || TYPES.RC_JS === fileType) {
    return `module.exports = ${jsonContent}`
  }

  const kvList = Object.entries(content).map(([k, v]) => {
    return [k, typeof v === 'string' ? `"${v}"` : v]
  })
  if (TYPES.RC === fileType) {
    return kvList.map(([k, v]) => `${k}: ${v}`).join('\n')
  }

  if (TYPES.TOML === fileType) {
    return kvList.map(([k, v]) => `${k}: ${v}`).join('\n')
  }
  return jsonContent
}
