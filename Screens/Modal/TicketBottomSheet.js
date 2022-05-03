import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../Database/DatabaseConfig/firebase';
import { doc, updateDoc, FieldValue, arrayRemove, serverTimestamp, arrayUnion, setDoc } from 'firebase/firestore';
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
} from 'react-native';

import { UserInfo } from'../../Database/Data/User/userInfo';
// 아이콘(원격주소) 불러오기
import { Fontisto } from '@expo/vector-icons';

const TicketBottomSheet = (props) => {

    const { ticketModalVisible, setTicketModalVisible, userDoc, setUserDoc, data, setData, showCarpoolTicket, showTaxiTicket, Read, carpoolCount, UserInfo } = props;
    // 자기가 만든 티켓을 삭제할때 사용할 state이다.
    const [ deleted, setDeleted ] = useState(false);

    // 수정 할때 사용할 state 출발지, 도착지
    const [arrivalText, setArrivalText] = useState('');
    const [departText, setDepartText] = useState('');

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
        if(props.ticketModalVisible) {
            resetBottomSheet.start();
            findDelete();
        }
    }, [props.ticketModalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setTicketModalVisible(false);
        })
    }

    // findDelete 함수는 자기 티켓만 삭제 할수있도록 setDeleted state true,false로 권한을 준다.
    // nickname으로 비교하지만 추후에 학번으로 바꾸고자 한다. 
    const findDelete = () => {
        if (data.nickname === UserInfo.UserInfo[0].nickname) {
            setDeleted(true);
        }
        else {
            setDeleted(false);
        }
    }

    console.log('카풀 티켓 수 : ', userDoc.CarpoolCount);
    console.log('택시 티켓 수 : ', userDoc.TaxiCount);
    console.log('사용자 : ', UserInfo.UserInfo[0]);
    //console.log('현재 탑승인원 : ', data.recruitment_count);
    
    const ticketDelete = () => {
        if ((data.ticket_name === '카풀') && (UserInfo.UserInfo[0].nickname === data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
            //console.log('ticket : ', data);
            updateDoc(myDoc, {CarpoolCount: userDoc.CarpoolCount-1, CarpoolTicket : arrayRemove(data)});
            alert('삭제 하였습니다.');
            Read();
            showCarpoolTicket();
            setDeleted(true);
        }
        //console.log("티켓 모달 : ", userDoc.CarpoolTicket);
        else if ((data.ticket_name === '택시') && (UserInfo.UserInfo[0].nickname === data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
            updateDoc(myDoc, {TaxiCount: userDoc.TaxiCount-1, TaxiTicket : arrayRemove(data)});
            alert('삭제 하였습니다.');
            Read();
            showCarpoolTicket();
            setDeleted(true)
        }
        else if (UserInfo.UserInfo[0].nickname != data.nickname) {
            alert('삭제 못하였습니다.');
            setDeleted(false);
        }
    }

    // 탑승하기 버튼 클릭하면 탑승자 추가 된다.
    const addRecruitment = () => {
        if ((data.ticket_name === '카풀') && (UserInfo.UserInfo[0].nickname != data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
            
            //console.log('ticket : ', data);
            if (data.recruitment_count < 4) {
                
                updateDoc(myDoc, { CarpoolTicket : arrayRemove(data) });
                data.recruitment_count += 1;
            
                updateDoc(myDoc, {CarpoolTicket : arrayUnion(data)});
                alert('탑승인원 추가 하였습니다.');
                Read();
                showCarpoolTicket();
            } else {
                alert('탑승인원 초과 했습니다.');
            }
            
        }
        else if ((data.ticket_name === '택시') && (UserInfo.UserInfo[0].nickname != data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
            
            //console.log('ticket : ', data);
            if (data.recruitment_count < 4) {

                updateDoc(myDoc, { TaxiTicket : arrayRemove(data) });
                data.recruitment_count += 1;
            
                updateDoc(myDoc, {TaxiTicket : arrayUnion(data)});
                alert('탑승인원 추가 하였습니다.');
                Read();
                showCarpoolTicket();
            } else {
                alert('탑승인원 초과 했습니다.');
            }
        }
    }

    // 출발지, 도착지수정 실행 하는 함수
    const setArrivalUpdate = (btn_id) => {
        // btn_id : 1 경운대학교, btn_id : 2 인동, btn_id : 3 옥계
        if (btn_id === 1) {
            setArrivalText('경운대학교');
        } else if (btn_id === 2) {
            setArrivalText('인동');
        } else if (btn_id === 3) {
            setArrivalText('옥계');
        }
    }

    const setDepartUpdate = (btn_id) => {
        // btn_id : 1 경운대학교, btn_id : 2 인동, btn_id : 3 옥계
        if (btn_id === 1) {
            setDepartText('경운대학교');
        } else if (btn_id === 2) {
            setDepartText('인동');
        } else if (btn_id === 3) {
            setDepartText('옥계');
        }
    }

    const setUpdate = () => {
        if ((data.ticket_name === '카풀') && (UserInfo.UserInfo[0].nickname === data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
            
            //console.log('ticket : ', data);
            updateDoc(myDoc, { CarpoolTicket : arrayRemove(data) });
            data.arrival_area = arrivalText;
            data.depart_area = departText;
            updateDoc(myDoc, {CarpoolTicket : arrayUnion(data)});
            alert('수정 하였습니다.');
            Read();
            showCarpoolTicket();
        }
        else if ((data.ticket_name === '택시') && (UserInfo.UserInfo[0].nickname === data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "CarpoolTicketDocument");
            
            updateDoc(myDoc, { TaxiTicket : arrayRemove(data) });
            data.arrival_area = arrivalText;
            data.depart_area = departText;
            updateDoc(myDoc, {TaxiTicket : arrayUnion(data)});
            alert('수정 하였습니다.');
            Read();
            showTaxiTicket();
        }

    }

    // 수정 모드 : 수정을 출발지, 도착지만 수정 하겠다.
    const updateTextDisplay = () => {
    
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Text style={{fontSize: 22}}>수정 하기</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Text style={{marginRight: 15, marginLeft: 25}}>출발지 선택</Text>
                    <Fontisto name="arrow-right-l" size={24} color="black" />
                    <TouchableOpacity style={{backgroundColor: '#315EFF', marginLeft: 10, marginRight: 10, padding: 5, borderRadius: 10}}onPress={() => setArrivalUpdate(1)}><Text style={{marginHorizontal: 10, color: '#FFFFFF'}}>경운대학교</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#315EFF', marginRight: 10, padding: 5, borderRadius: 10}}onPress={() => setArrivalUpdate(2)}><Text style={{marginHorizontal: 10, color: '#FFFFFF'}}>인동</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#315EFF', marginRight: 10, padding: 5, borderRadius: 10}}onPress={() => setArrivalUpdate(3)}><Text style={{marginHorizontal: 10, color: '#FFFFFF'}}>옥계</Text></TouchableOpacity>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Text style={{marginRight: 10, }}>도착지 선택</Text>
                    <Fontisto name="arrow-right-l" size={24} color="black" />
                    <TouchableOpacity style={{backgroundColor: '#315EFF', marginLeft: 10, marginRight: 10, padding: 5, borderRadius: 10}}onPress={() => setDepartUpdate(1)}><Text style={{marginHorizontal: 10, color: '#FFFFFF'}}>경운대학교</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#315EFF', marginRight: 10, padding: 5, borderRadius: 10}}onPress={() => setDepartUpdate(2)}><Text style={{marginHorizontal: 10, color: '#FFFFFF'}}>인동</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#315EFF', marginRight: 10, padding: 5, borderRadius: 10}}onPress={() => setDepartUpdate(3)}><Text style={{marginHorizontal: 10, color: '#FFFFFF'}}>옥계</Text></TouchableOpacity>
                </View>
                <View style={{marginTop: 20, backgroundColor: '#315EFF', padding: 10, paddingHorizontal: 20, borderRadius: 13}}>
                    <TouchableOpacity onPress={() => setUpdate()}><Text style={{fontSize: 20, color: '#FFFFFF'}}>수정</Text></TouchableOpacity>
                </View>
            </View>
             
        );    
    }

    return (
        <Modal
            visible={ticketModalVisible}
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
                    <View style={{flex: 0.45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 22, marginLeft: 150}}>티켓 정보</Text>
                        <View style={{marginRight: 20}}>
                            <TouchableOpacity onPress={ticketDelete}>
                                <View>
                                    {(deleted) ? <Fontisto name="trash" size={24} color="black" />: null}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{fontSize: 15, marginRight: 10}}>탑승 하기</Text>
                        <Fontisto style={{marginRight: 20}} name="arrow-right-l" size={24} color="black" />
                        <TouchableOpacity onPress={addRecruitment}><Fontisto style={{marginRight: 120}} name="car" size={35} color="black" /></TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, marginRight: 10}}>오픈 채팅방 이름 : {UserInfo.Driver[0].open_chat}</Text>
                        <Text style={{fontSize: 15, marginRight: 10}}>오픈 채팅방 비밀번호 : {UserInfo.Driver[0].open_chat_password}</Text>
                    </View>
                    <View>
                        {(deleted) ? updateTextDisplay() : null}
                    </View>

                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: 300,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    
        
    }
})

export default TicketBottomSheet;