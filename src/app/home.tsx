import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import { useState } from 'react'
import CardReviewBuy from 'src/components/card-review-buy'
import CardList from 'src/components/card-list'
import { Button } from 'src/components/Button'
import TabsFilter, { FilterStatus } from 'src/components/tabs-filter'
import { router } from 'expo-router'

type PurchaseItem = {
  id: string
  status: 'payment' | 'waiting' | 'pending'
  title: string
  price: string
  description?: string
  isOverdue?: boolean
  payday: Date
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')

  const purchases: PurchaseItem[] = [
    {
      id: '1',
      status: 'pending',
      title: 'placa de video rx 6600',
      price: '1899,99',
      description: 'vencimento: 09 de agosto',
      isOverdue: true,
      payday: new Date('2024-08-09')
    },
    {
      id: '2', 
      status: 'pending',
      title: 'Abacaxi',
      price: '19,50',
      description: 'Atrasado',
      isOverdue: true,
      payday: new Date('2024-07-15')
    },
    {
      id: '3',
      status: 'waiting',
      title: 'Notebook Dell',
      price: '2.500,00',
      description: 'Aguardando aprovação',
      payday: new Date('2024-08-20')
    },
    {
      id: '4',
      status: 'payment',
      title: 'Whey 3W MAX',
      price: 'Academia',
      payday: new Date('2024-08-02')
    }
  ]

  const getFilteredPurchases = () => {
    switch (activeFilter) {
      case 'paid':
        return purchases.filter(item => item.status === 'payment')
      case 'overdue':
        return purchases.filter(item => item.status === 'pending' && item.isOverdue)
      case 'waiting':
        return purchases.filter(item => item.status === 'waiting')
      case 'all':
        return purchases
      default:
        return purchases
    }
  }

  const filteredPurchases = getFilteredPurchases()
  
  // Debug: verificar quantos itens estão sendo filtrados
  console.log('Active filter:', activeFilter)
  console.log('Total purchases:', purchases.length)
  console.log('Filtered purchases:', filteredPurchases.length)

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

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
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
          <CardReviewBuy type="paid" count={10} amount="300,00" />
          <CardReviewBuy type="pending" count={5} amount="-198,00" />
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
          filteredPurchases.map((purchase) => (
            <CardList
              key={purchase.id}
              status={purchase.status}
              title={purchase.title}
              price={purchase.price}
              description={purchase.description}
            />
          ))
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
