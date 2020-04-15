import { promises as fs } from 'fs'
import path from 'path'

export default async (givenPath: string) => {
  const content = await fs.readFile(path.join(__dirname, givenPath), 'utf8')
  return content
}
