// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from 'react';
import { KeyboardAvoidingView } from "react-native";
// 아이콘
import { AntDesign } from '@expo/vector-icons';
// 드롭메뉴
import SelectList from 'react-native-dropdown-select-list'

export default function TicketScreen({navigation, route}) {

    // state step bar
    const [ next, setNext ] = useState(["first"]);
    
    // step bar list
    const stepbarList = ["first", "second", "third"];
    

    // 드롭메뉴 State
    const [ startPoint, setStartPoint ] = useState("");
    const [ endPoint, setEndPoint ] = useState("");

    const localData = ["경운대학교", "인동", "옥계"];

    // 다음 버튼 클릭시 step bar 바꿔 해당 컴포넌트 보여주기.
    const onStepBarBtn = () => {
        
        setNext(([...prev]) => {
            if (prev.length === 1) {
                prev.push(stepbarList[1]);
            } else if(prev.length === 2) {
                prev.push(stepbarList[2]);
          
            }
            return prev;
        })
        
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1, backgroundColor: "#F5F5F5", }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ marginTop: 51,}}>
                        <TouchableOpacity 
                            onPress={() => {
                                if (next.length === 2) {
                                    setNext(([...prev]) => {
                                        prev.splice(prev.length-1, 1);
                                        return prev;
                                    });
                                } else if (next.length === 3) {
                                    setNext(([...prev]) => {
                                        prev.splice(prev.length-1, 1);
                                        return prev;
                                    });
                                } else {
                                    navigation.navigate("Main");
                                }
                            }}
                            style={{width: 35, height: 35, justifyContent: 'center'}}
                        >                        
                            <AntDesign name="left" size={25} color="black" />                        
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepbar_container}>
                        <View style={styles.stepbar_container_first_step}></View>
                        <View style={next[1] === stepbarList[1] ? styles.stepbar_container_first_step : styles.stepbar_container_second_step}></View>
                        <View style={next[2] === stepbarList[2] ? styles.stepbar_container_first_step : styles.stepbar_container_second_step}></View>
                    </View>
                    <View style={styles.title_container}>
                        {
                            (
                                () => {
                                    if (next.length === 1) {
                                        return (
                                            <Text style={styles.title}>어디로 가실 건가요?</Text>
                                        );
                                    } else if (next.length === 2) {
                                        return (
                                            <Text style={styles.title}>언제 가실 건가요?</Text>
                                        );
                                    } else {
                                        return (
                                            <Text style={styles.title}>카톡 오픈채팅방을 알려주세요</Text>
                                        );
                                    }
                                }
                            )()
                        }
                    </View>
                </View>
                
                <View style={styles.form}>
                    {
                        (
                            () => {
                                if (next.length === 1) {
                                    return (
                                        <>
                                            <View style={{ height: 180, flexDirection: 'row', marginTop: 10}}>
                                                <View style={[styles.selectListContainer, {marginRight: 15,}]}>
                                                    <SelectList 
                                                        setSelected={setStartPoint}
                                                        data={localData}
                                                        onSelect={() => alert(startPoint)}
                                                        placeholder="출발지"
                                                        search={false}
                                                    /> 
                                                </View>
                                                <View style={styles.selectListContainer}>
                                                    <SelectList 
                                                        setSelected={setEndPoint}
                                                        data={localData}
                                                        onSelect={() => alert(endPoint)}
                                                        placeholder="도착지"
                                                        search={false}                                                                
                                                    /> 
                                                </View>
                                            </View>
                                            <View style={{height: 210, flexDirection: 'row', alignItems :'center', justifyContent: 'center', paddingRight: 10, paddingLeft: 10}}>
                                                <View style={{width: "56%", alignItems :'flex-end'}}>
                                                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>{startPoint !== "" ? startPoint : "출발지"}</Text>
                                                </View>
                                                <View style={{width: "30%", alignItems: 'center',}}>
                                                    <AntDesign name="arrowright" size={24} color="black" />
                                                </View>
                                                <View style={{alignItems: 'flex-start', width: "56%",}}>
                                                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>{endPoint !== "" ? endPoint : "도착지"}</Text>                                                
                                                </View>
                                            </View>
                                        </>
                                    );
                                } else if (next.length === 2) {
                                    return (
                                        <>
                                            <View style={styles.form_container}>                        
                                                <Text style={styles.form_label_text}>요일</Text>
                                                <TextInput style={styles.form_input}/>                                                
                                            </View>
                                            <View style={[styles.form_container, {marginTop: 20}]}>                             
                                                <Text style={styles.form_label_text}>시간</Text>
                                                <TextInput style={styles.form_input} />                                                   
                                            </View>   
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <View style={styles.form_container}>                        
                                                <Text style={styles.form_label_text}>링크</Text>
                                                <TextInput style={styles.form_input} />                                                                                        
                                            </View>
                                            <View style={[styles.form_container, {marginTop: 20}]}>                             
                                                <Text style={styles.form_label_text}>방 이름</Text>
                                                <TextInput style={styles.form_input} />                                                                      
                                            </View>
                                            <View style={styles.message_container}>
                                                <Text style={styles.message_container_text}>차량번호, 계좌번호 안내해주세요.</Text>
                                            </View>   
                                        </>
                                    );
                                }
                            }
                        )()
                    }                                   
                </View>        
                <View style={styles.footer}>                    
                    <View style={styles.button_container}>
                        {
                            (
                                () => {
                                    if (next.length !== 3) {
                                        return (
                                            <TouchableOpacity 
                                                onPress={onStepBarBtn}
                                                style={styles.button_container_next_button}
                                            >
                                                <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>다음으로</Text>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity 
                                                onPress={() => navigation.navigate("Main") }
                                                style={styles.button_container_next_button}
                                            >
                                                <Text style={{color: '#FFFFFF', fontWeight: "bold", fontSize: 23}}>개설하기</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            )()
                        }                        
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