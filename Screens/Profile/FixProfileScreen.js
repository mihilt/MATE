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
            <View style={styles.ticket}>
                <View>
                    {() => Read()}
                </View>
                <View style={{flexDirection:'row', padding: 10, borderBottomWidth: 2, borderColor: "#F0F0F0"}}>
                    <Text style={{marginLeft: 18, fontSize: 16,}}>Order No238562312</Text>
                    <Text style={{marginLeft: 20, fontSize: 13, color: "#909090"}}>2022/03/01</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text style={{marginLeft: 30, fontSize: 13,}}>Quantity: 03</Text>
                    <Text style={{marginLeft: 36, fontSize: 13,}}>Total Amount: $150</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 35}}>
                    <Text style={{marginLeft: 30, fontSize: 13,}}>Detail</Text>
                    <Text style={{marginLeft: 130, fontSize: 13,}}>Processing</Text>
                </View>
            </View>
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', width: '90%', height: '85%', borderRadius: 15}}>
                    <View style={styles.header}>
                        <View style={styles.profile_info}>
                            <Image style={{ marginLeft: 3, width: 150, height: 140, borderRadius: 200, borderColor: 'black', borderWidth: 2}}source={require('../../assets/mate_icon.png')}/>  
                            <Text style={styles.user_name_text}>{UserInfo.UserInfo[0].nickname}</Text>
                        </View>
                        <View style={{marginVertical: 15, borderBottomWidth: 2}}>
                            <TextInput 
                                value={text}
                                onChangeText={(value) => {onChangeText(value)}}
                                placeholder="상태 메세지"
                            />
                        </View>

                        
                        <View style={styles.button}>
                            <TouchableOpacity 
                                style={
                                    {
                                        backgroundColor: "#151515", 
                                        paddingHorizontal: 110,
                                        paddingVertical: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                        borderRadius: 8,
                                        borderWidth: 4,
                                    }
                                }
                                onPress={setStatusMessageButton}
                            >
                                <Text style={{color: "#FFFFFF", fontSize: 14}}>수정 완료</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={
                                    {
                                        backgroundColor: "#FFFFFF",
                                        paddingHorizontal: 130,
                                        paddingVertical: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 8,
                                        borderWidth: 4,
                                    }
                                }
                            >
                                <Text>MESSAGE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <ScrollView>
                            {ShowTickets()}
                            <View style={styles.ticket}>
                                <View style={{flexDirection:'row', padding: 10, borderBottomWidth: 2, borderColor: "#F0F0F0"}}>
                                        <Text style={{marginLeft: 18, fontSize: 16,}}>Order No238562312</Text>
                                        <Text style={{marginLeft: 20, fontSize: 13, color: "#909090"}}>2022/03/01</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 5}}>
                                    <Text style={{marginLeft: 30, fontSize: 13,}}>Quantity: 03</Text>
                                    <Text style={{marginLeft: 36, fontSize: 13,}}>Total Amount: $150</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 35}}>
                                    <Text style={{marginLeft: 30, fontSize: 13,}}>Detail</Text>
                                    <Text style={{marginLeft: 130, fontSize: 13,}}>Processing</Text>
                                </View>
                            </View>
                                
                        </ScrollView>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                    <Fontisto name="comment" size={24} color="black" style={styles.messege_icon}/>
                    
                    <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                        <Fontisto name="home" size={24} color="black" style={styles.home_icon}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Fontisto name="plus-a" size={24} color="black" style={styles.plus_icon}/>
                    </TouchableOpacity>
                    
                    <Fontisto name="bookmark" size={24} color="black" style={styles.save_icon}/>
                    
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
            backgroundColor: "#315EFF",
        },
        header: {
            flex: 2.9,
            justifyContent: 'center',
            alignItems: 'center',
        },
        center: {
            flex: 2,
            backgroundColor: '#739BE1',
            marginBottom: 25,
            marginHorizontal: 20,
            borderRadius: 15,
        },
        profile_info: {
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
            fontSize: 36,
            marginTop: 32,
            color: 'black',
        },
        button: {
            marginTop: 10,
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
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: "#FFFFFF",
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
    }
);