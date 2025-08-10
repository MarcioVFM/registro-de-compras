import { useState } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormRegisterBuyParams } from 'src/shared/types/form-register-buy'
import { schemaRegisterBuy } from 'src/utils/schema-register-buy'

export function useEditRegisterViewModel(params: any) {
    const [isLoading, setIsLoading] = useState(false)

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
            expireday: params.payday ? new Date(params.payday as string) : new Date(),
        }
    })

    const onSubmit = async (data: FormRegisterBuyParams) => {
        try {
            setIsLoading(true)
            await updatePurchase(params.id as string, data)

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
            Alert.alert(
                'Erro',
                'Erro ao atualizar a compra. Tente novamente.',
                [{ text: 'OK' }]
            )
        } finally {
            setIsLoading(false)
        }
    }

    const updatePurchase = async (purchaseId: string, data: FormRegisterBuyParams) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    console.log('Compra atualizada:', purchaseId, data)
                    resolve(true)
                } else {
                    reject(new Error('Erro na atualização'))
                }
            }, 1000)
        })
    }

    return {
        control,
        handleSubmit,
        errors,
        isSubmitting,
        isLoading,
        onSubmit
    }
} 