import dayjs from 'dayjs'

export function formatTime(date, format) {
  format = format || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(date).format(format)
}

export function compare(property, sort) {
  return function(obj1, obj2) {
    const value1 = obj1[property]
    const value2 = obj2[property]
    if (sort) {
      return value1 - value2
    } else {
      return value2 - value1
    }
  }
}
