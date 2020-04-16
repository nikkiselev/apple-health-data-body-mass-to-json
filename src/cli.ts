#!/usr/bin/env node
import minimist from 'minimist'
import getBodyMassFromFile from './getBodyMassFromFile'
import { promises as fs } from 'fs'
import path from 'path'

const args = minimist(process.argv.slice(2))

const requiredArgs = ['in', 'out']

requiredArgs
  .filter((arg) => !args[arg])
  .forEach((arg: any) => {
    console.log(`Missing required argument "${arg}".`)
    process.exit(1)
  })
;(async () => {
  const data = JSON.stringify(await getBodyMassFromFile(args['in']))
  fs.writeFile(path.join(__dirname, '../', args['out']), data, 'utf8')
})()
