import { Tabs } from "expo-router"
import React from "react"

import { TabBarIcon } from "../../components/navigation/TabBarIcon"
import { Colors } from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={28} style={[{ marginBottom: -3 }]}  name={focused ? "home" : "home-outline"}
            color={color}/>
          )
        }}
      />
      <Tabs.Screen
        name="backend"
        options={{
          title: "Back-End",
          tabBarIcon: ({ color, focused }) => (
              <Ionicons size={28} style={[{ marginBottom: -3 }]}  name={focused ? "code-slash" : "code-slash-outline"}
              color={color}/>
            )
          }}
        />
    </Tabs>
  )
}
