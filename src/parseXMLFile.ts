import { promises as fs } from 'fs'
import path from 'path'
import { parseStringPromise } from 'xml2js'

/**
 * Parse an XML file on the given path to an object
 */
export default async (filePath: string) => {
  const content = await fs.readFile(
    path.join(__dirname, '../', filePath),
    'utf8'
  )

  return parseStringPromise(content)
}
