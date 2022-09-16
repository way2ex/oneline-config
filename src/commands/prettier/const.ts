export const TYPES = {
  PACKAGE_JSON: "prettier field in package.json",
  RC: ".prettierrc", // YAML
  RC_YAML: ".prettierrc.yaml",
  JSON: ".prettierrc.json",
  CONFIG_JS: "prettier.config.js",
  RC_JS: ".prettierrc.js",
  TOML: ".prettierrc.toml",
} as const

export type Valueof<T extends Record<string, unknown>> = T[keyof T]
export type ConfigFileType = Valueof<typeof TYPES>
export const PACKAGE_MANAGER_INSTALL_COMMAND_MAP = {
  yarn: `yarn add prettier --ignore-workspace-root-check --dev`,
  pnpm: `pnpm add --save-dev prettier`,
  npm: `npm install prettier --save-dev`,
}
export const prettierIgnoreContent = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`
