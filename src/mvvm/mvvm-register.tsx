import { useState } from 'react'
import { router } from 'expo-router'
import { ListRepository } from '../database/drizzle/drizzle-list-repository'
import { FormRegisterBuyParams } from '../shared/types/form-register-buy'

export function useRegisterViewModel() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const listRepository = new ListRepository()

    const createPurchase = async (data: FormRegisterBuyParams) => {
        try {
            setIsLoading(true)
            setError(null)

            const newPurchase = await listRepository.create(data)
            console.log('Compra criada com sucesso:', newPurchase)
            router.back()

        } catch (err) {
            console.error('Erro ao criar compra:', err)
            setError('Erro ao salvar a compra. Tente novamente.')
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
        error
    }
} 