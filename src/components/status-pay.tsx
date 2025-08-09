import React from "react";
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import { ErrorMessage } from "./error-message";
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";

type StatusType = 'payment' | 'waiting' | 'pending'

type Props<T extends FieldValues> = TouchableOpacityProps & {
    control: Control<T>;
    name: Path<T>;
    error?: FieldError;
};

const options: { label: string; value: StatusType }[] = [
    { label: "Pago", value: "payment" },
    { label: "Andamento", value: "waiting" },
    { label: "Atrasado", value: "pending" },
];

export default function StatusBuy<T extends FieldValues>({
    control,
    name,
    error,
}: Props<T>) {
    return (
        <View className="w-full">
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <View className="w-full flex-row justify-between items-center mb-4">
                        {options.map((option) => {
                            const isSelected = value === option.value;

                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => onChange(option.value)}
                                    className={`flex-1 py-2 mr-2 rounded border ${isSelected
                                        ? "border-green bg-background-primary"
                                        : "border-gray-400 bg-background-primary"
                                        }`}
                                >
                                    <Text
                                        className={`text-center font-semibold ${isSelected ? "text-green" : "text-gray-400"
                                            }`}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </View>
    );
}
