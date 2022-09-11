// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, StyleSheet, TouchableOpacity, TextInput, } from "react-native";
import React, { useState, useEffect, useRef } from 'react';


// firebase cloud db 경로 불러오기
import { db, auth } from '../../Database/DatabaseConfig/firebase';

// firebase doc 읽기, 생성, 업로드 관련 모듈 불러오기
import { collection, getDocs } from 'firebase/firestore';

import { KeyboardAvoidingView } from "react-native";

// firebase Auth 불러오기
import { onAuthStateChanged } from 'firebase/auth';

// 아이콘
import { AntDesign } from '@expo/vector-icons';

export default function SignUpScreen({navigation}) {
    
    const EMAiL = "email";
    const PASSWORD = "pwd";
    const DEPARTMENT = "department";
    const STUDENT_ID = "studentId";
    const NAME = "name";
    const PHONE_NUMBER = "phoneNumber";
    const SELECT_DRIVER_PENSINGER = "selectDriverPensinger";
    const GOING_SCHOOL_DAYS = "goingSchoolDays";

    const [ userData, setUserData ] = useState({
        email: "",
        pwd: "",
        department: "",
        studentId: "",
        name: "",
        phoneNumber: "",
        selectDriverPensinger: "드라이버",
        goingSchoolDays: [],
        startPoint : "",
        endPoint: "",
        startPointSubAddress: "",
        endPointSubAddress: "",
        profileURI: "",
    });
    
    const [ authData, setAuthData ] = useState();

    //const [ sign, setSign ] = useState("false");
    const sign = useRef(false);

    //const [ validationText, setValidationText ] = useState("");
    const validationText = useRef("");

    const [ userDataStore, setUserDataStore ] = useState([]);

    useEffect(async () => {

        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
            console.log("SignUpScreen : ", user);
            setAuthData(user);
            } else {
            console.log("user data 없음");
            }
        });

        await getUserDatas();
        
    }, []);

    // DB에서 UserDatas를 불러온다. 없으면 
    const getUserDatas = async () => {
        const datas = await getDocs(collection(db, "UserDatas"));

        datas.forEach(document => {

            const userObj = {
                ...document.data()
            };

            setUserDataStore((prev) => [userObj, ...prev]);
        });

    }


    // 이벤트 핸들러
    const onInupUserInfoData = (target, data) => {
        if (target === EMAiL) {
            setUserData((prev) => {
                return {
                    ...prev,
                    [target]: data
                }
            });
            console.log(userData);
        } else if (target === PASSWORD) {
            setUserData((prev) => {
                return {
                    ...prev,
                    [target]: data
                }
            });

        } else if (target === DEPARTMENT) {
            setUserData((prev) => {
                return {
                    ...prev,
                    [target]: data
                }
            });

        } else if (target === STUDENT_ID) {
            setUserData((prev) => {
                return {
                    ...prev,
                    [target]: data
                }
            });

        } else if (target === NAME) {
            setUserData((prev) => {
                return {
                    ...prev,
                    [target]: data
                }
            });

        } else if (target === PHONE_NUMBER) {
            setUserData((prev) => {
                return {
                    ...prev,
                    [target]: data
                }
            });
        } 
    }

    // validation
    const validation = () => {
        console.log("validation : ", userDataStore);
        
        // 원정보들을 입력 해야 화원 검증 실행한다.
        if ( userData.studentId !== "" && userData.email !== "" && userData.department !== "" && userData.phoneNumber !== "" && userData.pwd !== "" && userData.name !== "") {
            if (userDataStore.length !== 0) {
                userDataStore.map((data) => {
                    console.log("validation map 함수 : ", data);
                if (data.studentId === userData.studentId) {
                    sign.current = false;
                    //setValidationText("이미 가입 하신적 있습니다.");
                    validationText.current = "이미 가입 하신적 있습니다.";
                    //setSign(false);
                } else {
                    sign.current = true;
                    //setSign(true);
                    //setValidationText("회원가입 성공 하였습니다.");
                    validationText.current = "회원가입 성공 하였습니다.";
                }
            });
            } else {
                console.log("Hello")
                sign.current = true;
                //setSign(true);
                //setValidationText("회원가입 성공 하였습니다.");
                validationText.current = "회원가입 성공 하였습니다.";   
            }
        } else {
            sign.current = false;
            //setValidationText("입력 안한 항목이 존재합니다.");
            validationText.current = "입력 안한 항목이 존재합니다.";
        }
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1, backgroundColor: "#F5F5F5", }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ marginTop: 51,}}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("StudendNumberLoginScreen")}
                            style={{width: 35, height: 35, justifyContent: 'center'}}
                        >                        
                            <AntDesign name="left" size={25} color="black" />                        
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepbar_container}>
                        <View style={styles.stepbar_container_first_step}></View>
                        <View style={styles.stepbar_container_second_step}></View>
                    </View>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>아래에 정보를 입력해 주세요</Text>
                    </View>
                </View>
                
                <View style={styles.form}>
                    <View style={styles.form_container}>
                        <TextInput 
                            placeholder="이름"
                            placeholderTextColor={"#000000"}
                            style={styles.form_container_textinput}
                            onChangeText={(data) => onInupUserInfoData(NAME, data)}
                        />
                        <TextInput 
                            placeholder="전화번호"
                            placeholderTextColor={"#000000"}
                            style={styles.form_container_textinput}
                            onChangeText={(data) => onInupUserInfoData(PHONE_NUMBER, data)}
                        />
                        <TextInput 
                            placeholder="이메일"
                            placeholderTextColor={"#000000"}
                            style={styles.form_container_textinput}
                            onChangeText={(data) => onInupUserInfoData(EMAiL, data)}
                        />
                        <TextInput 
                            placeholder="학번"
                            placeholderTextColor={"#000000"}
                            style={styles.form_container_textinput}
                            onChangeText={(data) => onInupUserInfoData(STUDENT_ID, data)}
                        />
                        <TextInput 
                            placeholder="학과"
                            placeholderTextColor={"#000000"}
                            style={styles.form_container_textinput}
                            onChangeText={(data) => onInupUserInfoData(DEPARTMENT, data)}
                        />
                        <TextInput 
                            placeholder="비밀번호"
                            secureTextEntry={true}
                            placeholderTextColor={"#000000"}
                            style={styles.form_container_textinput}
                            onChangeText={(data) => onInupUserInfoData(PASSWORD, data)}
                        />
                    </View>                  
                </View>        
                <View style={styles.footer}>
                    <View style={styles.message_container}>
                        <Text style={styles.message_container_text}>변경할 수 없는 정보입니다.</Text>
                    </View>
                    
                    <View style={styles.button_container}>
                        <TouchableOpacity 
                            style={styles.button_container_next_button}
                            onPress={() => {
                                validation();
                                sign.current ? navigation.navigate("SignUpSecondScreen", userData) : alert(validationText.current)
                            }}
                        >
                            <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>다음</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginLeft: 32,
            marginRight: 32,
        },
        
        header: {
            flex: 0.21,
            justifyContent: 'flex-end',
            justifyContent: 'center',
            marginBottom: 20,
            
        },

        title_container: {
            marginTop: 20,
            justifyContent: 'center',
        },
        title: {
            fontSize: 25,
            fontWeight: "400",
        },

        stepbar_container: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
        },
        
        stepbar_container_first_step: {
            width: 150,
            height: 5.5,
            backgroundColor: '#3B67FF',
        },

        stepbar_container_second_step: {
            width: 150,
            height: 5.5,
            backgroundColor: '#d9d9d9',
        },

        form: {            
            flex: 0.4,
        },

        form_container: {
            flex: 0.9,
            justifyContent: 'space-evenly'
        },

        form_container_textinput : {
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            fontWeight: "400",
            paddingTop: 10,
            paddingBottom: 10,
            
        },

        footer: {
            flex: 0.2,
        },

        message_container: {
          flex: 0.3,
          justifyContent: 'flex-end',
          paddingBottom: 20,
        },

        message_container_text: {
            fontSize: 10,
            color: "#989595",
        },


        button_container: {
            flex: 0.3,
            justifyContent: 'center',
            marginBottom: 10,
        },

        button_container_next_button : {
            backgroundColor: '#3B67FF',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        }

    }
);