import { useState } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import { ListRepository } from '../database/drizzle/drizzle-list-repository'

export function useVisuRegisterViewModel() {
    const [isLoading, setIsLoading] = useState(false)
    const listRepository = new ListRepository()

    const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date)
        }
        return date.toLocaleDateString('pt-BR')
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
                            const allPurchases = await listRepository.findAll()
                            const purchaseToDelete = allPurchases.find(purchase => {
                                const uniqueId = `${purchase.name}-${purchase.payday.getTime()}`
                                return uniqueId === purchaseId
                            })

                            if (!purchaseToDelete) {
                                throw new Error('Compra não encontrada')
                            }

                            await listRepository.deleteByNameAndDate(
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
                            console.error('erro ao excluir aki:', error)
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
        handleDelete,
        handleEdit
    }
}