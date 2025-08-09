import { SafeAreaView, View, Text } from 'react-native'
import { Button } from 'src/components/Button'
import { FormLoginParams } from 'src/types/form-login-params'
import { useForm } from 'react-hook-form'
import { schemaLogin } from 'src/utils/schema-login'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import InputLogin from 'src/components/input-login'

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: 'marciovf@gmail.com',
      password: '123456',
    },
    resolver: yupResolver(schemaLogin),
  })

  const onSubmit = (data: FormLoginParams) => {
    router.navigate('/home')
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <View className="flex-1 justify-center px-5">
        <View className="rounded-lg bg-white p-6">
          <Text className="mb-10 py-4 text-3xl font-extrabold">Login</Text>
          <InputLogin
            label="E-mail"
            control={control}
            name="email"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            error={errors.email}
          />

          <InputLogin
            label="Senha"
            control={control}
            name="password"
            placeholder="Digite sua senha"
            secureTextEntry
            error={errors.password}
          />
          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </View>
      </View>

      <View className="pb-4">
        <Text className="text-center text-white opacity-50 p-4">Defesa Civil do Amazonas</Text>
      </View>
    </SafeAreaView>
  )
}