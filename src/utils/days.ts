import dayjs from 'dayjs'

export     const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
        date = new Date(date)
    }
    return dayjs(date).format('DD/MM/YYYY')
}