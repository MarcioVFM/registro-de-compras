import { useState, useEffect } from 'react'
import { ListRepository } from '../database/drizzle/drizzle-list-repository'
import { FormRegisterBuyParams } from '../shared/types/form-register-buy'

export function useHomeViewModel() {
    const [purchases, setPurchases] = useState<FormRegisterBuyParams[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const listRepository = new ListRepository()

    const loadPurchases = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await listRepository.findAll()
            setPurchases(data)
        } catch (err) {
            console.error('deu errado fuck:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPurchases()
    }, [])

    const getFilteredPurchases = (activeFilter: string) => {
        switch (activeFilter) {
            case 'paid':
                return purchases.filter(item => item.status === 'payment')
            case 'overdue':
                return purchases.filter(item => item.status === 'pending')
            case 'waiting':
                return purchases.filter(item => item.status === 'waiting')
            case 'all':
                return purchases
            default:
                return purchases
        }
    }

    const calculateReviewData = () => {
        const paidData = purchases.filter(item => item.status === 'payment')
        const pendingData = purchases.filter(item => item.status === 'pending')

        const paidAmount = paidData.reduce((sum, item) => {
            const value = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'))
            return sum + (isNaN(value) ? 0 : value)
        }, 0)

        const pendingAmount = pendingData.reduce((sum, item) => {
            const value = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'))
            return sum + (isNaN(value) ? 0 : value)
        }, 0)

        return {
            paidData: { count: paidData.length, amount: paidAmount.toFixed(2) },
            pendingData: { count: pendingData.length, amount: pendingAmount.toFixed(2) }
        }
    }

    return {
        purchases,
        isLoading,
        error,
        getFilteredPurchases,
        calculateReviewData,
        refreshData: loadPurchases
    }
} 