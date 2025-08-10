import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  variant?: 'primary' | 'red'
}

export function Button({ title, variant = 'primary', ...rest }: Props) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'red':
        return 'item-center mt-2 h-16 w-full justify-center rounded-lg bg-red p-2'
      case 'primary':
      default:
        return 'item-center mt-2 h-16 w-full justify-center rounded-lg bg-green p-2'
    }
  }

  return (
    <TouchableOpacity
      className={getButtonStyle()}
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="text-center text-lg text-white">{title}</Text>
    </TouchableOpacity>
  )
}
