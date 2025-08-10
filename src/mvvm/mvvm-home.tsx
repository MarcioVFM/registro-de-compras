import { useState, useEffect } from 'react'
import { useListRepository } from '../database/drizzle/drizzle-list-repository'
import { FormRegisterBuyParams } from '../shared/types/form-register-buy'

export function useHomeViewModel() {
    const [purchases, setPurchases] = useState<FormRegisterBuyParams[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { findAll } = useListRepository()

    const loadPurchases = async () => {
        try {
            setIsLoading(true)
            const data = await findAll()
            setPurchases(data)
        } catch (err) {
            console.error('Erro detalhado ao carregar compras:', err)
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
        getFilteredPurchases,
        calculateReviewData,
        refreshData: loadPurchases
    }
} 