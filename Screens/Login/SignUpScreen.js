// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import { Input } from 'react-native-elements';
import React, { useState } from 'react';

// 회원정보 기본데이터 불러오기
import { UserInfo } from '../../Database/Data/User/userInfo';

// firebase cloud db 경로 불러오기
import { db } from '../../Database/DatabaseConfig/firebase';

// firebase doc 읽기, 생성, 업로드 관련 모듈 불러오기
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function SignUpScreen({navigation}) {
    
    const [ studentNumber, SetStudentNumber ] = useState(""); // 학번
    const [ password, SetPassword ] = useState(); // 비밀번호
    const [ grade, SetGrade ] = useState(); // 학년
    const [ department, SetDepartment ] = useState(""); // 학과
    const [ nickname, SetNickname ] = useState(""); // 성명
    const [ residence, SetResidence ] = useState(""); // 거주지
    const [ email, SetEmail ] = useState(""); // 계정

    // userInfoDoc변수에 UserInfo 기본데이터를 선언한다.
    const userInfoDoc = UserInfo.UserInfo[0];

    // 회원가입 버튼 클릭했을때 호출 하는 함수.
    // Firebase UserInfo 문서에 회원정보 기본데이터를 생성할려고 한다.

    const UserInfoCreate = () => {
        userInfoDoc.nickname = nickname; // 성명
        userInfoDoc.student_number = studentNumber; // 학번
        userInfoDoc.department = department; // 학과
        userInfoDoc.grade = grade; // 학년
        userInfoDoc.email = email; // 계정
        userInfoDoc.residence = residence; // 거주지
        userInfoDoc.password = password; // 비밀번호

        // myDoc 변수는 컬랙션 아디이 경로에 문서 아이디(UserInfo)로 가르킨다.
        // doc(firebase경로, 컬렉션 아이디, 문서 아이디)
        const myDoc = doc(db, 'CollectionNameCarpoolTicket', 'UserInfo'); 

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
            SetEmail("");

            // 회원가입 성공하면 학번로그인 페이지로 넘어가주는 부분
            navigation.navigate("StudendNumberLoginScreen");
        })
        .catch((error) => alert(error.messeage));


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
                    
                    <Input
                        placeholder='거주지를 입력해 주세요'
                        label="거주지"
                        leftIcon={{ type: 'material', name: 'home'}} 
                        value={residence}
                        onChangeText={Text => SetResidence(Text)}
                    />
                    <Input
                        placeholder='계정을 입력해 주세요'
                        label="계정"
                        leftIcon={{ type: 'material', name: 'email'}} 
                        value={email}
                        onChangeText={Text => SetEmail(Text)}
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