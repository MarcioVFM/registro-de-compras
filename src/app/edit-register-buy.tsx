import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Button } from 'src/components/Button'
import { ButtonBack } from 'src/components/button-back'
import Input from 'src/components/input'
import StatusBuy from 'src/components/status-pay'
import { colors } from 'src/shared/colors'
import { useEditRegisterViewModel } from 'src/mvvm/mvvm-edit-register'

export default function EditRegisterBuy() {
  const params = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    isLoading,
    onSubmit
  } = useEditRegisterViewModel(params)

  return (
    <SafeAreaView className="flex-1 bg-background-primary py-8 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack />
        <Text className="my-4 text-2xl font-bold text-white">
          EDITAR DADOS
        </Text>

        <Text className="my-4 text-xl font-bold text-white">
          Dados do produto
        </Text>

        <Input
          label="Nome do produto"
          control={control}
          name="name"
          placeholder="Digite o nome do produto"
          error={errors.name}
        >
          <Entypo name="box" size={24} color={errors.name ? colors.red : colors.white} />
        </Input>

        <Input
          label="Descrição do produto"
          control={control}
          name="description"
          placeholder="Digite a descrição do produto"
          error={errors.description}
        >
          <Ionicons name="chatbox-ellipses" size={24} color={errors.description ? colors.red : colors.white} />
        </Input>

        <Input
          label="Preço do produto"
          control={control}
          name="price"
          placeholder="Digite o preço"
          keyboardType="numeric"
          error={errors.price}
        >
          <MaterialIcons name="attach-money" size={24} color={errors.price ? colors.red : colors.white} />
        </Input>

        <Text className="my-4 text-xl font-bold text-white">
          Dados de pagamento
        </Text>

        <Input
          label="Data de compra"
          control={control}
          name="payday"
          placeholder="dd/mm/aaaa"
          error={errors.payday}
        >
          <AntDesign name="calendar" size={24} color={errors.payday ? colors.red : colors.white} />
        </Input>

        <Input
          label="Data de vencimento"
          control={control}
          name="expireday"
          placeholder="dd/mm/aaaa"
          error={errors.expireday}
        >
          <AntDesign name="calendar" size={24} color={errors.expireday ? colors.red : colors.white} />
        </Input>

        <Text className="my-4 text-xl font-bold text-white">
          Status
        </Text>

        <StatusBuy
          control={control}
          name="status"
          error={errors.status}
        />

        <View className="mt-8">
          <Button
            title="Salvar"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
