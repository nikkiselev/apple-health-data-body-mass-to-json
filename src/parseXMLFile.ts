import { promises as fs } from 'fs'
import { parseStringPromise } from 'xml2js'

/**
 * Parse an XML file on the given path to an object
 */
export default async (filePath: string) => {
  const content = await fs.readFile(filePath, 'utf8')

  return parseStringPromise(content)
}
