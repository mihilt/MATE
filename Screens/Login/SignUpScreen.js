import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Dimensions, TextInput, Alert } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAvoidingView } from "react-native";
// firebase Storage 불러오기
import { getStorage, ref, uploadBytes } from "firebase/storage";
// 아이콘
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg";
// 폰트
import { useFonts, NotoSansKR_400Regular, NotoSansKR_500Mediu, NotoSansKR_100Thin, NotoSansKR_300Light, NotoSansKR_500Medium, NotoSansKR_700Bold, NotoSansKR_900Black, } from "@expo-google-fonts/noto-sans-kr";
import axios from "axios";

export default function SignUpScreen({navigation, route}) {
    
    // 이름, 학번, 학과 state
    const [ name, setName ] = useState("");
    const [ studentId, setStudentId ] = useState("");
    const [ department, setDepartment ] = useState("");

    // 등교 데이터 state
    const [ goingSchoolDays, setGoingSchoolDays ] = useState([]);
    const days = ["월", "화", "수", "목", "금"];

    // 드라이버 패신저 state
    const [ selectDriverPesinger, setSelectDriverPesinger ] = useState(["패신저"]);
    const selectDriverPesingerList = ["드라이버", "패신저"];

    // 이미지 state
    const [image, setImage] = useState(null);
    const [ uploading, setUploading ] = useState(false);

    // useRef 
    const studentIdRef = useRef("");
    const departmentRef = useRef("");
    const goingSchoolDaysRef = useRef([]);
    const authRef = useRef("");
    const profileImgUriRef = useRef("");

    // 회원정보 객체 state
    const [ userData, setUserData ] = useState(route.params.data);


    // 다음 버튼 state
    const [ nextButton, setNextButton ] = useState(false);

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    
    // 폰트 설정
    let [ fontLoaded ] = useFonts({
        NotoSansKR_500Medium,
        NotoSansKR_400Regular,
        NotoSansKR_700Bold,
        NotoSansKR_900Black,
      });
  
    if (!fontLoaded) {
        return null;
    }

    const onSignUp = async () => {         
        const storage = getStorage();

        const response = await fetch(image);

        //const mountainsRef = ref(storage, String(image));
        uploadImage();        
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
          user.profileImageURI = result.uri;
          profileImgUriRef.current = result.uri;
          setUserData(prev => (
            {...prev, ["profileImageURI"]: result.uri}
        ))
        
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

    // 회원정보 입력 핸들러
    const onChangeTextName = (text) => {
        setName(text);
        setUserData(prev => (
            {...prev, ["member_name"]: text}
        ));        
    }

    const onChangeTextStudentId = (text) => {
        setStudentId(text);
        setUserData(prev => (
            {...prev, ["student_id"]: text}
        ));
        
    }

    const onChangeTextDepartment = (text) => {
        setDepartment(text);
        setUserData(prev => (
            {...prev, ["department"]: text}
        ));
        
        
    }

    // Alert
    const completeAlert = () => Alert.alert(
        "입력하신 정보가 정확한가요?", 
        `한번 입력하신 정보는 수정 및 변경 불가합니다.정확히 확인 후 입력해주세요!`,
        [
            {
                text: '수정',
                style: 'destructive',
            },
            {
                text: '확인',
                onPress: () => {
                    setNextButton(true);
                },
                style: 'defalut'
            }
        ],
        { cancelable: false }
    );

    const failAlert = () => Alert.alert(
        "입력 안한 항목이 있습니다.", 
        `이름, 학번, 학과 입력했는지${'\n'}확인 하시길 바랍니다.`,
        [
            {
                text: '확인',              
                style: 'default'
            }
        ],
        { cancelable: false }
    );

    return (
        <View          
            style={{flex: 1, backgroundColor: "#F5F5F5"}}
        >
            {
                (
                    () => {
                        if (nextButton === false) {
                            return (
                                <View style={styles.container}>
                                    <View style={[styles.header, {justifyContent: 'flex-end'}]}>                                        
                                        <View style={{marginLeft: 5}}>
                                            <Text style={{fontSize: 18, fontFamily: 'NotoSansKR_700Bold'}}>아래에 정보를 입력해주세요</Text>
                                        </View>
                                    
                                    </View>
                                    <View style={{flex: deviceHeight < 700 ? 1 : 0.6 }}>                                        
                                        <View style={{marginLeft: 5, marginTop: 30}}>                                               
                                            <TextInput 
                                                value={name}
                                                onChangeText={(text) => onChangeTextName(text)}
                                                placeholder="이름"
                                                placeholderTextColor={"#2E2E2E"}
                                                borderBottomColor="#D9D9D9"
                                                style={{width: "50%", paddingBottom: 13, marginBottom: 20, borderBottomWidth: 1}}
                                            />
                                            <TextInput 
                                                value={studentId}
                                                onChangeText={(text) => onChangeTextStudentId(text)}
                                                placeholder="학번"
                                                placeholderTextColor={"#2E2E2E"}
                                                borderBottomColor="#D9D9D9"
                                                style={{width: "50%", paddingBottom: 13, marginBottom: 20, borderBottomWidth: 1}}
                                            />
                                            <TextInput 
                                                value={department}
                                                onChangeText={(text) => onChangeTextDepartment(text)}
                                                placeholder="학과"
                                                placeholderTextColor={"#2E2E2E"}
                                                borderBottomColor="#D9D9D9"
                                                style={{width: "50%", paddingBottom: 13, marginBottom: 20, borderBottomWidth: 1}}
                                            />                                            
                                        </View>
                                    </View>                                        
                                    <View style={styles.footer}>
                                        <View style={styles.button_container}>
                                            <TouchableOpacity 
                                                style={styles.button_container_next_button}
                                                onPress={() => {                                                    
                                                    // 학번, 학과, 이름 입력 했는지 검증
                                                    
                                                    if (studentId.length >= 9 && department.length > 0 && name.length >= 2 ) {
                                                        completeAlert();      
                                                        console.log("확인 : ", userData);                                                          
                                                    } else {
                                                        
                                                        failAlert();                    
                                                    }
                                                    
                                                    /*
                                                    const res = await axios.post(`http://3.37.159.244:8080/member/new`, {                                                                    
                                                        EMAIL: route.params.kakao_account.email,
                                                        STUDENT_ID: studentIdRef.current,
                                                        DEPARTMENT: departmentRef.current,
                                                        GOING_TO_SCHOOL_DAYS: goingSchoolDays.current,
                                                        AUTH: authRef.current,
                                                        PROFILE_IMAGE: profileImgUriRef.current,
                                                });          
                                                */
                                                    //navigation.navigate("Main", userData);                        
                                                }}
                                            >
                                                <Text style={{color: '#FFFFFF', fontFamily: 'NotoSansKR_700Bold', fontSize: 23}}>다음</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.container}>
                                    <View style={[styles.header, {justifyContent: 'flex-end'}]}>
                                        <TouchableOpacity 
                                            onPress={() => setNextButton(false)}
                                            style={{width: 35, height: 35, justifyContent: 'center',alignItems: 'center'}}
                                        >                        
                                            <AntDesign name="left" size={25} color="black" />                        
                                        </TouchableOpacity>
                                        <View style={{marginLeft: 5, justifyContent: 'center'}}>
                                            <Text style={{fontSize: 18, fontFamily: 'NotoSansKR_700Bold'}}>아래에 정보를 입력해주세요</Text>
                                        </View>
                                    
                                    </View>
                                    <View style={{flex: deviceHeight < 700 ? 1 : 0.6 }}>
                                        <View>                                    
                                            <View style={{alignItems: 'center'}}>
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
                                                                            user.auth = prev[0];     
                                                                            authRef.current = prev[0];  
                                                                            setUserData(data => (
                                                                                {...data, ["auth"]: prev[0]}
                                                                            ));                                                
                                                                            return prev;
                                                                        });
                                                                    }} 
                                                                    style={isSelected ? styles.select_container_active_btn : styles.select_container_non_active_btn}
                                                                >
                                                                    <Text style={isSelected ? {color: '#FFFFFF', fontFamily: 'NotoSansKR_700Bold'} : {color: '#007AFF', fontFamily: 'NotoSansKR_700Bold'}}>{selectData}</Text>
                                                                </TouchableOpacity>
                                                            );
                                                        })
                                                    }
                                                </View>
                                            </View>                        
                                            <View style={{marginTop: 12, marginLeft: 12}}>
                                                <Text style={{fontSize: 10, color: "#989595", fontFamily: 'NotoSansKR_400Regular'}}>카풀에 운행 가능한 차량이 있다면 ‘드라이버’를 선택해 주세요</Text>
                                            </View>
                                            <View style={styles.profile_container}>
                                            <TouchableOpacity
                                                onPress={pickImage}
                                                style={styles.profile_container_input}
                                            >
                                                {!image&& (
                                                    <Svg
                                                        width={60}
                                                        height={60}
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        
                                                        >
                                                        <Path
                                                            d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30Z"
                                                            fill="#D9D9D9"
                                                        />
                                                        <Path
                                                            d="M39.45 20.95c0 5.494-4.455 9.949-9.95 9.949-5.495 0-9.95-4.455-9.95-9.95 0-5.495 4.455-9.949 9.95-9.949 5.495 0 9.95 4.454 9.95 9.95ZM45.505 42.579c0 5.495-7.166 6.92-16.005 6.92-8.84 0-16.006-1.425-16.006-6.92s7.166-9.95 16.006-9.95 16.005 4.455 16.005 9.95Z"
                                                            fill="#fff"
                                                        />
                                                        <Path d="M60 50.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" fill="#007AFF" />
                                                        <Path
                                                            d="M51.88 53.68h1.308v-2.544h2.424v-1.26h-2.424V47.32H51.88v2.556h-2.424v1.26h2.424v2.544Z"
                                                            fill="#fff"
                                                        />
                                                    </Svg>
                                                )}
                                                {image && <Image source={{ uri: image }} style={{ width: 60, height: 60, borderRadius: 50 }} />}
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{marginLeft: 5}}>                                                                                   
                                            <View>
                                                <Text>요일</Text>
                                                <Text style={styles.message_container_text}>9시까지 학교에 가야하는 날을 모두 선택해 주세요</Text>
                                            </View>                       
                                            
                                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: Platform.OS === "ios" ? 44 : 0}}>
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
                                                                                {...data, ["member_timetable"]: prev}
                                                                            ))
                                                                            
                                                                            //console.log("등교일 입력후 userData 현황 : ", userData)
                                                                        }
                                                                        user.goingSchoolDays = prev;
                                                                        goingSchoolDaysRef.current = prev;
                                                                        return prev;                                        
                                                                    });
                                                                }}
                                                                style={{ backgroundColor: isSelected ? "#007AFF" : "#FFFFFF", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: isSelected ? 50 : 0}}                                                        
                                                            >
                                                                
                                                                <Text style={{color: isSelected ? "#FFFFFF" : "#989595", fontFamily: isSelected ? "NotoSansKR_700Bold" : "NotoSansKR_400Regular"}}>{day}</Text>                                    
                                                            </TouchableOpacity>                                    
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>                                        
                                    <View style={styles.footer}>
                                        <View style={styles.button_container}>
                                            <TouchableOpacity 
                                                style={styles.button_container_next_button}
                                                onPress={async () => {
                                                    // 학번, 학과, 등교일 입력 했는지 검증
                                                    if (goingSchoolDays.length > 0 ) {                                                                               
                                                        console.log("meber/new 경로로 서버에게 전송 : ", userData);
                                                        if (true) {
                                                            alert("회원가입 성공 하였습나다.");                                                        
                                                            navigation.navigate("Main", userData);
                                                        }
                                                    }
                                                    
                                                    /*
                                                    const res = await axios.post(`http://3.37.159.244:8080/member/new`, {                                                                    
                                                        EMAIL: route.params.kakao_account.email,
                                                        STUDENT_ID: studentIdRef.current,
                                                        DEPARTMENT: departmentRef.current,
                                                        GOING_TO_SCHOOL_DAYS: goingSchoolDays.current,
                                                        AUTH: authRef.current,
                                                        PROFILE_IMAGE: profileImgUriRef.current,
                                                });          
                                                */
                                                    //navigation.navigate("Main", userData);                        
                                                }}
                                            >
                                                <Text style={{color: '#FFFFFF', fontFamily: 'NotoSansKR_700Bold', fontSize: 23}}>완료하기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    }               
                    
                )()
            }
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#FFFFFF'
        },
        
        header: {
            flex: 0.2,           
        
        },

        title_container: {
            marginTop: 10,
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

        select_container: {
            borderColor: '#007AFF',
            borderWidth: 1,
            width: 312,
            height: 50,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
        },

        select_container_active_btn: {
            width: 156,
            height: 50,
            backgroundColor: '#007AFF',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#d9d9d9',
        },

        select_container_non_active_btn: {
            width: 156,
            height: 50,
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
            width: 60,
            height: 60,
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
            flex: 0.18,            
        },

        message_container: {
          justifyContent: 'flex-end',
          paddingBottom: 20,
          marginTop: 5,
          
        },

        message_container_text: {
            fontSize: 10,
            marginTop: 10, 
            color: "#989595",
            fontFamily: 'NotoSansKR_400Regular',
        },


        button_container: {
            flex: 0.3,
            justifyContent: 'center',
            marginBottom: 10,
        },

        button_container_next_button : {
            backgroundColor: '#007AFF',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        }
    }
);