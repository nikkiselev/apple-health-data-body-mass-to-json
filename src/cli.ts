#!/usr/bin/env node
import minimist from 'minimist'
import getBodyMassFromFile from './getBodyMassFromFile'
import { promises as fs } from 'fs'

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
  fs.writeFile(args['out'], data, 'utf8')
})()
