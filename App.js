import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Screens/Main/Main"; // 메인 화면
import LocalSettingFirst from "./Screens/Main/LocalSetting/LocalSettingFirst";
import LoginScreen from './Screens/Login/LoginScreen'; // 학번로그인 일경우 학번 로그인 화면으로 전환 
import SignUpScreen from "./Screens/Login/SignUpScreen"; // 회원가입 페이지
import TicketScreen from "./Screens/Ticket/TicketScreen";
import BordingList from "./Screens/List/BordingList";
import DiclationScreen from "./Screens/Diclation/DiclationScreen";
import KakaoWebView from "./Screens/Login/KakaoWebView";
import TicketDetail from "./Screens/Ticket/TicketDetail";
import PesingerBordingList from "./Screens/List/PesingerBordingList";
import ProfileScreen from "./Screens/Profile/ProfileScreen";
import ProfileUpdateScreen from "./Screens/Profile/ProfileUpdateScreen";
import Setting from "./Screens/Setting/Setting";
import axios from "axios";
import InquiryScreen from "./Screens/Inquiry/InquiryScreen";
import Inquiry from "./Screens/Inquiry/Inquiry";


const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ 
            headerShown: false,
            animationEnabled: false
          }}
        > 
          <Stack.Screen name="StudendNumberLoginScreen" component={LoginScreen} /> 
          <Stack.Screen name="KakaoWebView" component={KakaoWebView} /> 
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="LocalSettingFirst" component={LocalSettingFirst} />                                                  
          <Stack.Screen name="TicketScreen" component={TicketScreen} />              
          <Stack.Screen name="DiclationScreen" component={DiclationScreen} />
          <Stack.Screen name="BordingList" component={BordingList} />
          <Stack.Screen name="PesingerBordingList" component={PesingerBordingList} />
          <Stack.Screen name="TicketDetail" component={TicketDetail} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="InquiryScreen" component={InquiryScreen} />
          <Stack.Screen name="Inquiry" component={Inquiry} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    
}