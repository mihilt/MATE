// 학번 로그인 컴포넌트이다.
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
// 외부 폰트 불러오는 모듈
import { useFonts, Archivo_400Regular, Archivo_700Bold, Archivo_800ExtraBold } from '@expo-google-fonts/archivo';
import { NotoSansKR_400Regular, NotoSansKR_500Mediu, NotoSansKR_100Thin, NotoSansKR_300Light, NotoSansKR_500Medium, NotoSansKR_700Bold, NotoSansKR_900Black, } from "@expo-google-fonts/noto-sans-kr";
//아이콘
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
/*
  <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate("SignUpScreen")} 
  >
    <Text style={styles.text}>회원가입</Text>
  </TouchableOpacity>*/
 
  
  
  const LoginScreen = ({navigation, route}) => {
    
    // state
    // MATE 회원자 인지 확인 하는 state
    const [ memberCheck, setMemberCheck ] = useState(true);
    

    useEffect(async () => {
      //fetchAPI();
      /*
      if (route.params && route.params.url) {
        //console.log(route.params.url);
        //console.log("kakao state data route : ", route.params);
        const res = await axios.get(route.params.url.replace("LoginTo", "Login"));
        //console.log("응답 : ", res.data);
        if (memberCheck) {
          navigation.navigate("SignUpScreen");
        }
        
      }*/
    
      if (true) {
        //console.log(route.params.url);
        //console.log("kakao state data route : ", route.params);
        //const res = await axios.get(route.params.url.replace("LoginTo", "Login"));
        //console.log("응답 : ", res.data);
        // 회원인지 확인 하는 조건문
        if (false) {
          navigation.navigate("SignUpScreen", {data : {
            email : "zonins3@gmail.com",
            member_name : "",
            department: "",
            student_number: "",
            auth: "PASSENGER",
            profile_image: "",
            member_timetable: [],
          }});
        } else {
          navigation.navigate("Main", {data : {
            email : "zonins3@gmail.com",
            member_name : "손민석",
            department: "항공소프트웨어공학과",
            student_number: "201702003",
            auth: "PASSENGER",
            profile_image: "",
            member_timetable: ["월", "화", "수"],
          }})
        }
        
      }

    }, [route.params]);

    const fetchAPI = async () => {
      const res = await axios.get('http://3.37.159.244:8080/kakaoLoginOK')
      console.log("APP kakao api get 요청 : ", res);
      if (res.data === undefined) {
        navigation.navigate("KakaoWebView");
      } else {
        navigation.navigate("Main");
      }
    }
    const kakaoLoginCheck = async () => {
      const res = await axios.get('http://3.37.159.244:8080/kakaoLoginOK');
      
      console.log("kakaoLoginCheck 메소드 호출 : ", res.data);

      if (Object.keys(res.data).length === 0) {        
        navigation.navigate("KakaoWebView");
      } else {
        navigation.navigate("SignUpScreen", res.data);
      }
    }

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    //console.log("휴대폰 너비 : ", deviceWidth);
    //console.log("휴대폰 높이 : ", deviceHeight);

    let [ fontLoaded ] = useFonts({
      Archivo_400Regular,
      Archivo_700Bold,
      Archivo_800ExtraBold,
      NotoSansKR_500Medium,
      NotoSansKR_400Regular,
      NotoSansKR_700Bold,
      NotoSansKR_900Black,
    });

    if (!fontLoaded) {
      return null;
    }

    //console.log(route.params);

    return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "heigh"}
      style={styles.container}
    >
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: deviceHeight >= 700 ? 84 : 64, color: '#FFFFFF', fontFamily: 'Archivo_800ExtraBold'}}>MATE</Text> 
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#FFFFFF', fontFamily: 'NotoSansKR_400Regular', fontSize: deviceHeight >= 700 ? 18 : 14}}>경운대학교 <Text style={{color: '#FFFFFF', fontFamily: 'NotoSansKR_900Black'}}>카풀서비스 </Text></Text> 
              <Ionicons name="car-outline" size={24} color="white" />              
            </View>
          </View>
          <View>
            <Text style={{textAlign: 'center', color: '#FFFFFF', fontFamily: 'NotoSansKR_500Medium'}}>간편하게 로그인하고{"\n"}다양한 서비스를 이용해보세요</Text>
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity  
              style={styles.button}
              
              onPress={() => navigation.navigate("KakaoWebView")}               
            >
              <Text style={styles.text}>카카오 로그인</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </TouchableWithoutFeedback>
      
    </KeyboardAvoidingView>  
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    button_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 52,
      marginBottom: 10,
      backgroundColor: '#F9E000',
      borderRadius: 14,
    },

    text: {
      color: '#2E2E2E',
      fontSize: 17,
      fontFamily: 'NotoSansKR_700Bold',
    },

    container: {
        flex:1,
        backgroundColor: '#007AFF',
    },

    header: {
      flex: 1.8,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 32
    },

    input_container: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%'
    }
});