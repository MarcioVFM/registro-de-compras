import { ReactNode } from "react";
import { View, Text } from "react-native";

type Props = {
  label: string
  result: string
  icon?: ReactNode
}

export default function VisuInput({ label, result, icon }: Props) {
  return (
    <View className="mb-4 w-full">
      <Text className="mb-1 text-base text-white font-semibold">
        {label}
      </Text>

      <View className="flex-row items-center justify-between rounded-lg px-3 py-3 bg-background-secondary">
        <Text className="text-white text-base">{result}</Text>
        {icon && <View>{icon}</View>}
      </View>
    </View>
  );
}
