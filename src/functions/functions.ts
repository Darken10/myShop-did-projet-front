
export const getMondayOfCurrent = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diffToMonday = (dayOfWeek ===0 ?6 : dayOfWeek-1)
  today.setDate(today.getDate()-diffToMonday)

  return today
}
