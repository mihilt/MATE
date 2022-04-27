// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Pressable} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'; // dropdown 모듈 불러오기
import { Input } from 'react-native-elements';
import React, { useState } from 'react';

// 회원정보 기본데이터 불러오기
import { UserInfo } from '../../Database/Data/User/userInfo';

// firebase cloud db 경로 불러오기
import { db } from '../../Database/DatabaseConfig/firebase';

// firebase doc 읽기, 생성, 업로드 관련 모듈 불러오기
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { TextInput } from "react-native";

export default function SignUpScreen({navigation}) {
    
    // 버튼에서 패신저 클릭하면 성명, 학번, 학과 입력창 나오며, 드라이버 클릭하면 학과 입력창 안나옴. 
    const [ button, setButton ] = useState('driver');
    const [ isSelect, setSelect ] = useState([false, true]) // 0 인덱스 드라이버, 1 인덱스 패신저 
    const [ studentNumber, SetStudentNumber ] = useState(""); // 학번
    const [ department, SetDepartment ] = useState(""); // 학과
    const [ nickname, SetNickname ] = useState(""); // 성명
    //const [ keyword, setKeyword ] = useState(""); // 키워드

    // userInfoDoc변수에 UserInfo 기본데이터를 선언한다.
    const pesingerData = UserInfo.UserInfo[0];

    let readDoc = {}; // firebase에서 읽어온 데이터를 선언 할 변수이다.
    
    let userInfoDatas = [];

    // firebase db 회원정보 불러오기, 로그인 기능 포함
    async function  Read() {
    // 회원정보 문서 db 불러오기
        const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 
    
        const docSnap =  await getDoc(myDoc);
    
        
        if (docSnap.exists()) {
            readDoc = docSnap.data();
            PesingerInfoDatas = readDoc.PesingerInfo;
            console.log("회원정보 데이터들 : ", PesingerInfoDatas);
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
    // 회원가입 버튼 클릭했을때 호출 하는 함수.
    // Firebase UserInfo 문서에 회원정보 기본데이터를 생성할려고 한다.

    const PesingerInfoCreate = () => {
        pesingerData.nickname = nickname; // 성명
        pesingerData.student_number = studentNumber; // 학번
        pesingerData.department = department; // 학과
        //pesingerData.keyword = keyword;

        // myDoc 변수는 컬랙션 아디이 경로에 문서 아이디(UserInfo)로 가르킨다.
        // doc(firebase경로, 컬렉션 아이디, 문서 아이디)
        const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 
        if (nickname != "" && studentNumber != "" && department != "") {
            
            setDoc(myDoc, {"PesingerInfo": arrayUnion(pesingerData)}, {merge: true})
            .then(() => {
                // 회원가입 성공 할 경우 실행한다.
                alert("Successed Sign Up");

                // 회원 정보 입력 다했으므로 원래대로 초기화 해야한다.
                // 학번, 비밀번호, 학년, 학과 등등 공백으로 선언
                SetStudentNumber(""); 
                SetDepartment("");
                SetNickname("");
                Read();
                // 회원가입 성공하면 학번로그인 페이지로 넘어가주는 부분
                navigation.navigate("StudendNumberLoginScreen");
            })
            .catch((error) => alert(error.messeage)); 
        } else {
            alert("입력을 안한 항목이 있습니다.");
        }

    };


    // 드라이버 버튼 클릭 하면 패신저 버튼은 회색으로 변경 해주는 메소드.
    const DriverColorChagneBtn = () => {
        if (isSelect[0] === true) {
            return '#315EFF';
        } else {
            return '#E7E7E7';
        }
    }
    const PesingerColorChangeBtn = () => {
        if (isSelect[1] === true) {
            return '#315EFF';
        } else {
            return '#E7E7E7';
        }
    }
    const DriverBtn = () => {
        return (
          <Pressable
            style={[{width: 140, height: 55, borderRadius: 29, justifyContent: 'center', alignItems: 'center', marginRight: 20},
              {backgroundColor: DriverColorChagneBtn()},
            ]}
            onPress={() => {
              setSelect([true,false]);
              setButton('driver');
            }}>
            <Text style={{color: isSelect[0] === true ? 'white' : 'gray', fontWeight: 'bold'}}>드라이버</Text>
          </Pressable>
        );
    };
    const PesingerBtn = () => {
        return (
          <Pressable
            style={[{width: 140, height: 55, borderRadius: 29, justifyContent: 'center', alignItems: 'center', marginRight: 20},
              {backgroundColor: PesingerColorChangeBtn()},
            ]}
            onPress={() => {
              setSelect([false, true]);
              setButton('pesinger');
            }}>
            <Text style={{color: isSelect[1] === true ? 'white' : 'gray', fontWeight: 'bold'}}>패신저</Text>
          </Pressable>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.title_text}>MATE 회원가입</Text>
                </View>
            </View>

            <ScrollView style={styles.inputContainer}>
                <View>
                    <Input
                        placeholder='성명을 입력해 주세요'
                        label="성명"
                        leftIcon={{ type: 'material', name: 'school'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
                        value={nickname}
                        onChangeText={Text => SetNickname(Text)}
                    />

                    <Input
                        placeholder='학번을 입력해 주세요'
                        label="학번"
                        leftIcon={{ type: 'material', name: 'school'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
                        value={studentNumber}
                        onChangeText={Text => SetStudentNumber(Text)}
                    />

                 
                    {button === 'pesinger' ? <Input placeholder='학과를 입력해 주세요' label="학과" leftIcon={{ type: 'material', name: 'school'}} value={department} onChangeText={Text => SetDepartment(Text)}/> : null}

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        {DriverBtn()}
                        {PesingerBtn()}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.button_container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        PesingerInfoCreate();
                    }}
                > 
                    <View>
                        <Text style={{color: '#FFFFFF', fontSize: 24}}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            
        },
        header: {
            flex: 0.2,
            backgroundColor: '#315EFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 30,
        },

        title: {

        },

        title_text: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },

        inputContainer: {
            flex: 1,
            marginTop: 10,
        },

        button_container: {
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            backgroundColor: '#315EFF',
            paddingHorizontal: 60,
            paddingVertical: 10,
            borderRadius: 10,
        }

    }
);