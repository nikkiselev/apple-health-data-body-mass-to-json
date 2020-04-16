import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

const parse = async (filePath: string) => {
  const content = await fs.readFile(path.join(__dirname, filePath), 'utf8')

  return parseStringPromise(content, { ignoreAttrs: true })
}

const transform = (record: any) => {
  const [value] = record?.observation[0]?.text[0]
  return { value }
}

const entryWithBodyMassRecords = (entry: any) =>
  entry?.organizer[0]?.component[0]?.observation[0]?.text[0]?.type[0] ===
  'HKQuantityTypeIdentifierBodyMass'

export default async (filePath: string) => {
  const parsed = await parse(filePath)

  return parsed?.ClinicalDocument?.component[0]?.section[0]?.entry
    .find(entryWithBodyMassRecords)
    ?.organizer[0]?.component.map(transform)
}
