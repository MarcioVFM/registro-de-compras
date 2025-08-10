import { useState } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormRegisterBuyParams } from 'src/shared/types/form-register-buy'
import { schemaRegisterBuy } from 'src/utils/schema-register-buy'
import { useListRepository } from '../database/drizzle/drizzle-list-repository'

export function useEditRegisterViewModel(params: any) {
    const [isLoading, setIsLoading] = useState(false)
    const { update, findById } = useListRepository()

    const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date)
        }
        return date.toLocaleDateString('pt-BR')
    }


    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormRegisterBuyParams>({
        resolver: yupResolver(schemaRegisterBuy),
        defaultValues: {
            name: params.title as string || '',
            description: params.description as string || '',
            price: params.price as string || '',
            status: params.status as string || 'waiting',
            payday: params.payday ? new Date(params.payday as string) : new Date(),
            expireday: params.expireday ? new Date(params.expireday as string) : new Date(),
        }
    })

    const onSubmit = async (data: FormRegisterBuyParams) => {
        try {
            setIsLoading(true)
            const originalPurchase = await findById(params.id as string)

            if (!originalPurchase) {
                throw new Error('Compra não encontrada')
            }
            const updateData = {
                ...data,
                payday: originalPurchase.payday,
                expireday: originalPurchase.expireday
            }

            const updatedPurchase = await update(originalPurchase.id, updateData)
            if (!updatedPurchase) {
                throw new Error('Erro ao atualizar a compra')
            }
            Alert.alert(
                'Sucesso',
                'Compra atualizada com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => router.back()
                    }
                ]
            )
        } catch (error) {
            console.error('deu merda atualzind:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        formatDate,
        control,
        handleSubmit,
        errors,
        isSubmitting,
        isLoading,
        onSubmit
    }
} 