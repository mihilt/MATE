// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image} from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
// firebase cloud db 경로 불러오기
import { db, auth } from '../../Database/DatabaseConfig/firebase';

// firebase doc 읽기, 생성, 업로드 관련 모듈 불러오기
import { collection, addDoc, getDocs  } from 'firebase/firestore';

import { KeyboardAvoidingView } from "react-native";

// firebase Auth 불러오기
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// firebase Storage 불러오기
import { getStorage, ref, uploadBytes } from "firebase/storage";

// 아이콘
import { AntDesign } from '@expo/vector-icons';


export default function SignUpSecondScreen({navigation, route}) {
    
    const EMAiL = "email";
    const PASSWORD = "pwd";
    const DEPARTMENT = "department";
    const STUDENT_ID = "studentId";
    const NAME = "name";
    const PHONE_NUMBER = "phoneNumber";
    const SELECT_DRIVER_PENSINGER = "selectDriverPensinger";
    const GOING_SCHOOL_DAYS = "goingSchoolDays";
    
    // 등교 데이터 state
    const [ goingSchoolDays, setGoingSchoolDays ] = useState([]);
    const days = ["월", "화", "수", "목", "금"];
    
    const [ authData, setAuthData ] = useState();

    const [ userSignUpData, setUserSignUpData ] = useState();

    //const [ sign, setSign ] = useState("false");
    const sign = useRef(false);

    //const [ validationText, setValidationText ] = useState("");
    const validationText = useRef("");

    const [ userDataStore, setUserDataStore ] = useState([]);

    // 드라이버 패신저 state
    const [ selectDriverPesinger, setSelectDriverPesinger ] = useState(["드라이버"]);
    const selectDriverPesingerList = ["드라이버", "패신저"];

    // 이미지 state
    const [image, setImage] = useState(null);
    const [ uploading, setUploading ] = useState(false);

    // 첫번째 회원페이지 정보를 받아 state 선언
    const [ userData, setUserData ] = useState({});

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
        
        setUserData(route.params);
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

    const onSignUp = async () => {         
        await addDoc(collection(db, "UserDatas"), userData).then(() => alert("회원가입 성공")).catch(err => alert("회원가입 실패"));
        
        const storage = getStorage();

        const response = await fetch(image);

        //const mountainsRef = ref(storage, String(image));
        uploadImage();

        
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


    // 프로필이미지 입력창 클릭시 실행
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
          userData.profileURI = result.uri;
        }
    };

    const uploadImage = async () => {
        setUploading(true);

        //
        const storage = getStorage(); // 자신 firebase storage 경로
        const refs = ref(storage, `images/${userData.studentId}/${userData.name}.jpg`); // firebase storage 경로에 넣을 ref 얻는다.
        console.log("fire storage ref : ", refs);

        // Convert Image to array of bytes.

        const img = await fetch(image);
        const bytes = await img.blob();

        uploadBytes(refs, bytes);
        
        setImage(null);
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1, backgroundColor: "#F5F5F5"}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ marginTop: 51,}}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("SignUpScreen")}
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
                    <View style={styles.select_container}>
                        {
                            selectDriverPesingerList.map(selectData => {
                                const isSelected = selectDriverPesinger.includes(selectData);
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectDriverPesinger(([...prev]) => {
                                                const id = prev.indexOf(selectData)
                                                
                                                prev.splice(id, 1);
                                                prev.push(selectData);
                                                setUserData(data => (
                                                    {
                                                        ...data,
                                                        "selectDriverPensinger": prev[0]
                                                    }
                                                ))                      
                                                return prev;
                                            });
                                        }} 
                                        style={isSelected ? styles.select_container_active_btn : styles.select_container_non_active_btn}
                                    >
                                        <Text>{selectData}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                    <View style={styles.profile_container}>                    
                        <TouchableOpacity onPress={pickImage} style={styles.profile_container_input}>
                            {!image && <Text>이미지 선택</Text>}
                            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                        </TouchableOpacity>
                    </View>

                    
                    <Text>요일</Text>
                    <View style={styles.message_container}>
                        <Text style={styles.message_container_text}>변경할 수 없는 정보입니다.</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flex: 0.35,}}>
                        {
                            days.map((day) => {
                                const isSelected = goingSchoolDays.includes(day);
                                console.log(isSelected);
                                return (                    
                                    <TouchableOpacity
                                        onPress={() => {
                                            setGoingSchoolDays(([...prev]) => {
                                                const id = prev.indexOf(day);
                                                //console.log(id); // 날짜 있으면 id 값이 0, 없으면 -1(등교일 추가).
                                                if (id > -1) {
                                                    prev.splice(id, 1);
                                                } else {
                                                    prev.push(day);
                                                    setUserData(data => (
                                                        {
                                                            ...data,
                                                            "goingSchoolDays": prev
                                                        }
                                                    ))
                                                    
                                                    //console.log("등교일 입력후 userData 현황 : ", userData)
                                                }
                                                return prev;                                        
                                            });
                                        }}
                                        style={{ backgroundColor: isSelected ? "#FFFFFF" : "#d9d9d9", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderColor: isSelected ? "gray" : "", borderWidth: isSelected ? 0.5 : 0}}                                                        
                                    >
                                        
                                        <Text style={{color: isSelected ? "gray" : "black", }}>{day}</Text>                                    
                                    </TouchableOpacity>                                    
                                )
                            })
                        }
                    </View>
                </View>                        
                <View style={styles.footer}>
                    <View style={styles.button_container}>
                        <TouchableOpacity 
                            style={styles.button_container_next_button}
                            onPress={async () => {
                                await createUserWithEmailAndPassword(auth, userData.email, userData.pwd)
                                    .then((data) => { 
                                        setUserSignUpData(data);
                                    })
                                    .catch((err) => console.log("계정 이미 만들어져 있습니다. : ", authData));
                                onSignUp(userSignUpData);
                                navigation.navigate("StudendNumberLoginScreen");
                                // console.log("signup button : ", userData);
                            }}
                        >
                            <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>가입하기</Text>
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
            flex: 0.3,
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
            backgroundColor: '#3B67FF',
        },

        form: {
            marginTop: 25,
            flex: 0.5,
        },

        form_container: {
            flex: 1,
            justifyContent: 'space-evenly',
        },

        select_container: {
            backgroundColor: '#d9d9d9',
            height: 40,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            
        },

        select_container_active_btn: {
            width: 145,
            height: 40,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#d9d9d9',
        },

        select_container_non_active_btn: {
            width: 145,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },

        profile_container: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
        }, 

        profile_container_input: {
            width: 100,
            height: 100,
            backgroundColor: '#d9d9d9',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
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
          justifyContent: 'flex-end',
          paddingBottom: 20,
          marginTop: 5,
          
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