import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams, useFocusEffect } from 'expo-router'
import { useEffect, useCallback } from 'react'
import { Button } from 'src/components/Button'
import { ButtonBack } from 'src/components/button-back'
import VisuInput from 'src/components/visu-input'
import { colors } from 'src/shared/colors'
import { useVisuRegisterViewModel } from 'src/mvvm/mvvm-visu-register'

export default function VisuRegister() {
    const params = useLocalSearchParams()
    const {
        isLoading,
        handleDelete,
        handleEdit,
        purchaseData,
        loadPurchaseData,
        formatDate
    } = useVisuRegisterViewModel()

    useEffect(() => {
        loadPurchaseData(params)
    }, [params])

    useFocusEffect(
        useCallback(() => {
            loadPurchaseData(params)
        }, [])
    )

    const displayData = purchaseData || {
        name: params.title as string || 'Nome não informado',
        description: params.description as string || 'Descrição não informada',
        price: params.price as string || 'Preço não informado',
        status: params.status as string || 'waiting',
        payday: params.payday ? new Date(params.payday as string) : new Date(),
        expireday: params.expireday ? new Date(params.expireday as string) : new Date(),
    }

    return (
        <SafeAreaView className="flex-1 bg-background-primary py-8 p-4">
            <ScrollView>
                <ButtonBack />
                <Text className="my-4 text-2xl font-bold text-white">
                    {displayData.name}
                </Text>
                <VisuInput
                    label="Nome do produto"
                    result={displayData.name}
                    icon={<Entypo name="box" size={24} color={colors.white} />}
                />
                <VisuInput
                    label="Descrição do produto"
                    result={displayData.description}
                    icon={<Ionicons name="chatbox-ellipses" size={24} color={colors.white} />}
                />
                <VisuInput
                    label="Preço do produto"
                    result={displayData.price ? `R$ ${displayData.price}` : 'Preço não informado'}
                    icon={<MaterialIcons name="attach-money" size={24} color={colors.white} />}
                />
                <Text className="my-4 text-2xl font-bold text-white">
                    Dados de pagamento
                </Text>
                <VisuInput
                    label="Data de compra"
                    result={formatDate(displayData.payday)}
                    icon={<AntDesign name="calendar" size={24} color={colors.white} />}
                />
                <VisuInput
                    label="Data de vencimento"
                    result={formatDate(displayData.expireday)}
                    icon={<AntDesign name="calendar" size={24} color={colors.white} />}
                />

                <Text className="my-4 text-2xl font-bold text-white">
                    Status
                </Text>

                <View className="mb-4">
                    <View className="flex-row justify-between">
                        <View className={`flex-1 py-3 mr-2 rounded border ${displayData.status === 'payment' ? 'border-green bg-background-primary' : 'border-gray-400 bg-background-primary'
                            }`}>
                            <Text className={`text-center font-semibold ${displayData.status === 'payment' ? 'text-green' : 'text-gray-400'
                                }`}>
                                Pago
                            </Text>
                        </View>
                        <View className={`flex-1 py-3 mr-2 rounded border ${displayData.status === 'waiting' ? 'border-green bg-background-primary' : 'border-gray-400 bg-background-primary'
                            }`}>
                            <Text className={`text-center font-semibold ${displayData.status === 'waiting' ? 'text-green' : 'text-gray-400'
                                }`}>
                                Andamento
                            </Text>
                        </View>
                        <View className={`flex-1 py-3 rounded border ${displayData.status === 'pending' ? 'border-green bg-background-primary' : 'border-gray-400 bg-background-primary'
                            }`}>
                            <Text className={`text-center font-semibold ${displayData.status === 'pending' ? 'text-green' : 'text-gray-400'
                                }`}>
                                Atrasado
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mt-auto py-4">
                    <Button
                        title="Excluir"
                        onPress={() => handleDelete(params.id as string, displayData.name)}
                        variant="red"
                        disabled={isLoading}
                    />
                    <Button
                        title="Editar Compra"
                        onPress={() => handleEdit({
                            ...params,
                            title: displayData.name,
                            price: displayData.price,
                            description: displayData.description,
                            status: displayData.status,
                            payday: displayData.payday.toISOString(),
                            expireday: displayData.expireday.toISOString(),
                        })}
                        variant="primary"
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
