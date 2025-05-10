// Modified app/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
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

interface AppNavigatorProps {
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

export default function AppNavigator({ user, onLogout }: AppNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#f8f8f8',
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