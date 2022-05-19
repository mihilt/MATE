// 학번 로그인 컴포넌트이다.

import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'react-native-elements';
// firebase db 경로 불러오기
import { db } from '../../Database/DatabaseConfig/firebase';
// firebase db read 모듈 불러오기
import { doc, getDoc, getDocFromCache } from 'firebase/firestore';
// 회원정보 기본데이터 틀(기반) 불러오기
import { UserInfo } from '../../Database/Data/User/userInfo';


const LoginScreen = ({navigation}) => {
    const [ studentNumber, SetStudentNumber ] = useState(''); // 학번
    const [ studentName, SetStudentName ] = useState(''); // 성명

    // 회원정보 기본데이터를 UserInfoDefaultData 변수로 선언 (로그인 성공하면 학번, 학과, 이름 값을 넣을 예정 (티켓 생성 할때 유용 할것 같다,))
    const DriverProfile = UserInfo.Driver[0];
    const PesingerProfile = UserInfo.Pesinger[0];

    // 로그인
    const Driver_login = UserInfo.Driver_login; // 드라이버
    const Pesinger_login = UserInfo.Pesinger_login; // 패신저
    
    async function  Read() {
      // 회원정보 문서 db 불러오기
      const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 

      const docSnap =  await getDoc(myDoc);

      
      if (docSnap.exists()) {
        readDoc = docSnap.data();
        
        // 드라이버
        for (let i = 0; i < readDoc.DriverInfo.length; i++) {
          Driver_login.push(readDoc.DriverInfo[i]);
        }
        // 패신저
        for (let i = 0; i < readDoc.PesingerInfo.length; i++) {
          Pesinger_login.push(readDoc.PesingerInfo[i]);
        }
      }
    }
    
    
    // useEffect
    useEffect (() => {
      console.log("useEffect 호출");
      Read();
    },[]);

    
    // 로그인 기능 함수
    const SignIn = () => {

      let signIn = false;

      for (let i = 0; i < UserInfo.Driver_login.length; i++) {
        console.log(UserInfo.Driver_login[i].student_number);
        if (UserInfo.Driver_login[i].student_number === studentNumber && UserInfo.Driver_login[i].nickname === studentName) {
          
          // 로그인 성공
          DriverProfile.nickname = UserInfo.Driver_login[i].nickname;
          DriverProfile.student_number = UserInfo.Driver_login[i].student_number;
          DriverProfile.department = UserInfo.Driver_login[i].department;
          DriverProfile.auth = UserInfo.Driver_login[i].auth;
          DriverProfile.kakao_id = UserInfo.Driver_login[i].kakao_id;

          signIn = true;

          if (signIn === true) {
            navigation.navigate("Main");
          }
        }
      }
      for (let i = 0; i < UserInfo.Pesinger_login.length; i++) {
        console.log(UserInfo.Pesinger_login[i].student_number);
        if (UserInfo.Pesinger_login[i].student_number === studentNumber && UserInfo.Pesinger_login[i].nickname === studentName) {
          
          // 로그인 성공
          PesingerProfile.nickname = UserInfo.Pesinger_login[i].nickname;
          PesingerProfile.student_number = UserInfo.Pesinger_login[i].student_number;
          PesingerProfile.department = UserInfo.Pesinger_login[i].department;
          PesingerProfile.auth = UserInfo.Pesinger_login[i].auth;
          PesingerProfile.kakao_id = UserInfo.Pesinger_login[i].kakao_id;

          signIn = true;

          if (signIn === true) {
            navigation.navigate("Main");
          }
        }
      }
      if (signIn === false) {
        alert("학번 또는 비밀번호 잘못 입력 했습니다.");
      }
    };

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
            <Text style={{fontWeight: 'bold', fontSize: 64, color: '#FFFFFF',}}>MATE</Text> 
          </View>
          <View style={styles.input_container}>
            <Input
              placeholder='학번'
              leftIcon={{ type: 'material'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
              value={studentNumber}
              containerStyle={{width: '85%', marginRight: 10}}
              onChangeText={Text => SetStudentNumber(Text)}
              keyboardType="number-pad"
            />
            <Input
              placeholder='성명'
              leftIcon={{ type: 'material'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
              value={studentName}
              containerStyle={{width: '85%', marginRight: 10}}
              onChangeText={Text => SetStudentName(Text)}
            />
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity  
              style={styles.button} 
              onPress={
                () => {
                  // 로그인 (학번을 보고 읽어온 회원 db를 하나씩 비교하는 알고리즘으로 설계 하였다.)
                  //Read();
                  SignIn();
                  SetStudentNumber("");
                  SetStudentName("");
                }
              }
            >
              <Text style={styles.text}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate("SignUpScreen")} 
            >
              <Text style={styles.text}>회원가입</Text>
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
      marginTop: '15%',
    },

    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 52,
      marginBottom: 10,
      backgroundColor: '#315EFF',
      borderRadius: 14,
    },

    text: {
      color: '#FFFFFF',
      fontSize: 17
    },

    container: {
        flex:1,
        //alignContent:'center' 
        // alignItems: 'center',           //중앙으로 옮김 정확한 명령어 의미 필요
        // justifyContent: 'center'        //중앙으로 옮김 정확한 명령어 의미 필요
    },

    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#315EFF',
      borderBottomLeftRadius: 32
    },

    input_container: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%'
    }
});
