import '../styles/global.css'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Slot } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { View, Text, ActivityIndicator, StatusBar } from 'react-native'
import migrations from '../../drizzle/migrations/migrations'

const DATABASE_NAME = 'registro_de_compras.db'

export default function LayoutRoot() {
  // const expoDB = SQLite.openDatabaseSync(DATABASE_NAME)
  // const db = drizzle(expoDB)

  // const { success, error } = useMigrations(db, migrations)

  // if (error) {
  //   return (
  //     return
  //     // <View className=" flex-1 justify-center itens-center ">
  //     //   <Text>{error.message}</Text>
  //     // </View>
  //   )
  // }

  // if (!success) {
  //   return (
  //     <ActivityIndicator className=" flex-1 justify-center itens-center " />
  //   )
  // }

  return (
    // <SQLite.SQLiteProvider databaseName={DATABASE_NAME}>
      <Slot />
    // </SQLite.SQLiteProvider>
  )
}
