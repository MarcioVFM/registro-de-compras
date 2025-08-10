import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Button } from 'src/components/Button'
import { ButtonBack } from 'src/components/button-back'
import Input from 'src/components/input'
import StatusBuy from 'src/components/status-pay'
import { useRegisterViewModel } from 'src/mvvm/mvvm-register'
import { colors } from 'src/shared/colors'
import { FormRegisterBuyParams } from 'src/shared/types/form-register-buy'
import { schemaRegisterBuy } from 'src/utils/schema-register-buy'

export default function RegisterBuy() {
  const { handleSubmit: handleViewModelSubmit, isLoading, error } = useRegisterViewModel()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterBuyParams>({
    resolver: yupResolver(schemaRegisterBuy),
  })

  const onSubmit = (data: FormRegisterBuyParams) => {
    handleViewModelSubmit(data)
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary p-4">
      <ScrollView>

        <ButtonBack />
        <Text className="my-4 text-2xl font-bold text-white">
          Registrar nova compra
        </Text>
        <Input
          label="Nome do produto"
          control={control}
          name="name"
          placeholder="Nome do produto"
          error={errors.name}
        >
          <Entypo name="box" size={24} color={errors.name ? colors.red : colors.white} />
        </Input>
        <Input
          label="Descrição do produto"
          control={control}
          name="description"
          placeholder="Descrição"
          error={errors.description}
        >
          <Ionicons name="chatbox-ellipses" size={24} color={errors.description ? colors.red : colors.white} />
        </Input>
        <Input
          label="Preço do produto"
          control={control}
          name="price"
          placeholder="Preço do produto"
          keyboardType="decimal-pad"
          error={errors.price}
        >
          <MaterialIcons name="attach-money" size={24} color={errors.price ? colors.red : colors.white} />
        </Input>
        <Text className="my-4 text-2xl font-bold text-white">
          Dados de pagamento
        </Text>
        <Input
          label="Data da compra"
          control={control}
          name="payday"
          maxLength={8}
          placeholder="dd/mm/aa"
          keyboardType="numeric"
          error={errors.payday}
        >
          <AntDesign name="calendar" size={24} color={errors.payday ? colors.red : colors.white} />
        </Input>
        <Input
          label="Data de vencimento"
          control={control}
          maxLength={8}
          name="expireday"
          placeholder="dd/mm/aaaa"
          keyboardType="numeric"
          error={errors.expireday}
        >
          <AntDesign name="calendar" size={24} color={errors.expireday ? colors.red : colors.white} />
        </Input>
        <Text className="my-4 text-2xl font-bold text-white">Status</Text>
        <StatusBuy
          control={control}
          name="status"
          error={errors.status}
        />
        <View className="mt-auto py-4">
          <Button
            title={isLoading ? "Salvando..." : "Salvar"}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
