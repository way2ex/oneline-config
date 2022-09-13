export const TYPES = {
  PACKAGE_JSON: 'prettier field in package.json',
  RC: '.prettierrc', // YAML
  JSON: '.prettierrc.json',
  CONFIG_JS: 'prettier.config.js',
  RC_JS: '.prettierrc.js',
  TOML: '.prettierrc.toml'
} as const

export type Valueof<T extends Record<string, unknown>> = T[keyof T];
export type ConfigFileType = Valueof<typeof TYPES>


