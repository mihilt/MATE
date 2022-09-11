// 학번 로그인 컴포넌트이다.

import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'react-native-elements';
// firebase db 경로 불러오기
import { db, auth } from '../../Database/DatabaseConfig/firebase';
// firebase db read 모듈 불러오기
import { getDocs, collection } from 'firebase/firestore';
//firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {
    // state 선언
    const [ email, setEmail ] = useState(''); // 이메일
    const [ password, setPassword ] = useState(''); // 비밀번호
    
    // 로그인
    const [ userDataStore, setUserDataStore ] = useState([]);
    // 프로필
    //const [ profile, setProfile ] = useState({});
    const profile = useRef({});

    const [ loading, setLoading ] = useState(true);


    // useEffect
    useEffect ( () => {
      getUserDatas();
      
    },[]);

    
    // DB에서 UserDatas를 불러온다. 없으면 
    const getUserDatas = async () => {
      const datas = await getDocs(collection(db, "UserDatas"));

      datas.forEach(document => {

          const userObj = {
              ...document.data()
          };
          
          setUserDataStore((prev) => [{...userObj}, ...prev]);
      });
      setLoading(false);
    }

    // 로그인 기능 함수
    const SignIn = () => {
      if (loading === false) {
        userDataStore.map(user => {
          console.log(user.pwd === password);
          if (user.email === email && user.pwd === password) {
            console.log("singIn : ", user);
            profile.current = user;
          }
        });
        
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("로그인 성공");
          navigation.navigate("Main", profile.current);
        })
        .catch(err => alert("계정, 비밀번호 잘못 입력 받았습니다."));
      } else {
        console.log("로딩중...");
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
              placeholder='이메일'
              leftIcon={{ type: 'material'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
              value={email}
              containerStyle={{width: '85%', marginRight: 10}}
              onChangeText={email=> setEmail(email)}
            />
            <Input
              placeholder='비밀번호'
              leftIcon={{ type: 'material'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
              value={password}
              containerStyle={{width: '85%', marginRight: 10}}
              onChangeText={pwd => setPassword(pwd)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity  
              style={styles.button} 
              onPress={
                async () => {
                  // 로그인 (학번을 보고 읽어온 회원 db를 하나씩 비교하는 알고리즘으로 설계 하였다.)
                  //Read();
                  await SignIn();
                  setEmail("");
                  setPassword("");
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