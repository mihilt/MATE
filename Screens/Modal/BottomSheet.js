import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
import { UserInfo } from'../../Database/Data/User/userInfo';
import { CarpoolTicket } from'../../Database/Data/Ticket/carpoolData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const BottomSheet = (props) => {
    const { modalVisible, setModalVisible, startInputText, endInputText, setStartInputText, setEndInputText, ticket, setTicket, Create, Read, showCarpoolTicket, showTaxiTicket} = props;
    //const [ button, setButton ] = useState(0);
    
    const [ studentNumber, SetStudentNumber ] = useState("");
    const [ arrivaltime, setArrivalTime ] = useState("");
    const [ departtime, setDepartTime ] = useState("");
    const [ startInputSelect, setStartInputSelect ] = useState([false, false, false, false]); // (인동, 옥계, 본관, 항공관)
    const [ endInputSelect, setEndInputSelect ] = useState([false, false, false, false]); // (인동, 옥계, 본관, 항공관)
    const [ rescruitmentButton, setRescruitmentButton ] = useState([false, false, false, false]);
    
    const screenHeight = Dimensions.get("screen").height;
    
    const panY = useRef(new Animated.Value(screenHeight)).current;
    
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
            Read();
            Read();
            showCarpoolTicket();
            showTaxiTicket();
            setStartInputText("");
            setEndInputText("");
            setStartInputSelect([false, false, false, false]);
            setEndInputSelect([false, false, false, false]);
            setRescruitmentButton([false, false, false, false]);
            setArrivalTime("");
            setDepartTime("");
            SetStudentNumber("");
        })
    }

    const setStartLocalSelect = () => {
        if (button === 1) {
            setStartInputText('인동');
            setStartInputSelect([true, false, false, false]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 2) {
            setStartInputText('옥계');
            setStartInputSelect([false, true, false, false]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 3) {
            setStartInputText('본관');
            setStartInputSelect([false, false, true, false]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 4) {
            setStartInputText('항공관');
            setStartInputSelect([false, false, false, true]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
    }

    const setEndLocalSelect = () => {
        if (button === 1) {
            setEndInputText('인동');
            setEndInputSelect([true, false, false, false]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 2) {
            setEndInputText('옥계');
            setEndInputSelect([false, true, false, false]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 3) {
            setEndInputText('본관');
            setEndInputSelect([false, false, true, false]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 4) {
            setEndInputText('항공관');
            setEndInputSelect([false, false, false, true]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
    }


    const StartInputButtonOneColor = () => {
        if (startInputSelect[0] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }
    
    const StartInputButtonTwoColor = () => {
        if (startInputSelect[1] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const StartInputButtonThreeColor = () => {
        if (startInputSelect[2] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const StartInputButtonFourColor = () => {
        if (startInputSelect[3] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const EndInputButtonOneColor = () => {
        if (endInputSelect[0] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }
    
    const EndInputButtonTwoColor = () => {
        if (endInputSelect[1] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const EndInputButtonThreeColor = () => {
        if (endInputSelect[2] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const EndInputButtonFourColor = () => {
        if (endInputSelect[3] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const RecruitmentButtonOneColor = () => {
        if (rescruitmentButton[0] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    const RecruitmentButtonTwoColor = () => {
        if (rescruitmentButton[1] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    const RecruitmentButtonThreeColor = () => {
        if (rescruitmentButton[2] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    const RecruitmentButtonFourColor = () => {
        if (rescruitmentButton[3] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }


    const loacte = ['경운대학교', '인동', '옥계']; // 지역 선택 목록들
    let button = 0;

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent={true}
            statusBarTranslucent

        >

            <View style={styles.overlay}>
                    <TouchableWithoutFeedback
                        onPress={closeModal}>
                        <View style={styles.background}/>


                    </TouchableWithoutFeedback>
                <View style={styles.container}>

                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}
                    >

                    <KeyboardAwareScrollView extraScrollHeight={120} style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                    <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                    >
                    <View style={{borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 0.3,  justifyContent: 'space-around',}}>
                        
                        <View>
                            <View style={{flexDirection : 'row', justifyContent:'space-evenly', alignItems: 'center' }}>
                                <FontAwesome style={{backgroundColor: 'white',}} name="circle" size={15} color="#587DFF" />
                                <Text>출발지</Text>
                                <TouchableOpacity onPress={() => { button = 1; setStartLocalSelect();}} style={StartInputButtonOneColor()}>
                                    <Text style={startInputSelect[0] ? {color: 'white'} : {color: 'black'}}>인동</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { button = 2; setStartLocalSelect();}} style={StartInputButtonTwoColor()}>
                                    <Text style={startInputSelect[1] ? {color: 'white'} : {color: 'black'}}>옥계</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { button = 3; setStartLocalSelect();}} style={StartInputButtonThreeColor()}>
                                    <Text style={startInputSelect[2] ? {color: 'white'} : {color: 'black'}}>본관</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { button = 4; setStartLocalSelect();}} style={StartInputButtonFourColor()}>
                                    <Text style={startInputSelect[3] ? {color: 'white'} : {color: 'black'}}>항공관</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ flexDirection : 'row', justifyContent:'space-evenly', alignItems: 'center', }}>
                            <FontAwesome style={{backgroundColor: 'white',}} name="circle" size={15} color="#587DFF" />
                            <Text>도착지</Text>
                            <TouchableOpacity onPress={() => { button = 1; setEndLocalSelect();}} style={EndInputButtonOneColor()}>
                                <Text style={endInputSelect[0] ? {color: 'white'} : {color: 'black'}}>인동</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 2; setEndLocalSelect();}} style={EndInputButtonTwoColor()}>
                                <Text style={endInputSelect[1] ? {color: 'white'} : {color: 'black'}}>옥계</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 3; setEndLocalSelect();}} style={EndInputButtonThreeColor()}>
                                <Text style={endInputSelect[2] ? {color: 'white'} : {color: 'black'}}>본관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 4; setEndLocalSelect();}} style={EndInputButtonFourColor()}>
                                <Text style={endInputSelect[3] ? {color: 'white'} : {color: 'black'}}>항공관</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ flex:1, justifyContent : 'space-evenly',}}>

                        <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 35,}}>
                            
                            <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>모집인원</Text>
                            </View> 

                           <TouchableOpacity 
                                onPress={() => {
                                            UserInfo.Driver[0].recruitment_count = 1;
                                            setRescruitmentButton([true, false, false, false]);
                                        }
                                    }
                                style={RecruitmentButtonOneColor()}><Text style={rescruitmentButton[0] ? {color: 'white'} : {color: 'black'}}>1</Text>
                            </TouchableOpacity>

                           <TouchableOpacity 
                                onPress={() => {
                                            UserInfo.Driver[0].recruitment_count = 2;
                                            setRescruitmentButton([false, true, false, false]);
                                        }
                                    }
                                style={RecruitmentButtonTwoColor()}><Text style={rescruitmentButton[1] ? {color: 'white'} : {color: 'black'}}>2</Text>
                            </TouchableOpacity>

                           <TouchableOpacity 
                                onPress={() => {
                                        UserInfo.Driver[0].recruitment_count = 3;
                                        setRescruitmentButton([false, false, true, false]);
                                    }
                                }
                                style={RecruitmentButtonThreeColor()}><Text style={rescruitmentButton[2] ? {color: 'white'} : {color: 'black'}}>3</Text>
                            </TouchableOpacity>

                           <TouchableOpacity 
                                onPress={() => {
                                        UserInfo.Driver[0].recruitment_count = 4;
                                        setRescruitmentButton([false, false, false, true]);
                                    }
                                }
                                style={RecruitmentButtonFourColor()}><Text style={rescruitmentButton[3] ? {color: 'white'} : {color: 'black'}}>4</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor :"rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>출발시간</Text>
                            </View> 
                            <Input 
                                containerStyle={{width: '65%', }} 
                                value={arrivaltime}
                                onChangeText={(text) => setArrivalTime(CarpoolTicket.CarpoolTicket[0].arrival_time = text)}
                            />
                        </View>

                        <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>오픈채팅</Text>
                            </View> 
                            <Input 
                                containerStyle={{width: '65%', }}
                                onChangeText={(text) => CarpoolTicket.CarpoolTicket[0].open_chat = text} 
                            />    
                        </View>

                        <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            
                            <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>비밀번호</Text>
                            </View> 
                            <Input 
                                containerStyle={{width: '65%', }}
                                onChangeText={(text) => CarpoolTicket.CarpoolTicket[0].open_chat_password = text}
                            />
                        </View>
                    </View>

                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity 
                            onPress={() => { 
                                if (startInputText != "" && endInputText != "" && arrivaltime != "" && CarpoolTicket.CarpoolTicket[0].open_chat_password != "" && CarpoolTicket.CarpoolTicket[0].open_chat != "") {
                                    
                                    Create();
                                    console.log('학번:', studentNumber);
                                    CarpoolTicket.CarpoolTicket[0].student_number = UserInfo.Driver[0].student_number;
                                    closeModal();
                                    alert("티켓 생성 하였습니다.");
                                } else {
                                    alert("입력 항목 작성 안한 부분 있습니다.");
                                }
                            }} 
                            style={
                                {
                                    backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'black', width: 337, height: 60, alignItems :'center', justifyContent: 'center' 
                                }
                            }>
                                <Text style={{color: 'black'}}>생성하기</Text>
                        </TouchableOpacity>
                    </View>
                
                </Animated.View>
                </KeyboardAwareScrollView>
                    </TouchableWithoutFeedback>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0 ,0 ,0 , 0.4)",
        

        
        
        
    },
    background: {
        flex: 1,
        


    },
    bottomSheetContainer: {
        height: 900,
        backgroundColor:"white", 
        justifyContent : 'space-around',
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    
        
    },
    container: {
        flex: 4,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,



    }
})

export default BottomSheet;