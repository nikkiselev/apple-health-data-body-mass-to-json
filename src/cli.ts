#!/usr/bin/env node
import minimist from 'minimist'
import getBodyMassFromFile from './getBodyMassFromFile'

const args = minimist(process.argv.slice(2))

;(async () => console.log(await getBodyMassFromFile(args['in'])))()
