import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

const parse = async (filePath: string) => {
  const content = await fs.readFile(path.join(__dirname, filePath), 'utf8')

  return parseStringPromise(content, { ignoreAttrs: true })
}

const getBodyMassFromEntry = (entry: any) => {
  const bodyMassTypeName = 'HKQuantityTypeIdentifierBodyMass'

  const text: any = entry?.observation[0]?.text[0]

  if (text.type[0] === bodyMassTypeName) {
    return { weight: text.value[0] }
  }

  return undefined
}

export default async (filePath: string) => {
  const parsed = await parse(filePath)

  const entries: any[] =
    parsed?.ClinicalDocument?.component[0]?.section[0]?.entry

  const data: any = []

  let foundEntryWithBodyMassRecords = false

  for (const entry of entries) {
    for (const component of entry?.organizer[0]?.component) {
      const bm = getBodyMassFromEntry(component)
      if (bm) {
        foundEntryWithBodyMassRecords = true
        data.push(bm)
      }
    }

    if (foundEntryWithBodyMassRecords) {
      break
    }
  }

  return data
}
