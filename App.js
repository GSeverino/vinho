import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/pages/Login';


//Padrão para criar os menus inferiores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Padrão para criar rotas
function Tabs() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = focused ? 'ios-menu' : 'ios-menu';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'ios-person' : 'ios-person';
          }else if (route.name === 'Config') {
            iconName = focused ? 'ios-settings' : 'ios-settings';
          }else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
          }else if (route.name === 'Tarefas') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}

      //light
      tabBarOptions={{
        activeTintColor: 'maroon',
        inactiveTintColor: 'gray',
        style: {backgroundColor: 'white',}
      }}
      /*Dark
      tabBarOptions={{
      activeTintColor: '#D3D3D3',
      inactiveTintColor: 'gray',
      style: {backgroundColor: 'black',}
    }}*/
          
      >
        <Tab.Screen name="Menu" component={MenuAdmin} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen name="Tarefas" component={Tarefas} />
        {/*<Tab.Screen name="Config" component={Config} />*/}


      </Tab.Navigator>


  );
}
export default function App() {

  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen 
          name="MenuAdmin" 
          component={Tabs}
          options={{headerShown: false}}
        />
        
        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ChatDialogo" 
          component={ChatDialogo} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Chat" 
          component={Chat} 
          options={{headerShown: false}}
        />
        
        <Stack.Screen 
          name="Config" 
          component={Config} 
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="RecuperarSenha" 
          component={RecuperarSenha} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Tarefas" 
          component={RecuperarSenha} 
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
