// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, StyleSheet, TouchableOpacity, TextInput, } from "react-native";
import React from 'react';
import { KeyboardAvoidingView } from "react-native";

// 아이콘
import { AntDesign } from '@expo/vector-icons';

export default function DiclationScreen({navigation, route}) {

    return (
        <KeyboardAvoidingView 
            style={{flex: 1, backgroundColor: "#F5F5F5", }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ marginTop: 31,}}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("BordingList")}
                            style={{width: 35, height: 35, justifyContent: 'center'}}
                        >                        
                            <AntDesign name="left" size={25} color="black" />                        
                        </TouchableOpacity>
                    </View>                   
                   
                    <View style={styles.title_container}>
                        <Text style={styles.title}>신고할 내용을 작성해 주세요</Text>                                                                                                   
                    </View>
                </View>
                
                <View style={styles.form}>                    
                    <View style={{ height: 180, flexDirection: 'row', marginTop: 10}}>
                        <View style={[styles.selectListContainer, {marginRight: 15,}]}>
                            <TextInput 
                                multiline={true}
                                textAlignVertical="top"
                                placeholder="신고할 내용을 작성해 주세요"
                                style={{borderWidth: 1, width: 275, height: 200, paddingLeft: 10, borderColor: "gray", borderRadius: 12}}
                            />
                        </View>
                    </View>                                                                                                                                                                                                                       
                </View>        
                <View style={styles.footer}>                    
                    <View style={styles.button_container}>                                                        
                        <TouchableOpacity 
                            onPress={() => {
                                alert("신고 접수 했습니다.")
                                navigation.navigate("Main");                                
                            }}
                            style={styles.button_container_next_button}
                        >
                            <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>재출하기</Text>
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
            paddingLeft: 20,
            paddingRight: 20,
        },
        
        header: {
            flex: 0.21,
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
            fontWeight: "bold",
        },

        stepbar_container: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
        },
        
        stepbar_container_first_step: {
            width: 95,
            height: 5.5,
            backgroundColor: '#3B67FF',
        },

        stepbar_container_second_step: {
            width: 95,
            height: 5.5,
            backgroundColor: '#d9d9d9',
        },

        form: {            
            flex: 0.4,
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

        button_container_next_button : {
            backgroundColor: '#3B67FF',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        }

    }
);