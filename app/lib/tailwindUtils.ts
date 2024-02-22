import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToAscii(inputString: string) {
  // remove non ascii chars
  // eslint-disable-next-line no-control-regex
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, '')
  return asciiString
}
