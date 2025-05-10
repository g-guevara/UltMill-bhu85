// Modified app/navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Platform } from 'react-native';
import { User } from '../components/Login/User';

// Import screens
import HomeScreen from '../screens/HomeScreen';


// Define types
type TabParamList = {
  Home: undefined;
  Test: undefined;
  Reactions: undefined;
  Wishlist: undefined;
};

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

interface TabNavigatorProps {
  user: User;
  onLogout: () => void;
}

const Tab = createBottomTabNavigator<TabParamList>();

// Custom Tab Label Component - Updated with green color
const TabLabel = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text style={{
    fontSize: 12,
    color: focused ? '#01c955' : '#888', // Changed from #4285F4 to #01c955
    marginTop: -5,
  }}>
    {label}
  </Text>
);

export default function TabNavigator({ user, onLogout }: TabNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 5,
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#01c955', // Changed from #4285F4 to #01c955
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }: TabBarIconProps) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? '#01c955' : '#888'} // Changed from #4285F4 to #01c955
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel label="Home" focused={focused} />
          ),
        }}
      >
        {() => <HomeScreen user={user} onLogout={onLogout} />}
      </Tab.Screen>


    </Tab.Navigator>
  );
}