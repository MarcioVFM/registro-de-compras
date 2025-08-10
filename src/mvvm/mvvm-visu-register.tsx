import { useState } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import { useListRepository } from '../database/drizzle/drizzle-list-repository'
import { FormRegisterBuyParams } from '../shared/types/form-register-buy'

export function useVisuRegisterViewModel() {
    const [isLoading, setIsLoading] = useState(false)
    const [purchaseData, setPurchaseData] = useState<FormRegisterBuyParams | null>(null)
    const { deleteByNameAndDate, findAll, findByNameAndDate } = useListRepository()

    const loadPurchaseData = async (params: any) => {
        try {
            const originalName = params.title as string
            const originalPayday = params.payday ? new Date(params.payday as string) : new Date()

            const uniqueId = params.id as string
            if (uniqueId) {
                const allPurchases = await findAll()
                const purchase = allPurchases.find(purchase => {
                    const itemUniqueId = `${purchase.name}-${purchase.payday.getTime()}`
                    return itemUniqueId === uniqueId
                })

                if (purchase) {
                    setPurchaseData(purchase)
                    return
                }
            }

            const purchase = await findByNameAndDate(originalName, originalPayday)
            if (purchase) {
                setPurchaseData(purchase)
            }
        } catch (error) {
            console.error('fudeu:', error)
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
                            const allPurchases = await findAll()
                            const purchaseToDelete = allPurchases.find(purchase => {
                                const uniqueId = `${purchase.name}-${purchase.payday.getTime()}`
                                return uniqueId === purchaseId
                            })

                            if (!purchaseToDelete) {
                                throw new Error('Compra não encontrada')
                            }
                            await deleteByNameAndDate(
                                purchaseToDelete.name,
                                purchaseToDelete.payday
                            )

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
                                `Erro ao excluir o registro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
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
                expireday: params.expireday as string
            }
        })
    }

    return {
        isLoading,
        handleDelete,
        handleEdit,
        purchaseData,
        loadPurchaseData
    }
}''