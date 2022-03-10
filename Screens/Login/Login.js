import React, { useEffect }from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// firebase db 경로 불러오기
import { db } from '../../Database/DatabaseConfig/firebase';
// firebase db read 모듈 불러오기
import { doc, getDoc, getDocFromCache } from 'firebase/firestore';
// 회원정보 기본데이터 틀(기반) 불러오기
import { UserInfo } from '../../Database/Data/User/userInfo';


let readDoc = {}; // firebase에서 읽어온 데이터를 선언 할 변수이다.
// let userInfoDatas = [];

let userInfoDatas = [];

// 회원정보 기본데이터를 UserInfoDefaultData 변수로 선언 (로그인 성공하면 학번, 학과, 이름 값을 넣을 예정 (티켓 생성 할때 유용 할것 같다,))
const UserInfoDefaultData = UserInfo.UserInfo[0];

// firebase db 회원정보 불러오기, 로그인 기능 포함
async function  Read() {
  // 회원정보 문서 db 불러오기
  const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 

  const docSnap =  await getDoc(myDoc);

  
    if (docSnap.exists()) {
      readDoc = docSnap.data();
      userInfoDatas = readDoc.UserInfo;
      console.log("회원정보 데이터들 : ", userInfoDatas);
      UserInfo.userInfoDatas = userInfoDatas;
      console.log("Read 성공 : ", UserInfo.userInfoDatas);
      
    //   for (let i = 0; i < userInfoDatas.length; i++) {
    //     // 로그인 성공
    //     if (userInfoDatas[i].student_number === studentNumber && userInfoDatas[i].password === password) {
    //       SetSignIn(true);
    //       UserInfoDefaultData.nickname = userInfoDatas[i].nickname;
    //       UserInfoDefaultData.student_number = userInfoDatas[i].student_number;
    //       UserInfoDefaultData.department = userInfoDatas[i].department;

    //       console.log("회원정보 기본데이터 값 : ", UserInfoDefaultData);
    //     }
    //   }
    // }

    // 보안성 취약 

    
  }
}

function Login({ navigation }) {

  useEffect(() => {
    Read();
  }, [])
  return (
    // Title
    <View style={styles.container}>
      <View style={styles.text1}>
        <Text style={{fontWeight: 'bold', fontSize: 64, color: '#FFFFFF',}}>MATE</Text> 
      </View>
      
      <View style={styles.login}>
        <View style={{marginBottom: 15,}}>
          <TouchableOpacity onPress={() => navigation.navigate("StudendNumberLoginScreen")}>
            <Text style= {{height: 45, paddingHorizontal: 85, paddingVertical: 5,  backgroundColor: "#315EFF", color: "#FFFFFF", fontSize: 30, alignItems: 'center'}}>학번 로그인</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style= {{height: 45, paddingHorizontal: 72, paddingVertical: 5,  backgroundColor: "#FEE500", fontSize: 30, alignItems: 'center'}}>카카오 로그인</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#315EFF',
    borderBottomLeftRadius: 64, // borderRadius -> borderBottomLeftRadius, borderTopLeftRadius,...

  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default Login;