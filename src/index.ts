import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

export default async (givenPath: string) => {
  const content = await fs.readFile(path.join(__dirname, givenPath), 'utf8')

  const parsed = await parseStringPromise(content, { ignoreAttrs: true })

  const entries: any[] =
    parsed?.ClinicalDocument?.component[0]?.section[0].entry

  const data: any = []

  entries.forEach((entry: any) => {
    entry?.organizer[0]?.component.forEach((component: any) => {
      if (
        component?.observation[0]?.text[0]?.type[0] ===
        'HKQuantityTypeIdentifierBodyMass'
      ) {
        data.push({ weight: component?.observation[0]?.text[0]?.value[0] })
      }
    })
  })

  return data
}
