import { useState } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'

export interface PurchaseItem {
    id: string
    status: 'payment' | 'waiting' | 'pending'
    title: string
    price: string
    description?: string
    isOverdue?: boolean
    payday: Date
}

export function useVisuRegisterViewModel() {
    const [isLoading, setIsLoading] = useState(false)

    const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date)
        }
        return date.toLocaleDateString('pt-BR')
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'payment':
                return 'Pago'
            case 'waiting':
                return 'Andamento'
            case 'pending':
                return 'Atrasado'
            default:
                return 'Andamento'
        }
    }

    const handleDelete = async (purchaseId: string, purchaseTitle: string) => {
        Alert.alert(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir "${purchaseTitle}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setIsLoading(true)
                            await deletePurchase(purchaseId)

                            Alert.alert(
                                'Sucesso',
                                'Registro excluído com sucesso!',
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
                                'Erro ao excluir o registro. Tente novamente.',
                                [{ text: 'OK' }]
                            )
                        } finally {
                            setIsLoading(false)
                        }
                    },
                },
            ]
        )
    }

    const deletePurchase = async (purchaseId: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    console.log('Registro excluído:', purchaseId)
                    resolve(true)
                } else {
                    reject(new Error('Erro na exclusão'))
                }
            }, 1000)
        })
    }

    const handleEdit = (params: any) => {
        router.push({
            pathname: '/edit-register-buy',
            params: {
                id: params.id as string,
                title: params.title as string,
                price: params.price as string,
                description: params.description as string,
                status: params.status as string,
                payday: params.payday as string,
                isOverdue: params.isOverdue as string
            }
        })
    }

    return {
        isLoading,
        formatDate,
        getStatusLabel,
        handleDelete,
        handleEdit
    }
}
