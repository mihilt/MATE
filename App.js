import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Screens/Main/Main"; // 메인 화면
import LocalSettingFirst from "./Screens/Main/LocalSetting/LocalSettingFirst";
import LoginScreen from './Screens/Login/LoginScreen'; // 학번로그인 일경우 학번 로그인 화면으로 전환 
import SignUpScreen from "./Screens/Login/SignUpScreen"; // 회원가입 페이지
import TicketScreen from "./Screens/Ticket/TicketScreen";
import SignUpSecondScreen from "./Screens/Login/SignUpSecondScreen";
import BordingList from "./Screens/List/BordingList";
import DiclationScreen from "./Screens/Diclation/DiclationScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {

    render() {
      

        return (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ 
                headerShown: false,
                animationEnabled: false
              }}
            > 
              <Stack.Screen name="StudendNumberLoginScreen" component={LoginScreen} /> 
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
              <Stack.Screen name="SignUpSecondScreen" component={SignUpSecondScreen} /> 
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="LocalSettingFirst" component={LocalSettingFirst} />                                                  
              <Stack.Screen name="TicketScreen" component={TicketScreen} />              
              <Stack.Screen name="DiclationScreen" component={DiclationScreen} />
              <Stack.Screen name="BordingList" component={BordingList} />
              
            </Stack.Navigator>
          </NavigationContainer>
        );
    }
}