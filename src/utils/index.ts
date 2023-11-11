import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export * from "./books";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}