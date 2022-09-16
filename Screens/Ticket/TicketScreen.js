// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions, Image } from "react-native";
import React, { useState } from 'react';
import { KeyboardAvoidingView } from "react-native";
// 아이콘
import { AntDesign } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// SVG
import Svg, { Circle, Path } from "react-native-svg";
// 드롭메뉴
import SelectList from 'react-native-dropdown-select-list'
// 폰트
import { useFonts, NotoSansKR_400Regular, NotoSansKR_500Mediu, NotoSansKR_100Thin, NotoSansKR_300Light, NotoSansKR_500Medium, NotoSansKR_700Bold, NotoSansKR_900Black, } from "@expo-google-fonts/noto-sans-kr";
// datetimepicker 모듈
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TicketScreen({navigation, route}) {

    // state step bar
    const [ next, setNext ] = useState(["first"]);
    
    // step bar list
    const stepbarList = ["first", "second", "third"];
    
    // 드롭메뉴 State
    const [ startPoint, setStartPoint ] = useState("");
    const [ endPoint, setEndPoint ] = useState("");

    // 유료 무료 토글 state
    const [ selectToggle, setSelectToggle ] = useState(["무료"]);
    const selectToggleList = ["무료", "유료"];

    const localData = ["경운대학교", "인동", "옥계"];

    // 입력창 state
    const [ pensingerCount, setPesingerCount ] = useState("");

    // DateTimePicker State
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //alert(`A date has been picked: ${date}`);
        //console.log(date);
        hideDatePicker();
        //setConformDate(date);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        //alert(`A time has been picked: ${time}`);
        hideTimePicker();
        //setConformDate(date);
    };

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

    // 입력창 핸들러
    const onChangePesingerCout = (text) => {

        setPesingerCount(text);
    }

    // 폰트 설정
    let [ fontLoaded ] = useFonts({
        NotoSansKR_500Medium,
        NotoSansKR_400Regular,
        NotoSansKR_700Bold,
        NotoSansKR_900Black,
      });
  
    if (!fontLoaded) {
        return null;
    }

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;


    return (
        <KeyboardAvoidingView 
            style={{flex: 1, backgroundColor: "#F5F5F5", }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
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
                        {
                            ( 
                                () => {
                                    if (Platform.OS === 'ios') {
                                        return (
                                            <>
                                                <View style={styles.stepbar_container_first_step}></View>
                                                <View style={next[1] === stepbarList[1] ? styles.stepbar_container_first_step : styles.stepbar_container_second_step}></View>
                                                <View style={next[2] === stepbarList[2] ? styles.stepbar_container_first_step : styles.stepbar_container_second_step}></View>
                                            </>
                                        );
                                    } else if (Platform.OS === 'android') {
                                        return (
                                            <>
                                                <View style={styles.andoroid_stepbar_container_first_step}></View>
                                                <View style={next[1] === stepbarList[1] ? styles.andoroid_stepbar_container_first_step : styles.android_stepbar_container_second_step}></View>
                                                <View style={next[2] === stepbarList[2] ? styles.andoroid_stepbar_container_first_step: styles.android_stepbar_container_second_step}></View>
                                            </>
                                        );
                                    }
                                }
                                
                            )()
                        }
        
                    </View>
                    <View style={styles.title_container}>
                        {
                            (
                                () => {
                                    if (next.length === 1) {
                                        return (
                                            <Text style={[styles.title, {fontSize: deviceHeight >= 700 ? 21 : 18}]}>어디로 가실 건가요?</Text>
                                        );
                                    } else if (next.length === 2) {
                                        return (
                                            <Text style={[styles.title, {fontSize: deviceHeight >= 700 ? 21 : 18}]}>언제 가실 건가요?</Text>
                                        );
                                    } else {
                                        return (
                                            <Text style={[styles.title, {fontSize: deviceHeight >= 700 ? 21 : 18}]}>카카오톡 오픈채팅방을 알려주세요</Text>
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
                                            <View style={{ height: 180, marginTop: 10}}>
                                                <View style={{flexDirection: 'row', marginLeft: 15, marginRight: 15,}}>
                                                    <View style={{marginRight: 15, height: 45, justifyContent: 'center'}}>
                                                        <Svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"                                                        
                                                        >
                                                            <Circle cx={12} cy={11} r={2} stroke="#007AFF" strokeWidth={2} />
                                                            <Path
                                                            d="M11.9999 22.0001L17.4999 16.5001C20.5374 13.4625 20.5374 8.53766 17.4999 5.5001C14.4623 2.46253 9.53742 2.46253 6.49985 5.5001C3.46229 8.53766 3.46229 13.4625 6.49985 16.5001L11.9999 22.0001Z"
                                                            stroke="#007AFF"
                                                            strokeWidth={2}
                                                            strokeLinejoin="round"
                                                            />
                                                        </Svg>
                                                    </View>                                                
                                                    <View style={styles.selectListContainer}>
                                                        <SelectList 
                                                            setSelected={setStartPoint}
                                                            data={localData}
                                                            onSelect={() => alert(startPoint)}
                                                            placeholder="출발지"
                                                            search={false}
                                                            
                                                        /> 
                                                    </View>                                                
                                                </View>
                                                <View style={{flexDirection: 'row', marginLeft: 15, marginRight: 15,}}>    
                                                    <View style={{marginRight: 15, height: 45, justifyContent: 'center'}}>
                                                        <Svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"                                                        
                                                        >
                                                            <Circle cx={12} cy={11} r={2} stroke="#007AFF" strokeWidth={2} />
                                                            <Path
                                                                d="M11.9999 22.0001L17.4999 16.5001C20.5374 13.4625 20.5374 8.53766 17.4999 5.5001C14.4623 2.46253 9.53742 2.46253 6.49985 5.5001C3.46229 8.53766 3.46229 13.4625 6.49985 16.5001L11.9999 22.0001Z"
                                                                stroke="#007AFF"
                                                                strokeWidth={2}
                                                                strokeLinejoin="round"
                                                            />
                                                        </Svg>
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
                                            </View>
                                            
                                        </>
                                    );
                                } else if (next.length === 2) {
                                    return (
                                        <>
                                            <View style={styles.form_container}>
                                                <View style={{marginLeft: 2}}>
                                                    <Octicons name="calendar" size={deviceHeight >= 700 ? 32 : 28} color="#007AFF" />
                                                </View>
                                            
                                                <TouchableOpacity 
                                                    style={{marginLeft: 15}}
                                                    onPress={showDatePicker}
                                                >                                                    
                                                    <Text style={[styles.form_label_text, {fontSize: deviceHeight >= 700 ? 18 : 14, fontFamily: 'NotoSansKR_400Regular'}]}>날짜</Text>                                                                                                                                                   
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[styles.form_container, {marginTop: 20}]}>           
                                                <MaterialIcons name="access-time" size={deviceHeight >= 700 ? 32 : 28} color="#007AFF" />     
                                                <TouchableOpacity 
                                                    style={{marginLeft: 10}}
                                                    onPress={showTimePicker}
                                                >
                                                    <Text style={[styles.form_label_text, {fontSize: deviceHeight >= 700 ? 18 : 14 ,fontFamily: 'NotoSansKR_400Regular'}]}>시간</Text>                                                                                          
                                                </TouchableOpacity>             
                                            </View>
                                            <View style={{ paddingTop: 25, paddingLeft: 15, paddingRight: 15}}>
                                                <Text style={{fontSize: deviceHeight >= 700 ? 21 : 18, fontFamily: 'NotoSansKR_700Bold'}}>유료 시간대를 확인해 주세요</Text>
                                                <View style={{alignItems: 'center', marginTop: deviceHeight >= 700 ? 10 : 0}}>
                                                    <View style={styles.select_container}>
                                                        {
                                                            selectToggleList.map(selectData => {
                                                                const isSelected = selectToggle.includes(selectData);
                                                                return (
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setSelectToggle(([...prev]) => {
                                                                                const id = prev.indexOf(selectData)
                                                                                
                                                                                prev.splice(id, 1);
                                                                                prev.push(selectData);                                                                    
                                                                                return prev;
                                                                            });
                                                                        }} 
                                                                        style={isSelected ? styles.select_container_active_btn : styles.select_container_non_active_btn}
                                                                    >
                                                                        <Text style={isSelected ? {color: '#FFFFFF', fontFamily: 'NotoSansKR_700Bold'} : {color: '#007AFF', fontFamily: 'NotoSansKR_700Bold'}}>{selectData}</Text>
                                                                    </TouchableOpacity>
                                                                );
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                                                    <Text style={{fontSize: 10, color: '#989595', fontFamily: 'NotoSansKR_400Regular'}}>오전 7~9, 오후 6~8시 까지 유료가 가능합니다.</Text>
                                                </View>
                                                <View style={{alignItems: 'center', paddingRight: 15}}>
                                                    <Text style={{fontSize: 10, color: '#989595', fontFamily: 'NotoSansKR_400Regular'}}>유료운행 시간대 : 오전 7-9시 /  오후 6-8시{'\n'}무료운행 시간대 : 오전 </Text>
                                                </View>                                                                                            
                                            </View>   
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <View style={styles.form_container}>                        
                                                <Ionicons name="md-chatbubble-outline" size={deviceHeight >= 700 ? 32 : 28} color="#007AFF" />
                                                <TextInput placeholder="오픈 채팅방 링크" placeholderTextColor="#989595" style={{marginLeft: 10, fontFamily: 'NotoSansKR_400Regular'}}/>                                                                                        
                                            </View>
                                            <View style={[styles.form_container, {marginTop: 20}]}>                             
                                                <Image source={require("../../assets/person_icon.png")} style={{width: deviceHeight >= 700 ? 32 : 28, height: deviceHeight >= 700 ? 32 : 28}}/>
                                                <TextInput value={pensingerCount} onChangeText={(text)=> setPesingerCount(text)}onEndEditing={(text) => setPesingerCount( prev => prev +"인")} placeholder="인원 수" placeholderTextColor="#989595" style={{marginLeft: 10, fontFamily: 'NotoSansKR_400Regular'}} />                                                                      
                                            </View>
                                            <View style={styles.message_container}>
                                                <Text style={styles.message_container_text}>차량번호 사진, 계좌번호를 안내해주세요</Text>
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
                                                <Text style={{color: '#FFFFFF', fontSize: deviceHeight >= 700 ? 18 : 16, fontFamily: 'NotoSansKR_700Bold'}}>다음으로</Text>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity 
                                                onPress={() => navigation.navigate("Main") }
                                                style={styles.button_container_next_button}
                                            >
                                                <Text style={{color: '#FFFFFF', fontSize: deviceHeight >= 700 ? 18 : 16, fontFamily: 'NotoSansKR_700Bold'}}>개설하기</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            )()
                        }                        
                    </View>
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
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
            flex: 0.25,
            justifyContent: 'flex-end',
            justifyContent: 'center',
                    
        },

        title_container: {
            justifyContent: 'center',
            marginLeft: 15,
        },
        title: {
            fontSize: 18,
            fontFamily: 'NotoSansKR_700Bold',
            
        },

        stepbar_container: {
            flexDirection: "row",
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 15,
            //backgroundColor: 'green',
        },
        
        stepbar_container_first_step: {
            width: 95,
            height: 5.5,
            backgroundColor: '#007AFF',
            marginRight: 6,
            borderRadius: 10,
        },

        stepbar_container_second_step: {
            width: 95,
            height: 5.5,
            backgroundColor: '#d9d9d9',
            marginRight: 6,
            borderRadius: 10,
        },

        andoroid_stepbar_container_first_step: {
            width: 107,
            height: 5.5,
            backgroundColor: '#007AFF',
            marginRight: 6,
            borderRadius: 10,
        },

        android_stepbar_container_second_step: {
            width: 107,
            height: 5.5,
            backgroundColor: '#d9d9d9',
            marginRight: 6,
            borderRadius: 10,
        },

        form: {            
            flex: 0.5,
            
        },

        form_container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginLeft: 15,
            alignItems: 'center',
        },

        form_label_text: {
            color: '#989595',

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
            width: 130,
            height: 200,
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
            flex: 0.2,
            justifyContent: 'flex-end',        
        },

        message_container: {
          flex: 0.2,  
          justifyContent: 'center',
          marginLeft: 30
        },

        message_container_text: {
            fontSize: 10,
            color: "#989595",
            fontFamily: 'NotoSansKR_400Regular',
        },


        button_container: {
            flex: 0.3,
            justifyContent: 'center',
            marginBottom: 10,
        },

        button_container_next_button : {
            backgroundColor: '#007AFF',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            marginLeft: 15,
            marginRight: 15,
        },
        select_container: {
            borderColor: '#007AFF',
            borderWidth: 1,
            width: 248,
            height: 50,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
        },

        select_container_active_btn: {
            width: 124,
            height: 50,
            backgroundColor: '#007AFF',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#d9d9d9',
        },

        select_container_non_active_btn: {
            width: 124,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },

    }
);