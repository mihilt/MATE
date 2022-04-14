// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
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
    
    const [ studentNumber, SetStudentNumber ] = useState(""); // 학번
    const [ password, SetPassword ] = useState(); // 비밀번호
    const [ grade, SetGrade ] = useState(); // 학년
    const [ department, SetDepartment ] = useState(""); // 학과
    const [ nickname, SetNickname ] = useState(""); // 성명
    const [ residence, SetResidence ] = useState(""); // 거주지
    const [ keyword, setKeyword ] = useState(""); // 키워드

    // userInfoDoc변수에 UserInfo 기본데이터를 선언한다.
    const userInfoDoc = UserInfo.UserInfo[0];

    let readDoc = {}; // firebase에서 읽어온 데이터를 선언 할 변수이다.
    
    let userInfoDatas = [];

    // residenct 거주지 목록들이다. ex) 인동, 옥계, 기숙사
    const residence_list = [ '인동', '옥계', '기숙사' ];

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
    // 회원가입 버튼 클릭했을때 호출 하는 함수.
    // Firebase UserInfo 문서에 회원정보 기본데이터를 생성할려고 한다.

    const UserInfoCreate = () => {
        userInfoDoc.nickname = nickname; // 성명
        userInfoDoc.student_number = studentNumber; // 학번
        userInfoDoc.department = department; // 학과
        userInfoDoc.grade = grade; // 학년
        userInfoDoc.residence = residence; // 거주지
        userInfoDoc.password = password; // 비밀번호
        userInfoDoc.keyword = keyword;

        // myDoc 변수는 컬랙션 아디이 경로에 문서 아이디(UserInfo)로 가르킨다.
        // doc(firebase경로, 컬렉션 아이디, 문서 아이디)
        const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 
        if (nickname != "" && studentNumber != "" && department != "" && grade != "" && residence != "" && password != "") {
            if (password.length >= 8) {
                setDoc(myDoc, {"UserInfo": arrayUnion(userInfoDoc)}, {merge: true})
                .then(() => {
                    // 회원가입 성공 할 경우 실행한다.
                    alert("Successed Sign Up");

                    // 회원 정보 입력 다했으므로 원래대로 초기화 해야한다.
                    // 학번, 비밀번호, 학년, 학과 등등 공백으로 선언
                    SetStudentNumber(""); 
                    SetPassword(0);
                    SetGrade(0);
                    SetDepartment("");
                    SetNickname("");
                    SetResidence("");
                    setKeyword("");
                    Read();
                    // 회원가입 성공하면 학번로그인 페이지로 넘어가주는 부분
                    navigation.navigate("StudendNumberLoginScreen");
                })
                .catch((error) => alert(error.messeage));
            } else {
                alert("비밀번호 8글자 이상.");
            }
            
        } else {
            alert("입력을 안한 항목이 있습니다.");
        }


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

                    <Input
                        placeholder='학년을 입력해 주세요'
                        label="학년"
                        leftIcon={{ type: 'material', name: 'school'}}   //name: 에 알맞는 명령어 입력시 아이콘 변경됨
                        value={grade}
                        onChangeText={Text => SetGrade(Text)}
                    />
                    
                    <Input
                        placeholder='학과를 입력해 주세요'
                        label="학과"
                        leftIcon={{ type: 'material', name: 'school'}} 
                        value={department}
                        onChangeText={Text => SetDepartment(Text)}
                    />

                    <Input
                        placeholder='비밀번호를 입력해 주세요'
                        label="비밀번호"
                        leftIcon={{ type: 'material', name: 'lock'}} 
                        value={password}
                        onChangeText={Text => SetPassword(Text)}
                        secureTextEntry //글자를 ***로 변경해줌

                    />
                    <View>
                        <Text style={{marginLeft: 10, fontSize: 16, color: 'grey'}}>거주지</Text>
                        <View style={{marginLeft: 10}}>
                            <SelectDropdown 
                                data={residence_list}
                                defaultButtonText={"거주지 선택하시오.(인동, 옥계, 기숙사)"}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    SetResidence(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                                buttonStyle={{width: 355}}
                            />
                        </View>
                    </View>

    
                    <Input
                        placeholder='키워드를 입력해 주세요'
                        label="키워드"
                        leftIcon={{ type: 'material', name: 'email'}} 
                        value={keyword}
                        onChangeText={Text => setKeyword(Text)}
                    />
                </View>
            </ScrollView>

            <View style={styles.button_container}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={UserInfoCreate}
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