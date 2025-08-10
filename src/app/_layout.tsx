import '../styles/global.css'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Slot } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { View, Text, ActivityIndicator, StatusBar } from 'react-native'
import migrations from '../../drizzle/migrations/migrations'

const DATABASE_NAME = 'registro_de_compras.db'

export default function LayoutRoot() {
  return (
    <SQLite.SQLiteProvider databaseName={DATABASE_NAME}>
      <DatabaseInitializer />
    </SQLite.SQLiteProvider>
  )
}

function DatabaseInitializer() {
  const database = SQLite.useSQLiteContext()
  const db = drizzle(database)

  const { success, error } = useMigrations(db, migrations)

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <StatusBar barStyle="light-content" />
        <Text className="text-red-500 font-bold">{error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-2">Carregando banco de dados...</Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Slot />
    </>
  )
}
