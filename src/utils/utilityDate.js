export default (dateString) => {
    const selectedDate = new Date(dateString)
    const year = selectedDate.getFullYear()
    let month = (selectedDate.getMonth() + 1).toString().padStart(2, '0')
    let day = selectedDate.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}