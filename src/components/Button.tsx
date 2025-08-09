import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="item-center mt-2 h-16 w-full justify-center rounded-lg bg-green p-2"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="text-center text-lg text-white">{title}</Text>
    </TouchableOpacity>
  )
}
