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
import { CarpoolTicket } from '../../Database/Data/Ticket/carpoolData';
// 아이콘(원격주소) 불러오기
import { Fontisto } from '@expo/vector-icons';

const TicketBottomSheet = (props) => {

    const { ticketModalVisible, setTicketModalVisible, userDoc, setUserDoc, data, setData, showCarpoolTicket, showTaxiTicket, Read, carpoolCount, UserInfo } = props;
    // 자기가 만든 티켓을 삭제할때 사용할 state이다.
    const [ deleted, setDeleted ] = useState(false);

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
                    <View>
                        <Text>티켓 정보</Text>
                        <TouchableOpacity onPress={addRecruitment}><Text>탑승 하기</Text></TouchableOpacity>
                        <TouchableOpacity onPress={ticketDelete}>
                            <View>
                                {(deleted) ? <Fontisto name="trash" size={24} color="black" />: null}
                            </View>
                        </TouchableOpacity>
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    
        
    }
})

export default TicketBottomSheet;