// 학번 로그인 컴포넌트이다.

import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'react-native-elements';
// firebase db 경로 불러오기
import { db } from '../../Database/DatabaseConfig/firebase';
// firebase db read 모듈 불러오기
import { doc, getDoc } from 'firebase/firestore';
// 회원정보 기본데이터 틀(기반) 불러오기
import { UserInfo } from '../../Database/Data/User/userInfo';


const StudendNumberLoginScreen = ({navigation}) => {
    const [studentNumber, SetStudentNumber] = useState(''); // 학번
    const [password, SetPassword] = useState(''); // 비밀번호
    const [signIn, SetSignIn] = useState(false);

    let readDoc = {}; // firebase에서 읽어온 데이터를 선언 할 변수이다.
    let userInfoDatas = [];

    // 회원정보 기본데이터를 UserInfoDefaultData 변수로 선언 (로그인 성공하면 학번, 학과, 이름 값을 넣을 예정 (티켓 생성 할때 유용 할것 같다,))
    const UserInfoDefaultData = UserInfo.UserInfo[0];

    // firebase db 회원정보 불러오기, 로그인 기능 포함
    const Read = () => {
      // 회원정보 문서 db 불러오기
      const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 

      getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          readDoc = snapshot.data();
          userInfoDatas = readDoc.UserInfo;
          console.log(userInfoDatas[0]);
          
          for (let i = 0; i < userInfoDatas.length; i++) {
            // 로그인 성공
            if (userInfoDatas[i].student_number === studentNumber && userInfoDatas[i].password === password) {
              SetSignIn(true);
              UserInfoDefaultData.nickname = userInfoDatas[i].nickname;
              UserInfoDefaultData.student_number = userInfoDatas[i].student_number;
              UserInfoDefaultData.department = userInfoDatas[i].department;

              console.log("회원정보 기본데이터 값 : ", UserInfoDefaultData);
            }
          }
        }
      })
      .catch((error) => alert(error.messeage));
    }
    
    /*
    // useEffect
    useEffect (() => {
      Read(); // Firebase의 문서들을 불러온다.
    },[]);
    */

    /*
    // 로그인 기능 함수
    const SignIn = () => {
      for (let i = 0; i < userInfoDatas.length; i++) {
        Read();
        if (userInfoDatas[i].student_number === studentNumber && userInfoDatas[i].password === password) {
          SetSignIn(true);
        }
      }
    };
*/

    return (
    <View style={styles.container}>
      <Input
        placeholder='학번을 입력해 주세요'
        label="학번"
        leftIcon={{ type: 'material', name: 'school'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
        value={studentNumber}
        onChangeText={Text => SetStudentNumber(Text)}
        />
       <Input
        placeholder='비밀번호를 입력해 주세요'
        label="비밀번호"
        leftIcon={{ type: 'material', name: 'lock'}} 
        value={password}
        onChangeText={Text => SetPassword(Text)}
        secureTextEntry //글자를 ***로 변경해줌
        />
       <Button 
        title='로그인' 
        style={styles.button} 
        onPress={
          () => {
            // 로그인 (학번을 보고 읽어온 회원 db를 하나씩 비교하는 알고리즘으로 설계 하였다.)
            Read();
            if (signIn === true) {
              alert("로그인 성공");
              navigation.navigate("Main");
            }
            else {
              alert("학번 또는 비밀번호 잘못 입력 했습니다.");
            }
          }
        } />
       <Button title='회원가입' style={styles.button} onPress={() => navigation.navigate("SignUpScreen")} />
    </View>
  )
}

export default StudendNumberLoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex:1,
        //alignContent:'center' 
        alignItems: 'center',           //중앙으로 옮김 정확한 명령어 의미 필요
        justifyContent: 'center'        //중앙으로 옮김 정확한 명령어 의미 필요
    }
});