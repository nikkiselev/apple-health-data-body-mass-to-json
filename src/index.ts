import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

const parse = async (filePath: string) => {
  const content = await fs.readFile(path.join(__dirname, filePath), 'utf8')

  return parseStringPromise(content, { ignoreAttrs: true })
}

const bodyMassTypeName = 'HKQuantityTypeIdentifierBodyMass'

const getBodyMassFromEntry = (entry: any) => {
  const text: any = entry?.observation[0]?.text[0]
  return { weight: text.value[0] }
}

const entryWithBodyMassRecords = (entry: any) =>
  entry?.organizer[0]?.component[0]?.observation[0]?.text[0]?.type[0] ===
  bodyMassTypeName

export default async (filePath: string) => {
  const parsed = await parse(filePath)

  const entries: any[] =
    parsed?.ClinicalDocument?.component[0]?.section[0]?.entry

  const data: any = []

  const ourEntry = entries.find(entryWithBodyMassRecords)

  for (const component of ourEntry?.organizer[0]?.component) {
    const bm = getBodyMassFromEntry(component)
    if (bm) {
      data.push(bm)
    }
  }

  return data
}
