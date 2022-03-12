// 모듈 불러오는 부분
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
// 아이콘(원격주소) 불러오기
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'; // dropdown 모듈 불러오기
// DB관련
// firebase db를 불러올려고 한다.
import { db } from '../../Database/DatabaseConfig/firebase';
// db 데이터 입출력 API 불러오기
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// 기본 데이터 불러오기 (CarpoolTicket, TexiTicket)
import { CarpoolTicket } from'../../Database/Data/Ticket/carpoolData';
// 회원정보 데이터
import { UserInfo } from'../../Database/Data/User/userInfo';

import Animated from 'react-native-reanimated';
import BottomSheet from '../Modal/BottomSheet';

// 드롭 다운
// 드롭다운 항목들 이다.
const localList = ["경운대", "인동"] // 선택 할 수 있는 지역

// 기본 데이터 선언
// docData : 카풀데이터이며 빈데이터로 구성 되어있다. 
const docData = CarpoolTicket; 

// 회원정보 데이터 (아직 데이터 설계 안되어 있음.)
//const userDocData = UserInfo;

export default function Main({ navigation }) { // 정보 메인 부분
    
    // state 영역
    // 버튼 전체, 카풀, 택시 선택 했는지를 state로 선언 하였다.
    const [ all_selecting, setAllSelect ] = useState(false);
    const [ carpool_selecting, setCarpoolSelect ] = useState(true); // 카풀 선택일때 true, 아니면 false
    const [ taxi_selecting, setTaxiSelect ] = useState(false); //택시 선택일때 true, 아니면 false
    const [ likeButton, setLikeButton ] = useState(0);
    const [ startInputText, setStartInputText ] = useState(''); // 출발지점 입력부분 state 값
    const [ endInputText, setEndInputText ] = useState(''); // 출발지점 입력부분 state 값

    // database state 영역
    // firebase 문서로 부터 데이터를 읽으면 userDoc state에 선언 할려고 한다.
    const [ userDoc, setUserDoc ] = useState(null);

    const [ modalVisible, setModalVisible ] = useState(false);

    const pressButton = () => {
        setModalVisible(true);
    };
    
    /*
    지금은 입력창 대신 드롭다운으로 했으므로 일단은 주석으로 남겼다. 
    // 출발지, 도착지, 닉네임, 학과, 텍스트 받을 state
    const [ arrivalAreaText, setArrivalAreaText ] = useState(""); // 출발지 텍스트
    const [ departAreaText, setDepartAreaText ] = useState(""); // 도착지 텍스트
    const [ nicknameText, setNicknameText ] = useState(""); // 닉네임 텍스트
    const [ departmentText, setDepartmentText ] = useState(""); // 학과 텍스트 
    */

    // useEffect 처음 앱실행 했을때 테이블을 불러온다.
    // useEffect 실행 했을때 티켓 정보들이 나온다.

    useEffect (() => {
        Read(); // Firebase의 문서들을 불러온다.
        selectCarpoolTicket();
        showTaxiTicket();
        console.log("메인 화면 : ", UserInfo.UserInfo[0]);
    },[]);


    const sheetRef = React.useRef(null);


    // Database Read 부분
    const Read = ()  => {
        // Reading Doc
        // doc(firebase 경로, "컬랙션 이름", "문서 이름")
        // myDoc 변수는 firebase CarpoolTicketDocument 문서로 가르켜 준다.

        const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
        //const userInfoDoc = doc(db, "CollectionNameCarpoolTicket", "UserInfo");

        getDoc(myDoc)
        .then((snapshot) => {
          // Read Success
          // You can read what ever document by changing the collection and document path here.
          if (snapshot.exists) { // DataSnapshop은 데이터가 포함되어있으면 true를 반환 해주며, snapshot.data()
            //console.log(snapshot.data());
            setUserDoc(snapshot.data()); // snapshot.data() 호출 되면 CloudDB에 있는 데이터들을 객체로 반환해준다.(console.log(snapshot.data()))
            console.log(snapshot.data());
            
        }
          else {
            alert("No Document");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    
    };

    // 티켓 생성
    const Create = () => {
        if (startInputText != null && endInputText != null) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");

            // 티켓이 아무것도 없을경우 실행
            // userDoc 변수는 firebase 문서의 데이터로 가르키고 있다.
            if (userDoc.Count === 0) {
                // 카풀, 택시 둘중 하나가 선택일 경우 그중 하나를 티켓이름으로 정한다.
                if (carpool_selecting === true) {
                    docData.CarpoolTicket[0].ticket_name = "카풀";
                }
                else {
                    docData.CarpoolTicket[0].ticket_name = "택시";
                }
                docData.CarpoolTicket[0].nickname = "Son";
                docData.CarpoolTicket[0].department = "항공소프트웨어공학과"
                docData.CarpoolTicket[0].arrival_area = startInputText; // 출발지
                docData.CarpoolTicket[0].depart_area = endInputText; // 도착지
                docData.CarpoolTicket[0].departure_time = "09:30";
                docData.CarpoolTicket[0].day = "2022/02/22";
                docData.CarpoolTicket[0].carpool_id += 1;
                docData.CarpoolTicket[0].recruitment_count += 1;
                docData.Count = userDoc.Count + 1;

                setDoc(myDoc, docData, {merge: true})
                .then(() => {
                    alert("Successed Make a Ticket");
                })
                .catch((error) => {
                    alert(error.messeage);
                });
            }
            else {
                Read();
                if (carpool_selecting === true) {
                    docData.CarpoolTicket[0].ticket_name = "카풀";
                    docData.CarpoolTicket[0].nickname = UserInfo.UserInfo[0].nickname; // 닉네임
                    docData.CarpoolTicket[0].department = UserInfo.UserInfo[0].department // 학과
                    docData.CarpoolTicket[0].arrival_area = startInputText; // 출발지
                    docData.CarpoolTicket[0].depart_area = endInputText; // 도착지
                    docData.CarpoolTicket[0].departure_time = "09:30";
                    docData.CarpoolTicket[0].day = "2022/02/22";
                    docData.CarpoolTicket[0].carpool_id = 1000 + userDoc.Count;
                    docData.CarpoolTicket[0].recruitment_count = 1;
                    docData.Count = userDoc.Count + 1;

                    updateDoc(myDoc, {"CarpoolTicket": arrayUnion(docData.CarpoolTicket[0]), "Count": userDoc.Count}, {merge: true})
                    .then(() => {
                        alert("Successed Update Ticket");
                    })
                    .catch((error) => alert(error.messeage));
                }
                else {
                    docData.CarpoolTicket[0].ticket_name = "택시";
                    docData.CarpoolTicket[0].nickname = UserInfo.UserInfo[0].nickname; // 닉네임
                    docData.CarpoolTicket[0].department = UserInfo.UserInfo[0].department;  // 학과
                    docData.CarpoolTicket[0].arrival_area = startInputText; // 출발지
                    docData.CarpoolTicket[0].depart_area = endInputText; // 도착지
                    docData.CarpoolTicket[0].departure_time = "09:30";
                    docData.CarpoolTicket[0].day = "2022/02/22";
                    docData.CarpoolTicket[0].carpool_id = 1000 + userDoc.Count;
                    docData.CarpoolTicket[0].recruitment_count = 1;
                    docData.Count = userDoc.Count + 1;

                    updateDoc(myDoc, {"TaxiTicket": arrayUnion(docData.CarpoolTicket[0]), "Count": userDoc.Count}, {merge: true})
                    .then(() => {
                        alert("Successed Update Ticket");
                    })
                    .catch((error) => alert(error.messeage));
                }
                
            }

        }
    }

    const all_select = () => { // 전체 선택을 눌렀을 때 호출
        setAllSelect(true);
        setCarpoolSelect(false);
        setTaxiSelect(false);
    };

    const carpool_select = () => { // 카풀 선택 추후 최적화 할 예정 (delay 문제 생김)
        setAllSelect(false);
        setCarpoolSelect(true); 
        setTaxiSelect(false)
    };
    const taxi_select = () => { // 택시 선택
        setAllSelect(false);
        setCarpoolSelect(false);
        setTaxiSelect(true)
    };
    
    // 티켓을 보여주는 부분(Ticket UI)
    function selectCarpoolTicket() {

        if (userDoc != null) {
            return (
                userDoc.CarpoolTicket.map(key => (
                    
                    <View style={styles.ticket_container}> 
                        <View style={styles.ticket_info}>
                            <Image style={styles.info_profile} source={require('../../profile_img1.jpeg')}/>
                            <View style={{marginHorizontal: 10, alignItems: 'center'}}>
                                <Text>{key.nickname}</Text> 
                                <Text style={{fontSize: 8}}>{key.department}</Text>
                            </View>
            
                            <View style={{marginHorizontal: 12, alignItems: 'center'}}>
                                <Text>{key.ticket_name}</Text> 
                                <View style={styles.carpool_pointvar}/>
                            </View>
                
                            <View style={{marginHorizontal: 30, alignItems: 'center'}}>
                                <Text>{key.depart_area}</Text>
                                <Text style={{fontSize: 8}}>09:40</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={styles.info_car_img} source={require('../../car-icon-vector.jpg')}/>
                        </View>
                    </View>
                    
                ))
            );
        }
    }

    const showTaxiTicket = () => {
        if (userDoc != null) {
            return (
                userDoc.TaxiTicket.map(key => (
                    
                    <View style={styles.ticket_container}>
                        <View style={styles.ticket_info}>
                            <Image style={styles.info_profile} source={require('../../profile_img1.jpeg')}/>
                            <View style={{marginHorizontal: 10, alignItems: 'center'}}>
                                <Text>{key.nickname}</Text> 
                                <Text style={{fontSize: 8}}>{key.department}</Text>
                            </View>
                
                            <View style={{marginHorizontal: 12, alignItems: 'center'}}>
                                <Text>{key.ticket_name}</Text> 
                                <View style={styles.taxi_pointvar}/>
                            </View>
                
                            <View style={{marginHorizontal :30, alignItems: 'center'}}>
                                <Text>{key.depart_area}</Text>
                                <Text style={{fontSize: 8}}>09:40</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={styles.info_car_img} source={require('../../car-icon-vector.jpg')}/>
                        </View>
                    </View>
                    
                ))
            );
        }
    }
  return (
    <View style={styles.container}>
        {/*Title 부분 */}
        <View style={styles.search}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
                <Text style={styles.text1}>MATE</Text>
                <View style={{flexDirection: 'row'}}>
                    <Fontisto style={styles.bell_icon} name="bell" size={24} color="black" />
                </View>
            </View>

            <View style={{alignItems: 'center', backgroundColor:'white', margin:10, borderRadius: 15, padding: 25, zIndex: 1 }}>
                
                <View style={styles.text_input_container}>
                    
                    <SelectDropdown  // 출발지 드롭다운 버튼
                        data={localList}
                        defaultValue={localList[0]} // 초기값 설정
                        onSelect={(selectedLocal, index) => { // 드롭바 내용선택 하게 되면 요소이름, 인덱스 받을수 있다.
                            console.log(selectedLocal, index);
                        }}
                        buttonTextAfterSelection={(selectedLocal, index) => { // 드롭바 내용선택 하게 되면 요소이름, 인덱스 받을수 있다.
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            
                            setStartInputText(selectedLocal); // 클릭시 출발지점 받음

                            return selectedLocal;
                        }}
                        rowTextForSelection={(local, index) => { // 선택지를 행으로 보여주게 한다.
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return local;
                        }}
                        buttonStyle={{
                            width: 130,
                            borderRadius: 15,
                            backgroundColor: '#FFFFFF'
                        }}
                    />
                    
                    <Fontisto  style={{transform:[{ rotate: '90deg'}], marginLeft: 22}}name="plane" size={24} color="black" />
                    
                    <SelectDropdown // 도착지 드롭다운 버튼
                        data={localList}
                        defaultValue={localList[1]} // 초기값 설정
                        onSelect={(selectedLocal, index) => { // 드롭바 내용선택 하게 되면 요소이름, 인덱스 받을수 있다.
                            console.log(selectedLocal, index);
                        }}
                        buttonTextAfterSelection={(selectedLocal, index) => { // 드롭바 내용선택 하게 되면 요소이름, 인덱스 받을수 있다.
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            
                            setEndInputText(selectedLocal); // 클릭시 도착지점 받음

                            return selectedLocal;
                        }}
                        rowTextForSelection={(local, index) => { // 선택지를 행으로 보여주게 한다.
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return local;
                        }}
                        buttonStyle={
                            {
                                borderRadius: 15,
                                width: 130,
                                marginHorizontal: 10,
                                backgroundColor: '#FFFFFF',
                            }
                        }
                        buttonTextStyle={
                            {
                            }
                        }
                    />
                </View>
            </View>
                
        </View>

        <View style={styles.carpool}>
            <ScrollView horizontal={true}>
                <View style={{alignItems: "center", justifyContent: 'center', flexDirection: "row"}}>
                    {selectCarpoolTicket()}
                </View>
            </ScrollView>
            <ScrollView horizontal={true}>
                <View style={{alignItems: "center", justifyContent: 'center', flexDirection: "row"}}>
                    {showTaxiTicket()}
                </View>
            </ScrollView>
        </View>

        <View style={styles.footer}>
            <Fontisto name="comment" size={24} color="black" style={styles.messege_icon}/>
            
            <Fontisto name="home" size={24} color="black" style={styles.home_icon}/>
            
            <TouchableOpacity onPress={pressButton} >
                <Fontisto name="plus-a" size={24} color="black" style={styles.plus_icon}/>
            </TouchableOpacity>
            
            <Fontisto name="map" size={24} color="black" style={styles.save_icon}/>
            
            <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                <Ionicons name="person-outline" size={24} color="black" style={styles.profile_icon}/>
            </TouchableOpacity>
            
        </View>
        
        <BottomSheet 
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        />
    </View>
  );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    search: {
        flex: 0.3,
        backgroundColor: '#315EFF',
        borderBottomLeftRadius: 40,
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 0
        },
        shadowOpacity: 0.35,
    },
    carpool: {
        flex: 0.7,
        backgroundColor: '#E5E5E5',
        marginTop: 14,
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between',
    
    },
    text1: {
        marginLeft: 15,
        fontSize: 24,
        color: '#315EFF',        
        fontWeight: 'bold',
        marginTop: 47,
        color: '#FFFFFF',
    },
    map_icon: {
        fontSize: 24,
        marginTop: 47,
        color: '#FFFFFF',
        justifyContent: 'space-between',
        marginRight: 20,
    },
    bell_icon: {
        fontSize: 24,
        marginTop: 47,
        color: '#FFFFFF',
        justifyContent: 'space-between',
        marginRight: 42,
    },
    messege_icon: {
        marginLeft: 32,
    },
    home_icon: {
        
    },
    plus_icon: {
        
    },
    save_icon: {
    },
    profile_icon: {
        marginRight: 29,
        
    },
    text_input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 8,
        borderBottomColor: '#C4C4C4',
    },
    input_start: {
        width: 137.5,
        height: 33,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        fontSize: 16,
        marginLeft: 18,
        marginTop: 13.5,
        borderRadius: 8,
    },
    selection_container: {
        
    },
    selection_text: {
        flexDirection: 'row',
        width: 345,
        height: 40,
        margin: 5,
    },
    status_bar: {
        width: 47.75,
        height: 3.72,
        backgroundColor: '#315EFF',
        marginTop: 5.95,
    
        
    },
    
    selection_text_all: {
       marginLeft: 50,
    },

    selection_text_carpool: {
        marginLeft: 50,
    },
    selection_text_taxi: {
        marginLeft: 50,
    },
    
    carpool_text: {
        paddingHorizontal: 30.3,
        paddingVertical: 10.3,
        backgroundColor: '#FFFFFF',
        marginBottom: 14,
        justifyContent: 'space-between',
        borderWidth: 1,
        marginLeft: 6,
        marginRight: 6,
        borderRadius: 18,
       
    },
    info_text1: {
        
        marginTop: 11,
        marginLeft: 14.12,
    },
    info_text2: {
        marginTop: 5,
        marginLeft: 14.12,
        fontSize: 8,
    },
    info_profile: {
        resizeMode: 'stretch', 
        width: 33.8, 
        height: 35.2, 
        borderRadius: 25, 
        
    },
    info_text_container: {
        flexDirection: 'column',
        
    },
    info_carpool_container: {
        marginTop: 14,
        width: 65,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
     
    },
    info_carpool_text: {
        fontSize: 18,
    },
    carpool_pointvar: {
        backgroundColor: '#315EFF',
        width: 47,
        height: 4.09,
        marginTop: 6.17,
        borderRadius: 10,
    },
    taxi_pointvar: {
        backgroundColor: '#90EE90',
        width: 47,
        height: 4.09,
        marginTop: 6.17,
        borderRadius: 10,
    },
    info_text_local: {
        
        width: 65,
        height: 15.4,
        marginTop: 11,
        marginLeft: 14.12,
        color: '#B9696D',

    },
    info_time_text: {
        width: 40,
        height: 11,
        fontSize: 11,
        marginLeft: 17.12,
        marginTop: 6.6,

    },

    info_car_img: {
        resizeMode: 'stretch', 
        width: 200.8, 
        height: 130.2, 
    },

    count_container: {
        width: 32,
        height: 35,
        backgroundColor: '#315EFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 11,
        marginLeft: 25,
        marginRight: 20,
        
    },
    ticket_container: {
        backgroundColor: "#FFFFFF", 
        width: 340, 
        marginLeft: 8, 
        borderWidth: 1, 
        borderRadius: 15,
    },
    ticket_info: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});