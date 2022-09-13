import inquirer from 'inquirer'
import { TYPES } from './const'

export async function configPrettier (value: string, options: unknown): void {
  console.log(value, options)
  const anwsers: Record<string, any> = await inquirer.prompt([
    {
        type: 'list',
        name: 'configType',
        message: 'Select a where you want to put the config',
        choices: Object.values(TYPES),
    },
])
}
