#!/usr/bin/env node
import ora from 'ora'
import meow from 'meow'
import chalk from 'chalk'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import process from 'node:process'
import Linkerr from 'linkerr'

(async () => {
  const cli = meow(`
      Usage:
        $ linkerr [options]
    
      Options:
        --url,    -u  <url>   target url
        --output, -o  <path>  output path
        --name,   -n  <name>  output file name
    
      Examples:
        $ linkerr -u https://github.com -o logs -n log_github
    `, {
    importMeta: import.meta,
    flags: {
      url: {
        type: 'string',
        alias: 'u'
      },
      output: {
        type: 'string',
        alias: 'o'
      },
      name: {
        type: 'string',
        alias: 'n'
      }
    }
  })

  if (!cli.flags.url) {
    console.log(cli.help)
    process.exit(1)
  }

  const spinner = ora()

  try {
    const linkerr = new Linkerr()
    await linkerr.parse(cli.flags.url)

    if (linkerr.url instanceof URL) {
      spinner.succeed(`Page ${chalk.green(linkerr.url.href)} have been parsed`)
      const __dirname = dirname(fileURLToPath(import.meta.url))
      const outputPath = path.join(__dirname, cli.flags.output || '/output')
      const fileName = (cli.flags.name || linkerr.url.hostname + '_' + Date.now()) + '.json'
      await linkerr.save({ outputPath, fileName })
      spinner.succeed(`Data saved at ${chalk.cyan(path.join(outputPath, fileName))}`)
    }
  } catch (err) {
    spinner.fail(`${err}`)
    process.exit(1)
  }
})()