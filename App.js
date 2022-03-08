import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login/Login"; // 로그인 선택(학번, 카카오, ...)화면
import Main from "./Screens/Main/Main"; // 메인 화면
import StudendNumberLoginScreen from './Screens/Login/StudendNumberLoginScreen'; // 학번로그인 일경우 학번 로그인 화면으로 전환 
import SignUpScreen from "./Screens/Login/SignUpScreen"; // 회원가입 페이지
import ProfileScreen from "./Screens/Profile/ProfileScreen"; // 프로필 화면 페이지

const Stack = createStackNavigator();

export default class App extends React.Component {
    
    render() {

        return (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
            > 
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="StudendNumberLoginScreen" component={StudendNumberLoginScreen} /> 
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              
            </Stack.Navigator>
          </NavigationContainer>
        );
    }
}