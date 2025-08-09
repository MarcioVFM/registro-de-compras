import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type CardType = 'paid' | 'pending'

type CardReviewBuyProps = {
  type: CardType
  count: number
  amount: string
}

export default function CardReviewBuy({
  type,
  count,
  amount,
}: CardReviewBuyProps) {
  const isPaid = type === 'paid'

  return (
    <View className="mx-2 flex-1">
      <View className={`${isPaid ? 'bg-green' : 'bg-red'} rounded-2xl p-4`}>
        <View className="mb-4 flex-row items-center">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-background-primary">
            <MaterialIcons
              name={isPaid ? 'trending-up' : 'trending-down'}
              size={24}
              color={isPaid ? 'green' : 'red'}
            />
          </View>
          <View className="ml-10 flex-col items-center">
            <Text className="mb-2 text-3xl font-bold text-white">{count}</Text>
            <Text className="mb-3 text-lg font-semibold text-white">
              {amount}
            </Text>
          </View>
        </View>

        <Text className="text-lg font-medium text-white">
          {isPaid ? 'Contas pagas' : 'Contas pendentes'}
        </Text>
      </View>
    </View>
  )
}
