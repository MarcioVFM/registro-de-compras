import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Button } from 'src/components/Button'
import { ButtonBack } from 'src/components/button-back'
import VisuInput from 'src/components/visu-input'
import { colors } from 'src/shared/colors'
import { useVisuRegisterViewModel } from 'src/mvvm/mvvm-visu-register'

export default function VisuRegister() {
    const params = useLocalSearchParams()
    const {
        isLoading,
        formatDate,
        handleDelete,
        handleEdit,
    } = useVisuRegisterViewModel()

    return (
        <SafeAreaView className="flex-1 bg-background-primary py-8 p-4">
            <ScrollView>
                <ButtonBack />
                <Text className="my-4 text-2xl font-bold text-white">
                    {params.title as string || 'Detalhes da Compra'}
                </Text>
                <VisuInput
                    label="Nome do produto"
                    result={params.title as string || 'Nome não informado'}
                    icon={<Entypo name="box" size={24} color={colors.white} />}
                />
                <VisuInput
                    label="Descrição do produto"
                    result={params.description as string || 'Descrição não informada'}
                    icon={<Ionicons name="chatbox-ellipses" size={24} color={colors.white} />}
                />
                <VisuInput
                    label="Preço do produto"
                    result={params.price ? `R$ ${params.price as string}` : 'Preço não informado'}
                    icon={<MaterialIcons name="attach-money" size={24} color={colors.white} />}
                />
                <Text className="my-4 text-2xl font-bold text-white">
                    Dados de pagamento
                </Text>
                <VisuInput
                    label="Data de compra"
                    result={params.payday ? formatDate(params.payday as string) : 'Data não informada'}
                    icon={<AntDesign name="calendar" size={24} color={colors.white} />}
                />
                <VisuInput
                    label="Data de vencimento"
                    result={params.payday ? formatDate(params.payday as string) : 'Data não informada'}
                    icon={<AntDesign name="calendar" size={24} color={colors.white} />}
                />

                <Text className="my-4 text-2xl font-bold text-white">
                    Status
                </Text>

                <View className="mb-4">
                    <View className="flex-row justify-between">
                        <View className={`flex-1 py-3 mr-2 rounded border ${params.status === 'payment' ? 'border-green bg-background-primary' : 'border-gray-400 bg-background-primary'
                            }`}>
                            <Text className={`text-center font-semibold ${params.status === 'payment' ? 'text-green' : 'text-gray-400'
                                }`}>
                                Pago
                            </Text>
                        </View>
                        <View className={`flex-1 py-3 mr-2 rounded border ${params.status === 'waiting' ? 'border-green bg-background-primary' : 'border-gray-400 bg-background-primary'
                            }`}>
                            <Text className={`text-center font-semibold ${params.status === 'waiting' ? 'text-green' : 'text-gray-400'
                                }`}>
                                Andamento
                            </Text>
                        </View>
                        <View className={`flex-1 py-3 rounded border ${params.status === 'pending' ? 'border-green bg-background-primary' : 'border-gray-400 bg-background-primary'
                            }`}>
                            <Text className={`text-center font-semibold ${params.status === 'pending' ? 'text-green' : 'text-gray-400'
                                }`}>
                                Atrasado
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mt-auto py-4">
                    <Button
                        title="Excluir"
                        onPress={() => handleDelete(params.id as string, params.title as string)}
                        variant="red"
                        disabled={isLoading}
                    />
                    <Button
                        title="Editar Compra"
                        onPress={() => handleEdit(params)}
                        variant="primary"
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
