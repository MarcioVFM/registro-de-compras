export type BuyItem = {
    id: string
    status: 'payment' | 'pending'
    title: string
    price: string
    description?: string
    isOverdue?: boolean
    payday: Date
}

const parsePrice = (price: string) => {
    const cleanPrice = price.replace(/[^\d,.-]/g, '')
    if (cleanPrice.includes(',')) {
        return parseFloat(cleanPrice.replace('.', '').replace(',', '.')) || 0
    }
    return parseFloat(cleanPrice) || 0
}

export const calculateReviewData = (purchases: BuyItem[]) => {
    const paidData = {
        count: purchases.filter(item => item.status === 'payment').length,
        amount: purchases
            .filter(item => item.status === 'payment')
            .reduce((sum, item) => sum + parsePrice(item.price), 0)
            .toFixed(2).replace('.', ',')
    }

    const pendingData = {
        count: purchases.filter(item => item.status === 'pending').length,
        amount: purchases
            .filter(item => item.status === 'pending')
            .reduce((sum, item) => sum + parsePrice(item.price), 0)
            .toFixed(2).replace('.', ',')
    }

    return { paidData, pendingData }
}