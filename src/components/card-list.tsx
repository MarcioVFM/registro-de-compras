import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

type CardStatus = 'payment' | 'waiting' | 'pending'

type CardListProps = {
  status: CardStatus
  title: string
  price: string
  description?: string
  redirect: () => void
}

export default function CardList({
  status,
  title,
  price,
  redirect,
  description,
}: CardListProps) {
  const cardConfig = {
    payment: {
      bgColor: 'bg-green',
      buttonText: 'Pago',
    },
    waiting: {
      bgColor: 'bg-background-secondary',
      buttonText: 'pagar',
    },
    pending: {
      bgColor: 'bg-red',
      buttonText: 'pagar',
    },
  }

  const config = cardConfig[status]

  return (
    <TouchableOpacity className={`${config.bgColor} mb-3 rounded-2xl p-2`} onPress={redirect}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <FontAwesome5 name="receipt" size={22} color="white" />
          </View>

          <View className="flex-1">
            <Text className="mb-1 text-lg font-bold text-white">{title}</Text>
            <Text className="text-base font-semibold text-white">{price}</Text>
            {description && (
              <Text className="mt-1 text-sm text-white/80">{description}</Text>
            )}
          </View>
        </View>
        <Text className="font-semibold text-white">{config.buttonText}</Text>
      </View>
    </TouchableOpacity>
  )
}
