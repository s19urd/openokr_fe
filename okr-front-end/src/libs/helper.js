export const timestampsToDate = function(timestamps) {
  let  date = new Date(timestamps)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
