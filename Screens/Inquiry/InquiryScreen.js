import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Dimensions, TextInput, useWindowDimensions } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAvoidingView } from "react-native";
// firebase Storage 불러오기
import { getStorage, ref, uploadBytes } from "firebase/storage";
// 아이콘
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg";
// 폰트
import { useFonts, NotoSansKR_400Regular, NotoSansKR_500Mediu, NotoSansKR_100Thin, NotoSansKR_300Light, NotoSansKR_500Medium, NotoSansKR_700Bold, NotoSansKR_900Black, } from "@expo-google-fonts/noto-sans-kr";
import axios from "axios";
// HTML 랜더링
import RenderHtml from 'react-native-render-html';
import { Archivo_500Medium } from "@expo-google-fonts/archivo";


/*
    <View style={{marginTop: 12, marginLeft: 12}}>
        <Text style={{fontSize: 10, color: "#989595", fontFamily: 'NotoSansKR_400Regular'}}>카풀에 운행 가능한 차량이 있다면 ‘드라이버’를 선택해 주세요</Text>
    </View>
*/
export default function InquiryScreen({navigation}) {

    // state
    // TextInput 글자 카운트 출력
    const [ title, setTitle ] = useState('');
    const [ etcContent, setEtcContent ] = useState('');
    const [ email, setEmail ] = useState('');

    // 동의 아이콘 state
    const [ agree, setAgree ] = useState(false);
    
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const { width } = useWindowDimensions();
    console.log( "window : ", width)
    
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQwMDc1MjIsImV4cCI6MTY2NDA5MzkyMn0.WG6xx-sqh9ljJKoPyDioJldK4LjwOnWsjkewcvB998aas1l3_7JWelnuHGPvgny6vLK1GFO8TNh4AdIcsizbhA'

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

    // HTML Render
    const source = {
        html: `<ul style="list-style-type: circle; color: #989595; font-size: 11px; padding-left: 0px; margin-left: 10px">
        <li>&nbsp&nbsp문제가 해결되지 않으셨다면 1:1 로 문의하세요.</li>
        <li>&nbsp&nbsp문의 주신 내용은 48시간 내로 최대한 빠르게 답변드리도록 하겠습니다.<br>&nbsp&nbsp남겨주신 이메일을 확인해주세요.</li>
        <li>&nbsp&nbsp1:1문의 처리 내역은 설정>문의 내역을 통해 확인하실 수 있습니다.</li>      
      </ul>`
      };

    return (
        <View 
            style={{flex: 1, backgroundColor: "#F5F5F5"}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("Setting")}
                            style={{width: 35, height: 35, justifyContent: 'center'}}
                        >                        
                            <AntDesign name="left" size={25} color="black" />                        
                        </TouchableOpacity>
                        <View style={{width: "80%", alignItems: 'center',}}>
                            <Text style={{color: '#575757', fontSize: 16, fontFamily: 'NotoSansKR_500Medium'}}>1:1 문의</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{flex: deviceHeight < 700 ? 1 : 0.6 }}>
                    
                    <View style={{marginLeft: 5}}>
                        <Text style={{fontSize: 18, fontFamily: 'NotoSansKR_700Bold'}}>어떤 걸 도와드릴까요?</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        <TextInput                            
                            maxLength={200}                            
                            multiline={true}
                            textAlignVertical='top'                                                                               
                            placeholder='제목'        
                            onChange={(e) => {
                                setTitle(e.nativeEvent.text);
                            }}                                                
                            style={{
                                paddingTop: 5,
                                borderWidth: 1,
                                width: Dimensions.get('window').width - 40,
                                height: 40,
                                paddingLeft: 10,                       
                                borderColor: 'gray'                                         
                            }}                            
                        />                        
                    </View>
                    <View style={{marginTop: 8}}>
                        <TextInput                            
                            maxLength={200}                            
                            multiline={true}
                            textAlignVertical='top'
                            value={etcContent}
                            onChange={(e) => {
                                setEtcContent(e.nativeEvent.text);
                            }}                        
                            placeholder='내용을 입력해주세요.'                                                        
                            style={{
                                paddingTop: 5,
                                borderWidth: 1,
                                width: Dimensions.get('window').width - 40,
                                height: 100,
                                paddingLeft: 10,                       
                                borderColor: 'gray'                                         
                            }}
                            
                        />                        
                    </View>
                    <View alignItems='flex-end'>
                        <Text style={{ color: '#909090' }}>{etcContent.length} / 200</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        <TextInput                                                    
                            maxLength={200}                            
                            multiline={true}
                            textAlignVertical='top'                                                                        
                            placeholder='답변 받을 이메일 주소'   
                            onChange={(e) => {
                                setEmail(e.nativeEvent.text);
                            }}                                                     
                            style={{
                                paddingTop: 5,
                                borderWidth: 1,
                                width: Dimensions.get('window').width - 40,
                                height: 40,
                                paddingLeft: 10,                       
                                borderColor: 'gray'                                         
                            }}
                            
                        />                        
                    </View>                                   
                    <View style={{marginLeft: 5, flexDirection: 'row', alignItems: 'center'}}> 
                        
                        <TouchableOpacity 
                            onPress={() => setAgree(prev => !prev)}
                            style={{marginLeft: Platform.OS === 'ios' ? 10 : 70}}>
                            <Svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                                            
                            >
                                <Path
                                d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                stroke={agree === false ? "#D9D9D9" : "#007AFF"}
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                                <Path
                                d="M22 4L12 14.01L9 11.01"
                                stroke={agree === false ? "#D9D9D9" : "#007AFF"}
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </Svg>                                                                                                             
                        </TouchableOpacity>                   
                        <Text style={[styles.message_container_text, {width: 270, marginLeft: Platform.OS === 'ios' ? 30 : 10}]}>개인정보 수집 및 이용에 동의합니다. 1:1 문의를 위한 최소한의 개인정보만을 수집하고 있습니다. 개인정보는 ‘개인정보 처리방침’에 근거하여 관리됩니다.</Text>                                                                                        
                    </View>
                    <View style={{marginTop: 15}}>                       
                        <RenderHtml 
                            contentWidth={width}                           
                            source={source}
                        />
                    </View>
                </View>                                        
                <View style={styles.footer}>
                    <View style={styles.button_container}>
                        {
                            agree === false ? (
                                <View style={styles.button_container_diagree_button}>
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'NotoSansKR_700Bold', fontSize: 23}}>제출하기</Text>
                                </View>
                            ) : (
                                <TouchableOpacity 
                                    onPress={() => {
                                        if (title.length > 0 && etcContent.length > 0 && email.length > 0) {
                                            axios.post('http://3.37.159.244:8080/QuestionBoard/new',                                            
                                            {
                                                "writerStudentId": "201702003",
                                                //"writerEmail": email, 협의 필요~
                                                "title": title,
                                                "content": etcContent,                                        
                                            }, {
                                                headers: {"Authorization" : `Bearer ${token}`},
                                            }).then((res) => {                                    
                                                console.log("문의 제출 응답 : ", res.data);
                                            })
                                        }
                                    }}
                                    style={styles.button_container_next_button}                       
                                >
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'NotoSansKR_700Bold', fontSize: 23}}>제출하기</Text>
                                </TouchableOpacity>
                            )
                        }                        
                    </View>
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
            backgroundColor: '#FFFFFF'
        },
        
        header: {
            flex: 0.18,
            justifyContent: 'center',            
        },

        title_container: {
            marginTop: 20,
            justifyContent: 'center',
        },
        title: {
            fontSize: 25,
            fontWeight: "400",
        },

        stepbar_container: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
        },

        select_container: {
            borderColor: '#007AFF',
            borderWidth: 1,
            width: 312,
            height: 50,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
        },

        select_container_active_btn: {
            width: 156,
            height: 50,
            backgroundColor: '#007AFF',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#d9d9d9',
        },

        select_container_non_active_btn: {
            width: 156,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },

        profile_container: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
        }, 

        profile_container_input: {
            width: 60,
            height: 60,
            backgroundColor: '#d9d9d9',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        
        form_container_textinput : {
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            fontWeight: "400",
            paddingTop: 10,
            paddingBottom: 10,
            
        },

        footer: {
            flex: 0.18,            
        },

        message_container: {
          justifyContent: 'flex-end',
          paddingBottom: 20,
          marginTop: 5,
          
        },

        message_container_text: {
            fontSize: 10,
            marginTop: 10, 
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
            borderRadius: 15
        },
        button_container_diagree_button : {
            backgroundColor: '#D9D9D9',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        }
    }
);