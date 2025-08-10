import { SafeAreaView, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import CardReviewBuy from 'src/components/card-review-buy'
import CardList from 'src/components/card-list'
import { Button } from 'src/components/Button'
import TabsFilter, { FilterStatus } from 'src/components/tabs-filter'
import { router } from 'expo-router'
import { useHomeViewModel } from 'src/mvvm/mvvm-home'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')
  const { isLoading, getFilteredPurchases, calculateReviewData, refreshData } = useHomeViewModel()

  const filteredPurchases = getFilteredPurchases(activeFilter)
  const { paidData, pendingData } = calculateReviewData()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getLatestPayday = () => {
    if (filteredPurchases.length === 0) return null

    const latestDate = filteredPurchases.reduce((latest, purchase) => {
      return purchase.payday > latest ? purchase.payday : latest
    }, filteredPurchases[0].payday)

    return latestDate
  }

  const latestPayday = getLatestPayday()

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background-primary justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-2">Carregando compras...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary py-8">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="mb-6 text-2xl font-bold text-white">
          Olá Defesa Civil
        </Text>

        <Text className="mb-4 text-lg font-bold text-white">Atualizações</Text>
        <View className="flex-row justify-between">
          <CardReviewBuy type="paid" count={paidData.count} amount={`R$ ${paidData.amount}`} />
          <CardReviewBuy type="pending" count={pendingData.count} amount={`R$ ${pendingData.amount}`} />
        </View>

        <Text className="my-4 text-lg font-bold text-white">
          Lista de Compras
        </Text>

        <TabsFilter
          onFilterChange={setActiveFilter}
          activeTab={activeFilter}
        />

        {latestPayday && (
          <Text className="mb-4 text-sm text-white/80">
            Histórico do dia {formatDate(latestPayday)}
          </Text>
        )}

        {filteredPurchases.length > 0 ? (
          filteredPurchases.map((purchase) => {
            const uniqueId = `${purchase.name}-${purchase.payday.getTime()}`

            return (
              <CardList
                key={uniqueId}
                status={purchase.status as 'payment' | 'waiting' | 'pending'}
                title={purchase.name}
                price={purchase.price}
                redirect={() => router.push({
                  pathname: '/visu-register',
                  params: {
                    id: uniqueId,
                    title: purchase.name,
                    price: purchase.price,
                    description: purchase.description,
                    status: purchase.status,
                    payday: purchase.payday.toISOString(),
                  }
                })}
                description={purchase.description}
              />
            )
          })
        ) : (
          <View className="py-8 items-center">
            <Text className="text-white/60 text-center">
              Nenhuma compra encontrada para este filtro
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="mt-auto p-4 bg-background-primary">
        <Button
          title="Compra nova"
          onPress={() => router.navigate('/register')}
        />
      </View>
    </SafeAreaView>
  )
}
