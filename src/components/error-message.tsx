import { MaterialIcons } from '@expo/vector-icons'
import { FC, PropsWithChildren } from 'react'
import { View, Text } from 'react-native'
import { colors } from 'src/shared/colors'

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className="item-center flex-row">
      <MaterialIcons name="error-outline" size={16} color={colors.red} />
      <Text className="text-red">{children}</Text>
    </View>
  )
}
