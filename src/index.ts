import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

const parse = async (filePath: string) => {
  const content = await fs.readFile(path.join(__dirname, filePath), 'utf8')

  return parseStringPromise(content, { ignoreAttrs: true })
}

export default async (filePath: string) => {
  const parsed = await parse(filePath)

  const entries: any[] =
    parsed?.ClinicalDocument?.component[0]?.section[0]?.entry

  const data: any = []

  entries.forEach((entry: any) => {
    entry?.organizer[0]?.component.forEach((component: any) => {
      const text: any = component?.observation[0]?.text[0]
      if (text.type[0] === 'HKQuantityTypeIdentifierBodyMass') {
        data.push({ weight: text.value[0] })
      }
    })
  })

  return data
}
