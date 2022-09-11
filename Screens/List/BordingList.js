// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, } from 'react';
// 아이콘
import { AntDesign } from '@expo/vector-icons';

export default function BordingList({navigation, route}) {

    // 탑승 종료 state
    const [ finish, setFinish ] = useState(false);

    // 탑승 종료 이벤트 
    const onFinish = () => {
        setFinish(!finish);
    }

    return (
        <View 
            style={{flex: 1, backgroundColor: "#FFFFFF", }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.navbar}>
                        <TouchableOpacity 
                            onPress={() => {
                                    navigation.navigate("Main");
                                }
                            }
                            style={styles.backIcon}
                        >                        
                            <AntDesign name="left" size={25} color="black" />                        
                        </TouchableOpacity>
                        <View style={styles.startPointEndPointText}>
                            <View style={{flexDirection:'row', alignItems: 'center', width: 210, justifyContent: 'center'}}>
                                <View style={{width: "40%", alignItems: 'center'}}>
                                    <Text>인동</Text>
                                </View>
                                <View style={{width: 40, alignItems: 'center'}}>
                                    <AntDesign name="arrowright" size={24} color="black" />
                                </View>
                                <View style={{width: "45%", alignItems: 'center'}}>
                                    <Text>경운대학교</Text>
                                </View>
                            </View>
                            <View>
                                <Text>9/8 9:30 출발</Text>
                            </View>
                        </View>

                    </View>
                    
                    
                </View>
                
                <View style={styles.form}>                                                                                                                                             
                    <View style={styles.kakaoOpenChatLinkContainer}>
                        <Image style={{width: 50, height: 50,}} resizeMethod="resize" source={require("../../assets/kakao_logo.png")}></Image>
                        <TouchableOpacity style={{marginLeft: 15, backgroundColor: '#d9d9d9', justifyContent: 'center', borderRadius: 15, height: 35, width: 70, alignItems: 'center'}}>
                            <Text style={{color: "gray", fontWeight: 'bold',}}>복사 하기</Text>
                        </TouchableOpacity>
                    </View>                                                                                                                                                                                                                            
                </View>
                <View style={{flex: 0.6}}>
                    <View>                        
                        <View style={styles.carpool_list_display}>
                            <View style={styles.profile_image}></View>
                            <View style={styles.carpool_list_display_title}>
                                <Text style={styles.ccarpool_list_ticket_display_title_text}>이름</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate("DiclationScreen")}
                                    style={styles.carpool_list_ticket_display_title_driver}>
                                    <Text style={styles.complaint_text}>신고</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.carpool_list_display}>
                            <View style={styles.profile_image}></View>
                            <View style={styles.carpool_list_display_title}>
                                <Text style={styles.carpool_list_ticket_display_title_text}>이름</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate("DiclationScreen")}
                                    style={styles.carpool_list_ticket_display_title_pesinger}>
                                    <Text style={styles.complaint_text}>신고</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.carpool_list_display}>
                            <View style={styles.profile_image}></View>
                            <View style={styles.carpool_list_display_title}>
                                <Text style={styles.ccarpool_list_ticket_display_title_text}>이름</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate("DiclationScreen")}
                                    style={styles.carpool_list_ticket_display_title_driver}>
                                    <Text style={styles.complaint_text}>신고</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.carpool_list_display}>
                            <View style={styles.profile_image}></View>
                            <View style={styles.carpool_list_display_title}>
                                <Text style={styles.carpool_list_ticket_display_title_text}>이름</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate("DiclationScreen")}
                                    style={styles.carpool_list_ticket_display_title_pesinger}>
                                    <Text style={styles.complaint_text}>신고</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>                    
                </View>        
                <View style={styles.footer}>  
                    {
                        (
                            () => {
                                if (finish === false){
                                    return (
                                        <View style={styles.button_container}>             
                                            <TouchableOpacity 
                                                onPress={onFinish}
                                                style={styles.button_container_next_button}
                                            >
                                                <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>탑승 종료</Text>
                                            </TouchableOpacity>                                        
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={styles.finish_button_container}>             
                                            <TouchableOpacity 
                                                onPress={onFinish}
                                                style={[styles.finish_button_container_cancle_button, {marginRight: 15}]}
                                            >
                                                <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>취소</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                onPress={() => navigation.navigate("Main")}
                                                style={styles.finish_button_container_button}
                                            >
                                                <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>종료</Text>
                                            </TouchableOpacity>                                        
                                        </View>
                                    )
                                }
                            }
                        )()
                    }                  
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
        },
        
        header: {
            flex: 0.21,
            justifyContent: 'flex-end',
            justifyContent: 'center',
            
        },

        navbar: { 
            flexDirection: 'row',
            marginTop: 15,
        },

        backIcon: {
            width: 35,
            height: 35,
            justifyContent: 'center',
        },
        
        startPointEndPointText: {
            alignItems: 'center',
            width: "80%", 
        },

        kakaoOpenChatLinkContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        form: {            
            flex: 0.2,
        },

        form_container: {
            flex: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
        },

        form_label_text: {
            fontWeight: 'bold',
            width: 60,

        },

        startpoint_first_dropmenu: {
            width: 80,
            borderColor: 'gray',
            borderBottomWidth: 1,
            marginRight: 10,
            marginLeft: 10,
        },

        endpoin_first_dropmenu: {
            width: 80,
            borderColor: 'gray',
            borderBottomWidth: 1,
            marginRight: 10,
            marginLeft: 10,
        },

        selectListContainer: {
            width: 105,
        },
        
        second_dropmenu: {
            width: 130,
            borderColor: 'gray',
            borderBottomWidth: 1,
        },

        form_input: {
            width: 250,
            borderColor: 'gray',
            borderBottomWidth: 1,
        },

        carpool_list_display: {
            flexDirection: 'row',
            marginBottom: 20,
            alignItems: 'center'
        },

        carpool_list_display_title: {
            flexDirection: 'row',
            width: "87%",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 10,
        },
    
        carpool_list_ticket_display_title_driver: {
            width: 37,
            height: 21,
            backgroundColor: '#e31e1e',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
    
        carpool_list_ticket_display_title_pesinger: {
            width: 37,
            height: 21,
            backgroundColor: '#e31e1e',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },

        complaint_text: {
            color: "#FFFFFF",
            fontWeight: 'bold',
        },

        profile_image: {
            width: 35,
            height: 35,
            backgroundColor: '#D9D9D9',
            borderRadius: 20,
        },

        footer: {
            flex: 0.5,
            justifyContent: 'flex-end',
        },

        message_container: {
          flex: 0.2,  
          justifyContent: 'center',
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

        finish_button_container: {
            flex: 0.3,
            justifyContent: 'center',
            marginBottom: 10,
            flexDirection: 'row',
        },

        button_container_next_button : {
            backgroundColor: '#3B67FF',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        },
        
        finish_button_container_button : {
            backgroundColor: '#3B67FF',
            height: 55,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        },

        finish_button_container_cancle_button : {
            backgroundColor: '#80bdff',
            height: 55,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        },

        

    }
);