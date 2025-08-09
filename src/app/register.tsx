import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SafeAreaView, Text, View } from 'react-native'
import { Button } from 'src/components/Button'
import { ButtonBack } from 'src/components/button-back'
import Input from 'src/components/input'
import { FormRegisterBuyParams } from 'src/types/form-register-buy'
import { schemaRegisterBuy } from 'src/utils/schema-register-buy'

export default function RegisterBuy() {
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
        <Entypo name="box" size={24} color="black" />
      </Input>
      <Input
        label="Descrição do produto"
        control={control}
        name="description"
        placeholder="Descrição"
        error={errors.description}
      >
        <Ionicons name="chatbox-ellipses" size={24} color="white" />
      </Input>
      <Input
        label="Preço do produto"
        control={control}
        name="price"
        placeholder="Preço do produto"
        keyboardType="decimal-pad"
        error={errors.price}
      >
        <MaterialIcons name="attach-money" size={24} color="white" />
      </Input>
      <Text className="my-4 text-2xl font-bold text-white">
        Dados de pagamento
      </Text>
      <Input
        label="Data da compra"
        control={control}
        name="payday"
        placeholder="25/01/2020"
        keyboardType="numeric"
        error={errors.payday}
      >
        <AntDesign name="calendar" size={24} color="white" />
      </Input>
      <Input
        label="Data de vencimento"
        control={control}
        name="expireday"
        placeholder="25/01/2021"
        keyboardType="numeric"
        error={errors.expireday}
      >
        <AntDesign name="calendar" size={24} color="black" />
      </Input>
      <Text className="my-4 text-2xl font-bold text-white">Status</Text>
      <View className="mt-auto">
        <Button
          title="Salvar"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  )
}
