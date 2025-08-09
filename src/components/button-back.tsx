import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export const ButtonBack = () => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between">
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color="white"
        onPress={() => router.back()}
      />
    </TouchableOpacity>
  )
}
