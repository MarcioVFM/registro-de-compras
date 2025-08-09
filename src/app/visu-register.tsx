import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Button } from 'src/components/Button'
import { ButtonBack } from 'src/components/button-back'
import Input from 'src/components/input'
import StatusBuy from 'src/components/status-pay'
import VisuInput from 'src/components/visu-input'
import { colors } from 'src/shared/colors'
import { FormRegisterBuyParams } from 'src/types/form-register-buy'
import { schemaRegisterBuy } from 'src/utils/schema-register-buy'

export default function VisuRegister() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormRegisterBuyParams>({
    resolver: yupResolver(schemaRegisterBuy),
    })

    const onSubmit = (data: FormRegisterBuyParams) => {
        console.log('Dados do formulário:', data)
    }

    return (
    <SafeAreaView className="flex-1 bg-background-primary p-4">
        <ScrollView>

            <ButtonBack />
            <Text className="my-4 text-2xl font-bold text-white">
                Registrar nova compra
            </Text>
            <VisuInput
                label="Nome do produto"
                result="whey 3w max"
                icon={<Entypo name="box" size={24} color={errors.name ? colors.red : colors.white} />} 
            />
            <VisuInput
                label="Descrição do produdo"
                result="whey 3w max"
                icon={<Ionicons name="chatbox-ellipses" size={24} color={errors.name ? colors.red : colors.white} />} 
            />
            <VisuInput
                label="Preço do produto"
                result="whey 3w max"
                icon={<MaterialIcons name="attach-money" size={24} color={errors.name ? colors.red : colors.white} />} 
            />
            <Text className="my-4 text-2xl font-bold text-white">
                Dados de pagamento
            </Text>
            <VisuInput
                label="Data de compra"
                result="dd/mm/aaaa"
                icon={<AntDesign name="calendar" size={24} color={errors.name ? colors.red : colors.white} />} 
            />
            <VisuInput
                label="Data de vencimento"
                result="dd/mm/aaaa"
                icon={<AntDesign name="calendar" size={24} color={errors.name ? colors.red : colors.white} />} 
            />

            <View className="mt-auto py-4">
                <Button
                    title="Excluir"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}
