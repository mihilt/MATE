// 프로필 수정 화면
import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
// 아이콘(원격주소)
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//firebase
import { db } from '../../Database/DatabaseConfig/firebase';
import { doc, getDoc } from 'firebase/firestore';
// 회원정보 데이터
import { UserInfo } from'../../Database/Data/User/userInfo';
import { CommonActions } from '@react-navigation/native';


export default function FixProfileScreen({navigation})  {

    const [ text, setText ] = useState('');
    // Refresh
    const [ refresh, setRefresh ] = useState(false);

    useEffect(() => {
        Read();
    }, []);

    useEffect(() => {
        Read();
        console.log(UserInfo.UserInfo[0]);
    }, [UserInfo.UserInfo[0].status_message]);

    // firebase로 불러온 정보를 선언(가리키고자)하고자 한다.
    let readUserDoc;
    // 사용자 티켓들 
    let userTickets;

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

    const ShowTickets = () => {
        return(
            [
            
            ]
        );
    }

    // 상태메시지 입력창 
    const onChangeText = (value) => {
        setText(value);
    }
    // 상태메시지 입력 버튼
    const setStatusMessageButton = () => {
        UserInfo.UserInfo[0].status_message = text;
        console.log(`상태메시지 : ${UserInfo.UserInfo[0].status_message}`);
        //onRefresh();
        //navigation.navigate('ProfileScreen');
        navigation.dispatch( CommonActions.goBack()); 

    }

    
    // 새로고침
    
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    
    const onRefresh = React.useCallback(() => {
        console.log(`새로고침 실행`);
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);

    return (
        <View style={styles.container}>
            <View style={{width: '100%' , height: 200 , backgroundColor: '#315EFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{bottom: 30, fontSize: 25, fontWeight: 'bold', color: 'white' }}>프로필</Text>
                <Image style={{position:'absolute', top: 90, width: 150, height: 150, borderRadius: 150/2, borderColor: 'white', borderWidth: 5, }}source={require('../../assets/mate_icon.png')}/>  
            </View>
                    
                    <View style={styles.header}>

                           
                        <Text style={styles.user_name_text}>박해준</Text>
                        <View style={{borderRadius: 10, width: '70%', height: '10%', marginTop : 10, justifyContent:'center', alignItems: 'center', backgroundColor: 'rgba(196, 196, 196, 0.31)'}}>
                            <TextInput 
                                value={text}
                                onChangeText={(value) => {onChangeText(value)}}
                                placeholder= "소개"
                            />
                        </View>

                        
                        <View style={styles.button}>

                            <View style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', borderRadius: 10,  width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text>활동 내역</Text>
                            </View>

                            <TouchableOpacity 
                                style={
                                    {
                                        backgroundColor: 'rgba(196, 196, 196, 0.31)', 
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 100,
                                        height: '10%',
                                        borderRadius: 10,

                                    }
                                }
                                onPress={setStatusMessageButton}
                            >
                                <Text style={{color: "black", fontSize: 14}}>수정 완료</Text>
                            </TouchableOpacity>

    
                        </View>
        </View>

        
            <View style={styles.footer}>
                
                    
                    <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                        <Fontisto name="home" size={24} color="black" style={styles.home_icon}/>
                    </TouchableOpacity>
                    
                    <Fontisto  name="map" size={24} color="black" />
                    
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                        <Ionicons name="person-outline" size={24} color="black" style={styles.profile_icon}/>
                    </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create( {
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        header: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
            top: 40,
        },
        center: {

            backgroundColor: '#739BE1',



        },
        profile_info: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        profile_img: {
            resizeMode: 'stretch', 
            width: 128.0, 
            height: 128.0, 
            borderRadius: 63, 
            marginTop: 9.9, 
            marginLeft: 10
        },
        user_name_text: {
            fontSize: 30,
            marginTop: 10,
            color: 'black',
        },
        button: {
            flex: 0.9,
            width: '90%',
            alignItems:'center',
            justifyContent: 'space-evenly',
            

        },
        ticket: {
            backgroundColor: '#FFFFFF',
            marginTop: 20,
            paddingVertical: 20,
            marginLeft:15,
            marginRight: 15,
            borderRadius: 12,
            
        },
        footer: {
            height: '9%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderWidth: 0.3,
        },

        messege_icon: {

        },
        home_icon: {
        },
        plus_icon: {
        },
        save_icon: {
        },
        profile_icon: {

        },
    }
);