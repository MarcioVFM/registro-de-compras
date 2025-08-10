import { useState } from 'react'
import { router } from 'expo-router'
import { useListRepository } from '../database/drizzle/drizzle-list-repository'
import { FormRegisterBuyParams } from '../shared/types/form-register-buy'

export function useRegisterViewModel() {
    const [isLoading, setIsLoading] = useState(false)

    const { create } = useListRepository()

    const createPurchase = async (data: FormRegisterBuyParams) => {
        try {
            setIsLoading(true)
            await create(data)
            router.back()

        } catch (err) {
            console.error('deu erro n compra fuck', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (data: FormRegisterBuyParams) => {
        await createPurchase(data)
    }

    return {
        handleSubmit,
        isLoading,
    }
} 