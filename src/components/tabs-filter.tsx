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
    { id: 'all' as FilterStatus, label: 'Todas' },
    { id: 'paid' as FilterStatus, label: 'Pagas' },
    { id: 'overdue' as FilterStatus, label: 'Atrasadas' },
    { id: 'waiting' as FilterStatus, label: 'Andamento' }
  ]

  const handleTabPress = (tabId: FilterStatus) => {
    setSelectedTab(tabId)
    onFilterChange(tabId)
  }

  return (
    <View className="mb-6">
      <View className="flex-row justify-between">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handleTabPress(tab.id)}
            className={`flex-1 py-3 mx-1 rounded-lg items-center ${
              selectedTab === tab.id 
                ? 'bg-white' 
                : 'bg-background-secondary'
            }`}
          >
            <Text 
              className={`font-semibold ${
                selectedTab === tab.id 
                  ? 'text-background-primary' 
                  : 'text-white'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
