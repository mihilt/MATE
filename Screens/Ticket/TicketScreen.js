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
 
    /*   
    useEffect(() => {
        Read();
        
    }, []);
*/

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
                console.log(snapshot.data());
            } else {
                alert("No Document");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.map}>
                    <Text style={styles.mapText}>{CarpoolTicket.CarpoolTicket[0].arrival_area}</Text>
                    <AntDesign name="arrowright" size={30} color="black" />
                    <Text style={styles.mapText}>{CarpoolTicket.CarpoolTicket[0].depart_area}</Text>
                </View>

            </View>

            
            
            <View style={styles.body}>
                <View style={styles.chatInfo}>
                    <Text style={styles.chatInfoText}>오픈채팅 : {CarpoolTicket.CarpoolTicket[0].open_chat}</Text>
                    <Text style={styles.chatInfoText}>비밀번호 : {CarpoolTicket.CarpoolTicket[0].open_chat_password}</Text>
                </View>

                <View style={styles.userList}>
                    <View stlye={styles.userProfile}>
                            
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