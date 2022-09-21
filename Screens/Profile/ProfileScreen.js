// 모듈 불러오는 부분, 현재 수정중
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// 아이콘
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// 폰트
import { useFonts, Archivo_400Regular, Archivo_700Bold, Archivo_800ExtraBold } from '@expo-google-fonts/archivo'; // mate 로고
import { NotoSansKR_400Regular, NotoSansKR_500Mediu, NotoSansKR_100Thin, NotoSansKR_300Light, NotoSansKR_500Medium, NotoSansKR_700Bold, NotoSansKR_900Black, } from "@expo-google-fonts/noto-sans-kr";

// axios
import axios from "axios";

export default function ProfileScreen({navigation}) { 
    // State
    //const [ profileData, setProfleData ] = useState({});

    // 등교 데이터 state
    const [ goingSchoolDays, setGoingSchoolDays ] = useState([]);
    const days = ["월", "화", "수", "목", "금"];
    /*
    useEffect(async () => {
        const data = await axios.get('http://3.37.159.244:8080/member/');
        setProfleData(data);
    }, []);
    */
    // 폰트 설정
    let [ fontLoaded ] = useFonts({
        NotoSansKR_500Medium,
        NotoSansKR_400Regular,
        NotoSansKR_700Bold,
        NotoSansKR_900Black,
        Archivo_400Regular,
        Archivo_700Bold,
        Archivo_800ExtraBold,
        NotoSansKR_500Medium,
        NotoSansKR_400Regular,
        NotoSansKR_700Bold,
        NotoSansKR_900Black,
      });
  
    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Main")} style={styles.logo}>
                    <Text style={styles.logo_text}>MATE</Text>
                </TouchableOpacity>                
            </View>
            <View style={styles.main}>
                <View style={ {marginBottom: 20}}>
                    <View style={{paddingLeft: 39, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                        <View style={{flexDirection: 'row', }}>                            
                            <Ionicons name="person-circle-sharp" size={60} color="#d9d9d9" />                                                                                                                        
                            <View style={{width: 200, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16}}>항공정보통신공학과</Text>
                                <Text style={{marginBottom: 5, marginTop: 5, fontSize: 18}}>최수정</Text>
                                
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
                            <AntDesign name="right" size={24} color="#909090" />
                        </View>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 8}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProfileUpdateScreen")}
                        >
                            <View style={{width: 270, height: 30, justifyContent: 'center', backgroundColor: '#0173fe', alignItems: 'center', borderRadius: 15}}>
                                <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>프로필 수정하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingLeft: 20, paddingRight: 20}}>
                    <View style={{marginLeft: 30, marginBottom: 10}}>
                        <Text>요일</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',}}>
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
                                                }
                                                return prev;                                        
                                            });
                                        }}
                                        style={{ backgroundColor: isSelected ? "#007AFF" : "#FFFFFF", width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderColor: isSelected ? '' : '#D9D9D9', borderRadius: 50, borderWidth: isSelected ? 0 : 1}}                                                        
                                    >
                                        
                                        <Text style={{color: isSelected ? "#FFFFFF" : "#D9D9D9", }}>{day}</Text>                                    
                                    </TouchableOpacity>                                    
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.carpool_list}>                    
                    <View style={styles.carpool_list_title}>
                        <Text style={{fontWeight: 'bold', fontSize: 17, marginLeft: 30}}>최근 탑승 목록</Text>
                    </View>
                    <View style={{paddingLeft:30, paddingRight: 30}}>
                        <TouchableOpacity style={styles.carpool_list_ticket_display}>
                            <Ionicons name="person-circle-sharp" size={35} color="#d9d9d9" />                                                                                                                        
                            <View>
                                <View style={styles.carpool_list_ticket_display_title}>
                                    <Text style={styles.carpool_list_ticket_display_title_text}>인동 출발 / 무료</Text>
                                </View>
                                <View style={{marginLeft: 20,}}>
                                    <Text>8월 24일, 오전 10시 30분</Text>
                                </View>
                            </View>
                            <View style={{width: 40, height: 25, borderRadius: 10, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#FFFFFF'}}>4/4</Text>
                            </View>                        
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.carpool_list_ticket_display}>
                            <Ionicons name="person-circle-sharp" size={35} color="#d9d9d9" />      
                            <View>
                                <View style={styles.carpool_list_ticket_display_title}>
                                    <Text style={styles.carpool_list_ticket_display_title_text}>인동 출발 / 유료</Text>
                                </View>
                                <View style={{marginLeft: 20,}}>
                                    <Text>8월 21일, 오전 11시</Text>
                                </View>
                            </View>
                            <View style={{width: 40, height: 25, borderRadius: 10, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#FFFFFF'}}>1/4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.carpool_list_ticket_display}>
                            <Ionicons name="person-circle-sharp" size={35} color="#d9d9d9" />      
                            <View>
                                <View style={styles.carpool_list_ticket_display_title}>
                                    <Text style={styles.carpool_list_ticket_display_title_text}>인동 출발 / 무료</Text>
                                </View>
                                <View style={{marginLeft: 20,}}>
                                    <Text>8월 8일, 오전 8시 30분</Text>
                                </View>
                            </View>
                            <View style={{width: 40, height: 25, borderRadius: 10, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center',}}>
                                <Text style={{color: '#FFFFFF'}}>3/4</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0.18,
        //backgroundColor: 'green'
    },

    logo: {

    },

    logo_text: {
        fontSize: 35,
        color: '#007AFF',
        fontFamily: 'Archivo_800ExtraBold',
    },

    main: {
        flex: 0.7,
        //backgroundColor: 'yellow',
    },

    local_setting: {
        height: 95,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 15,
    },

    local_display: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 17,
    },

    local_display_text: {
        width: 92,
        textAlign: 'center',
        marginRight: 40
    },

    ticket_create: {
        
        height: 69,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 27,
        borderRadius: 20,
        marginTop: 17
    },

    carpool_list: {        
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 17,
        marginTop: 17,        
        borderColor: '#D9D9D9',
        borderTopWidth: 1,
    },

    carpool_list_title: {
        marginBottom: 27,
    },

    carpool_list_ticket_display: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },

    profile_image: {
        width: 35,
        height: 35,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
    },

    carpool_list_ticket_display_title: {
        flexDirection: 'row',
        width: 210,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
    },

    
    carpool_list_ticket_display_title_text: {
        marginLeft: 10,
        fontSize: 12,
    },

    carpool_list_ticket_display_title_driver: {
        width: 37,
        height: 21,
        backgroundColor: '#3B67FF',
    },

    carpool_list_ticket_display_title_pesinger: {
        width: 37,
        height: 21,
        backgroundColor: '#A8BBFF',
    },


});