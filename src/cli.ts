#!/usr/bin/env node
import minimist from 'minimist'
import parseXMLFile from './parseXMLFile'

const args = minimist(process.argv.slice(2))

/**
 * Transform parsed record to a neat object
 */
const transform = (record: any) => {
  const observation = record?.observation[0]

  const value = observation?.text[0]?.value[0]
  const date = observation?.effectiveTime[0]?.low[0].$.value

  return { value, date }
}

/**
 * Filter only entries that have body mass records
 */
const withBodyMassRecords = (entry: any) =>
  entry?.organizer[0]?.component[0]?.observation[0]?.text[0]?.type[0] ===
  'HKQuantityTypeIdentifierBodyMass'

/**
 * Get body mass data from the XML file
 */
const getBodyMassFromFile = async (filePath: string) => {
  const parsed = await parseXMLFile(filePath)

  return parsed?.ClinicalDocument?.component[0]?.section[0]?.entry
    .find(withBodyMassRecords)
    ?.organizer[0]?.component.map(transform)
}

;(async () => console.log(await getBodyMassFromFile(args['in'])))()
