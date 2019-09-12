import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export const dateFormat = (date: string, dateFormat: string): string => {
  return format(parseISO(date), dateFormat)
}
