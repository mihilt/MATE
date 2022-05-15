import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
// 아이콘(원격주소)
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//firebase
import { db } from '../../Database/DatabaseConfig/firebase';
import { doc, getDoc } from 'firebase/firestore';
// 회원정보 데이터
import { UserInfo } from'../../Database/Data/User/userInfo';
import { CarpoolTicket } from '../../Database/Data/Ticket/carpoolData';

export default function TicketScreen({navigation})  {
 
      
    useEffect(() => {
        Read();
        ShowRecruitmentList();
        
    }, []);


    /*
    // 데아터 문서 읽어오기
    const Read = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
        
        getDoc(myDoc)
        .then((snapshot) => {
            if (snapshot.exists) {
                
                readUserDoc = snapshot.data();
                console.log("firebase로부터 불러온 회원 정보들 : ", readUserDoc.CarpoolTicket);
                console.log("회원정보 : ", UserInfo.UserInfo[0]);
                readUserDoc = readUserDoc.CarpoolTicket;
                ShowTickets();
            }
        })
        .catch((error) => {
            alert(error.messeage);
        });
    }
    */
   
    // firebase 문서로 부터 데이터를 읽으면 userDoc state에 선언 할려고 한다.
   const [ userDoc, setUserDoc ] = useState([]);

   // Ticket 테이블 읽어서 저장
   let ticektInfos;
   
   const [ arrivalArea, setArrivalArea ] = useState("");
   const [ departArea, setDepartArea ] = useState("");
   const [ openChatName, setOpenChatName ] = useState("");
   const [ openChatPassword, setOpenChatPassword ] = useState("");
   const [ recruitmentOneList, setRescruitmentOneList ] = useState({});
   const [ recruitmentTwoList, setRescruitmentTwoList ] = useState({});
   const [ recruitmentThreeList, setRescruitmentThreeList ] = useState({});
   const [ recruitmentFourList, setRescruitmentFourList ] = useState({});
   const [ driverName, setDriverName ] = useState("");
   const [ driverDepartment, setDriverDepartment ] = useState("");

   //const [nickname, setNickname] = useState("");
   //let recruitmentList;
   
   const Read = ()  => {
    // Reading Doc
    // doc(firebase 경로, "컬랙션 이름", "문서 이름")
    // myDoc 변수는 firebase CarpoolTicketDocument 문서로 가르켜 준다.

        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
        .then((snapshot) => {
            // Read Success
            // You can read what ever document by changing the collection and document path here.
            if (snapshot.exists) { // DataSnapshop은 데이터가 포함되어있으면 true를 반환 해주며, snapshot.data()
                //console.log(snapshot.data());
                setUserDoc(snapshot.data()); // snapshot.data() 호출 되면 CloudDB에 있는 데이터들을 객체로 반환해준다.(console.log(snapshot.data()))
                ticektInfos = snapshot.data();

                if (ticektInfos.CarpoolTicket.length != undefined) {
                    for (let i = 0; i < ticektInfos.CarpoolTicket.length; i++) {
                        if (UserInfo.Driver[0].student_number === ticektInfos.CarpoolTicket[i].student_number && UserInfo.Driver[0].nickname === ticektInfos.CarpoolTicket[i].nickname) {
                            setArrivalArea(ticektInfos.CarpoolTicket[i].arrival_area); // 출발지
                            setDepartArea(ticektInfos.CarpoolTicket[i].depart_area); // 도착지
                            setOpenChatName(ticektInfos.CarpoolTicket[i].open_chat); // 오픈채팅방 이름 
                            setOpenChatPassword(ticektInfos.CarpoolTicket[i].open_chat_password); // 오픈채팅 비밀번호
                            setDriverName(ticektInfos.CarpoolTicket[i].nickname); // 드라이버 이름
                            setDriverDepartment(ticektInfos.CarpoolTicket[i].department); // 드라이버 학과
                        } else {
                            if (ticektInfos.CarpoolTicket[i].pesinger_count > 0) {
                                for (let j = 0; j < ticektInfos.CarpoolTicket[i].pesinger_count; j++) {
                                    if ((ticektInfos.CarpoolTicket[i].pesinger_info[j].student_number === UserInfo.Pesinger[0].student_number) 
                                        && (ticektInfos.CarpoolTicket[i].pesinger_info[j].nickname === UserInfo.Pesinger[0].nickname) ) {
                                            setArrivalArea(ticektInfos.CarpoolTicket[i].arrival_area); // 출발지
                                            setDepartArea(ticektInfos.CarpoolTicket[i].depart_area); // 도착지
                                            setOpenChatName(ticektInfos.CarpoolTicket[i].open_chat); // 오픈채팅방 이름 
                                            setOpenChatPassword(ticektInfos.CarpoolTicket[i].open_chat_password); // 오픈채팅 비밀번호
                                            setDriverName(ticektInfos.CarpoolTicket[i].nickname); // 드라이버 이름
                                            setDriverDepartment(ticektInfos.CarpoolTicket[i].department); // 드라이버 학과
                                    }
                                }
                            }
                        }
                    }
                }
                

            } else {
                alert("No Document");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    const ShowRecruitmentList = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
        .then((snapshot) => {
            // Read Success
            // You can read what ever document by changing the collection and document path here.
            
            //console.log(snapshot.data());
            ticektInfos = snapshot.data();
            if (ticektInfos.CarpoolTicket.length != undefined) {
                for (let i = 0; i < ticektInfos.CarpoolTicket.length; i++) {
                    if (UserInfo.Driver[0].student_number === ticektInfos.CarpoolTicket[i].student_number && UserInfo.Driver[0].nickname === ticektInfos.CarpoolTicket[i].nickname) {
                        //setNickname(ticektInfos.CarpoolTicket[i].pesinger_info[0].nickname);
                        setRescruitmentOneList(ticektInfos.CarpoolTicket[i].pesinger_info[0]);
                        if (ticektInfos.CarpoolTicket[i].pesinger_count === 2) {
                            setRescruitmentTwoList(ticektInfos.CarpoolTicket[i].pesinger_info[1]);
                        } else if (ticektInfos.CarpoolTicket[i].pesinger_count === 3) {
                            setRescruitmentTwoList(ticektInfos.CarpoolTicket[i].pesinger_info[1]);
                            setRescruitmentThreeList(ticektInfos.CarpoolTicket[i].pesinger_info[2]);
                        } else if (ticektInfos.CarpoolTicket[i].pesinger_count === 4) {
                            setRescruitmentTwoList(ticektInfos.CarpoolTicket[i].pesinger_info[1]);
                            setRescruitmentThreeList(ticektInfos.CarpoolTicket[i].pesinger_info[2]);
                            setRescruitmentFourList(ticektInfos.CarpoolTicket[i].pesinger_info[3]);
                        }
                        
                        
                    } else {
                        if (ticektInfos.CarpoolTicket[i].pesinger_count > 0) {
                            for (let j = 0; j < ticektInfos.CarpoolTicket[i].pesinger_count; j++) {
                                if ((ticektInfos.CarpoolTicket[i].pesinger_info[j].student_number === UserInfo.Pesinger[0].student_number) 
                                    && (ticektInfos.CarpoolTicket[i].pesinger_info[j].nickname === UserInfo.Pesinger[0].nickname) ) {
                                        setRescruitmentOneList(ticektInfos.CarpoolTicket[i].pesinger_info[0]);
                                        if (ticektInfos.CarpoolTicket[i].pesinger_count > 1) {
                                            setRescruitmentTwoList(ticektInfos.CarpoolTicket[i].pesinger_info[1]);
                                        } else if (ticektInfos.CarpoolTicket[i].pesinger_count === 3) {
                                            setRescruitmentTwoList(ticektInfos.CarpoolTicket[i].pesinger_info[1]);
                                            setRescruitmentThreeList(ticektInfos.CarpoolTicket[i].pesinger_info[2]);
                                        } else if (ticektInfos.CarpoolTicket[i].pesinger_count === 4) {
                                            setRescruitmentTwoList(ticektInfos.CarpoolTicket[i].pesinger_info[1]);
                                            setRescruitmentThreeList(ticektInfos.CarpoolTicket[i].pesinger_info[2]);
                                            setRescruitmentFourList(ticektInfos.CarpoolTicket[i].pesinger_info[3]);
                                        }
                                        
                                }
                            }                                 
                        }
                    }
                }
            }
            
        })
        .catch((error) => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.map}>
                    <Text style={styles.mapText}>{arrivalArea}</Text>
                    <AntDesign name="arrowright" size={30} color="black" />
                    <Text style={styles.mapText}>{departArea}</Text>
                </View>

            </View>

            
            
            <View style={styles.body}>
                <View style={styles.chatInfo}>
                    <Text style={styles.chatInfoText}>오픈채팅 : {openChatName}</Text>
                    <Text style={styles.chatInfoText}>비밀번호 : {openChatPassword}</Text>
                </View>
                <View style={styles.userList}>
                    <View style={styles.driverText}>
                        <Text>{driverName}</Text>
                        <Text>{driverDepartment}</Text>
                    </View>
                    <View style={styles.pesingerText}>
                        <Text>{recruitmentOneList.nickname}</Text>
                        <Text>{recruitmentOneList.department}</Text>
                    </View>
                    <View style={styles.pesingerText}>
                        <Text>{recruitmentTwoList.nickname}</Text>
                        <Text>{recruitmentTwoList.department}</Text>
                    </View>
                    <View style={styles.pesingerText}>
                        <Text>{recruitmentThreeList.nickname}</Text>
                        <Text>{recruitmentThreeList.department}</Text>
                    </View>
                    <View style={styles.pesingerText}>
                        <Text>{recruitmentFourList.nickname}</Text>
                        <Text>{recruitmentFourList.department}</Text>
                    </View>
                    
                </View>
            </View>
            


            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("TicKetScreen")}>
                    <Ionicons name="card" size={24} color="black" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                    <FontAwesome name="user-circle" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create( {
        container: {
            flex: 1,

            
        },

        header: {
            flex : 0.2,
            backgroundColor : 'white',
            justifyContent: 'center',
            alignItems: 'center',
        },

        body: {
            flex: 0.85,
            backgroundColor: 'white',

        },
       
        map: {
            bottom: 10,
            position: 'absolute',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 10,
            width: '80%',
            height: '60%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',


        },

        mapText: {
            fontSize: 20,
            flex: 1,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        
        chatInfo: {

            width: '80%',
            alignSelf: 'center',
            top: 5,

        },

        chatInfoText: {
            fontSize: 20,
            fontWeight: 'bold',
            margin: 1,
        },

        userList: {
            top: 10,
            width: '80%',
            height: '80%',
            backgroundColor:'coral',
            alignSelf: 'center',
        },

        driverText: {
            marginTop: 15,
            marginBottom: 10,
        },

        pesingerText: {
            marginBottom: 10
        },
        userProfile: {
            backgroundColor: 'green',



        },
        
        footer: {
            height: 80,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderWidth: 0.3,
            alignItems: 'center',
            justifyContent: 'space-around',
        
        },
        
    }
);