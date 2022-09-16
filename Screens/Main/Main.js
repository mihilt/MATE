// 모듈 불러오는 부분, 현재 수정중
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
// 아이콘(원격주소) 불러오기
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";

export default function Main({ navigation, route }) { 
    
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logo_text}>MATE</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("LocalSettingFirst")}
                    style={styles.local_setting}
                >
                    <View style={styles.local_setting_title}>
                        <Text style={styles.local_setting_title_text}>지역 설정</Text>
                    </View>
                    <View style={styles.local_display}>
                        <Text style={styles.local_display_text}>지역1</Text>            
                        <Text style={styles.local_display_text}>지역2</Text>                    
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TicketScreen")}
                    style={styles.ticket_create}>
                    <View style={styles.ticket_create_title}>
                        <Text style={styles.ticket_create_title_text}>티켓 만들기</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.carpool_list}>
                    <View style={styles.carpool_list_title}>
                        <Text style={styles.carpool_list_title_text}>카풀 목록</Text>
                    </View>
                    <TouchableOpacity style={styles.carpool_list_ticket_display}>
                        <View style={styles.profile_image}></View>
                        <View style={styles.carpool_list_ticket_display_title}>
                            <Text style={styles.ccarpool_list_ticket_display_title_text}>드라이버 만든 티켓</Text>
                            <View style={styles.carpool_list_ticket_display_title_driver}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.carpool_list_ticket_display}>
                        <View style={styles.profile_image}></View>
                        <View style={styles.carpool_list_ticket_display_title}>
                            <Text style={styles.carpool_list_ticket_display_title_text}>패신저 만든 티켓</Text>
                            <View style={styles.carpool_list_ticket_display_title_pesinger}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("BordingList")}
                    style={styles.list_container}>
                    <Text>리스트</Text>
                    <View style={styles.list_container_text_container}>
                        <Text>내역</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ecf0f1',
        paddingLeft: 20,
        paddingRight: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 120,
    },

    logo: {

    },

    logo_text: {
        fontSize: 35,
        color: '#007AFF',
        fontWeight: 'bold',
    },

    main: {
        height: 380,
    },

    local_setting: {
        backgroundColor: '#FFFFFF',
        height: 95,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 15,
        borderRadius: 20,
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
        backgroundColor: '#FFFFFF',
        height: 69,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 27,
        borderRadius: 20,
        marginTop: 17
    },

    carpool_list: {
        backgroundColor: '#FFFFFF',
        height: 160,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 27,
        borderRadius: 20,
        marginTop: 17,
    },

    carpool_list_title: {
        marginBottom: 27,
    },

    carpool_list_ticket_display: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },

    profile_image: {
        width: 35,
        height: 35,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
    },

    carpool_list_ticket_display_title: {
        flexDirection: 'row',
        width: 255,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
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

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    list_container: {
        backgroundColor: '#FFFFFF',
        flex: 0.3,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    list_container_text_container: {
        backgroundColor: '#D9D9D9',
        height: 25,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    DriverPesingerModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        
    },
    DriverPesingerModalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: SCREEN_HEIGHT-320,
        shadowColor: '#000',
        //그림자의 영역 지정
        shadowOffset: {
          width: 0,
          height:2
        },
        //불투명도 지정
        shadowOpacity: 0.25,
        //반경 지정
        shadowRadius: 3.84,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop:22,
        paddingLeft: 20,
        paddingRight: 20,
        

    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: SCREEN_HEIGHT-320,
        shadowColor: '#000',
        //그림자의 영역 지정
        shadowOffset: {
          width: 0,
          height:2
        },
        //불투명도 지정
        shadowOpacity: 0.25,
        //반경 지정
        shadowRadius: 3.84,
    },
});