import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

export default async (givenPath: string) => {
  const content = await fs.readFile(path.join(__dirname, givenPath), 'utf8')

  const parsed = await parseStringPromise(content)

  return parsed
}
