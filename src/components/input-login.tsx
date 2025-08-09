import { ReactNode, useState } from 'react'
import {
  TextInputProps,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { ErrorMessage } from './error-message'
import { colors } from 'src/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

type Props<T extends FieldValues> = TextInputProps & {
  label: string
  control: Control<T>
  name: Path<T>
  error?: FieldError
  children?: ReactNode
  rules?: RegisterOptions<T>
}

export default function InputLogin<T extends FieldValues>({
  label,
  control,
  name,
  error,
  children,
  secureTextEntry,
  rules,
  ...rest
}: Props<T>) {
  const [showText, setShowText] = useState(!!secureTextEntry)

  return (
    <>
      <View className="mb-4 w-full border-b pb-2">
        <Text className="mb-1 text-sm text-gray-500">{label}</Text>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-row items-center justify-between">
              <TextInput
                {...rest}
                value={value as string}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={showText}
                className="flex-1 text-base"
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowText(value => !value)}
                  className="p-2"
                >
                  <MaterialIcons
                    name={showText ? 'visibility-off' : 'visibility'}
                    color={colors['background-secondary']}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
        {children}
      </View>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  )
}