import moment from 'moment'

export const fullDateBuilder = (date, time) => {
  const [ year, month, day ] = date.split('-')
  const [hour, minutes] = time.split(':')

  return new Date(Number(year), (Number(month) - 1), Number(day), Number(hour), Number(minutes) )
}

export const inputDateFormater = (date = new Date()) =>{
  return moment(date).format('YYYY-MM-DD')
}
export const inputTimeFormater = (date = new Date()) =>{
  return moment(date).format('HH:mm')
}

export const eventDateFormater = (date = new Date()) => {
  return moment(date).format('LLL')
}

export const add30Minutes = (date = new Date()) => {
  date.setMinutes( date.getMinutes() + 30 )
  return date
}

export const toISOFormat = (date = new Date()) => {
  return moment(date).format()
}