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

export default function Input<T extends FieldValues>({
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
      <View className="mb-4 w-full">
        <Text className="mb-1 text-base text-white font-semibold">{label}</Text>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              className={`flex-row items-center rounded-lg px-3 py-3 bg-background-secondary ${error ? 'border border-red' : ''
                }`}
            >
              <TextInput
                {...rest}
                value={value as string}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={showText}
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-base text-white"
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowText(prev => !prev)}
                  className="pl-2"
                >
                  <MaterialIcons
                    name={showText ? 'visibility-off' : 'visibility'}
                    color="#9CA3AF"
                    size={24}
                  />
                </TouchableOpacity>
              )}
              {children}
            </View>
          )}
        />
      </View>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  )
}
