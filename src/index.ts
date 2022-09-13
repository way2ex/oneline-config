import { program } from 'commander'
import pkgJson from '../package.json'
import { configPrettier } from './commands/prettier'

program
  .name('oneline-config')
  .description(pkgJson.description)
  .version(`${pkgJson.version}`)
  .usage('<command> [options]')

program
  .command('prettier')
  .description('config prettier for project')
  .action(configPrettier)

program.parse(process.argv)
