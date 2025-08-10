import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'

export type FilterStatus = 'all' | 'paid' | 'overdue' | 'waiting'

interface TabsFilterProps {
  onFilterChange: (status: FilterStatus) => void
  activeTab?: FilterStatus
}

export default function TabsFilter({ onFilterChange, activeTab = 'all' }: TabsFilterProps) {
  const [selectedTab, setSelectedTab] = useState<FilterStatus>(activeTab)

  useEffect(() => {
    setSelectedTab(activeTab)
  }, [activeTab])

  const tabs = [
    { id: 'all' as FilterStatus, label: 'Todos' },
    { id: 'paid' as FilterStatus, label: 'Pagos' },
    { id: 'overdue' as FilterStatus, label: 'Atrasados' },
    { id: 'waiting' as FilterStatus, label: 'Andamento' }
  ]

  const handleTabPress = (tabId: FilterStatus) => {
    setSelectedTab(tabId)
    onFilterChange(tabId)
  }

  return (
    <View className="mb-6">
      <View className="flex-row justify-center">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handleTabPress(tab.id)}
            className={`items-center ${index > 0 ? 'ml-12' : ''}`}
          >
            <Text
              className={`text-base font-medium ${selectedTab === tab.id
                ? 'text-green'
                : 'text-gray-400'
                }`}
            >
              {tab.label}
            </Text>
            {selectedTab === tab.id && (
              <View className="mt-1 h-0.5 bg-green w-full" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
