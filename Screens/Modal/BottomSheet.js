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
    TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
import { UserInfo } from'../../Database/Data/User/userInfo';
import { CarpoolTicket } from'../../Database/Data/Ticket/carpoolData';

const BottomSheet = (props) => {
    const { modalVisible, setModalVisible, startInputText, endInputText, setStartInputText, setEndInputText, ticket, setTicket, Create, Read, showCarpoolTicket, showTaxiTicket} = props;
    //const [ button, setButton ] = useState(0);
    
    const [ arrivaltime, setArrivalTime ] = useState("");
    const [ departtime, setDepartTime ] = useState("");

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
        })
    }

    const setStartLocalSelect = () => {
        if (button === 1) {
            setStartInputText('인동');
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 2) {
            setStartInputText('옥계');
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 3) {
            setStartInputText('본관');
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 4) {
            setStartInputText('항공관');
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
    }

    const setEndLocalSelect = () => {
        if (button === 1) {
            setEndInputText('인동');
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 2) {
            setEndInputText('옥계');
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 3) {
            setEndInputText('본관');
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 4) {
            setEndInputText('항공관');
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
    }

    const loacte = ['경운대학교', '인동', '옥계']; // 지역 선택 목록들
    let button = 0;

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <View style={{backgroundColor:'white', marginTop: 10, borderRadius: 30, flex: 0.19,}}>
                        
                        <View>
                            <View style={{marginTop: 10, marginRight: 60, flexDirection : 'row', justifyContent:'space-between', alignItems: 'center', height: '40%'}}>
                            <FontAwesome style={{backgroundColor: 'white',marginLeft: 20,}} name="circle" size={15} color="#587DFF" />
                            <Text>출발지</Text>
                            <TouchableOpacity onPress={() => { button = 1; setStartLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>인동</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 2; setStartLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>옥계</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 3; setStartLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>본관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 4; setStartLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>항공관</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                            <View style={{ marginRight: 60, flexDirection : 'row', justifyContent:'space-between', alignItems: 'center', height: '20%' }}>
                            <FontAwesome style={{backgroundColor: 'white',marginLeft: 20,}} name="circle" size={15} color="#587DFF" />
                            <Text>도착지</Text>
                            <TouchableOpacity onPress={() => { button = 1; setEndLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>인동</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 2; setEndLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>옥계</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 3; setEndLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>본관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 4; setEndLocalSelect();}} style={{backgroundColor: 'rgba(196, 196, 196, 0.31)', width: 81, height: 27, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black'}}>항공관</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{backgroundColor: 'white', flex:0.6, justifyContent : 'space-evenly'}}>

                        <View style={{backgroundColor: 'white', height: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 35,}}>
                            <View style = {{borderRadius: 10, width: 81, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>모집인원</Text>
                            </View> 

                           <TouchableOpacity 
                                onPress={() => UserInfo.Driver[0].recruitment_count = 1}
                                style= {{backgroundColor: "rgba(196, 196, 196, 0.31)", borderRadius: 30, width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{color : 'black'}}>1</Text>
                            </TouchableOpacity>

                           <TouchableOpacity 
                                onPress={() => UserInfo.Driver[0].recruitment_count = 2}
                                style= {{backgroundColor: "rgba(196, 196, 196, 0.31)", borderRadius: 30, width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{color : 'black'}}>2</Text>
                            </TouchableOpacity>

                           <TouchableOpacity 
                                onPress={() => UserInfo.Driver[0].recruitment_count = 3}
                                style= {{backgroundColor: "rgba(196, 196, 196, 0.31)", borderRadius: 30, width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{color : 'black'}}>3</Text>
                            </TouchableOpacity>

                           <TouchableOpacity 
                                onPress={() => UserInfo.Driver[0].recruitment_count = 4}
                                style= {{backgroundColor: "rgba(196, 196, 196, 0.31)", borderRadius: 30, width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{color : 'black',}}>4</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{height: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style = {{borderRadius: 10, width: 81, height : 30, backgroundColor :"rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>출발시간</Text>
                            </View> 
                            <Input 
                                containerStyle={{width: '65%', }} 
                                value={CarpoolTicket.CarpoolTicket[0].arrival_time}
                                onChangeText={(text) => setArrivalTime(CarpoolTicket.CarpoolTicket[0].arrival_time = text)}
                            />
                        </View>

                        <View style={{height: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style = {{borderRadius: 10, width: 81, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>오픈채팅</Text>
                            </View> 
                            <Input 
                                containerStyle={{width: '65%', }}
                                onChangeText={(text) => CarpoolTicket.CarpoolTicket[0].open_chat = text} 
                            />    
                        </View>

                        <View style={{backgroundColor: 'white', height: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            
                            <View style = {{borderRadius: 10, width: 81, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                <Text>비밀번호</Text>
                            </View> 
                            <Input 
                                containerStyle={{width: '65%', }}
                                onChangeText={(text) => CarpoolTicket.CarpoolTicket[0].open_chat_password = text}
                            />
                        </View>
                    </View>

                    <View style={{flex:0.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => { Create(); closeModal(); alert("티켓 생성 하였습니다.");}} style={{backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'black', width: 337, height: 60, alignItems :'center', justifyContent: 'center' }}><Text style={{color: 'black'}}>생성하기</Text></TouchableOpacity>
                    </View>

                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
        
    },
    background: {
        flex: 1,

    },
    bottomSheetContainer: {
        height: '60%',
        width: '100%',
        backgroundColor: 'white',
        justifyContent : 'space-around',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    }
})

export default BottomSheet;