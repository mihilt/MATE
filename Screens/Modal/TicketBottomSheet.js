import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../Database/DatabaseConfig/firebase';
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
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

import { FontAwesome } from '@expo/vector-icons'; 
import { UserInfo } from'../../Database/Data/User/userInfo';
// 아이콘(원격주소) 불러오기
import { Fontisto } from '@expo/vector-icons';
import { getPendingResultAsync } from 'expo-image-picker';
import { Touchable } from 'react-native';

const TicketBottomSheet = (props) => {


    const { ticketModalVisible, setTicketModalVisible, userDoc, data, setData,showCarpoolTicket, showTaxiTicket, Read, carpoolCount, UserInfo, navigation, FindOverlay  } = props;
    // 자기가 만든 티켓을 삭제할때 사용할 state이다.

    let default_data = {
        "arrival_area": "", // 출발지
        "carpool_id": 1000, // 카풀아이디
        "day": "2022/05/03", // 일자
        "depart_area": "", // 출발지
        "department": "", // 학과,
        "arrival_time": "",
        "departure_time": "30분", // 도착시간
        "nickname": "", // 성명
        "recruitment_count": 0, // 모집인원 0~4명
        "pesinger_count": 0,
        "ticket_name": "카풀", // 티켓 카풀
        "open_chat": "",
        "open_chat_password": "",
        "pesinger_info": [],
    };

    const [ deleted, setDeleted ] = useState(false);
    // 오픈채팅 보여줄지
    const [ openChat, setOpenChat ] = useState(false);

    // 수정 할때 사용할 state 출발지, 도착지
    const [ arrivalText, setArrivalText ] = useState('');
    const [ departText, setDepartText ] = useState('');

    // 탑승했으면 다른 티켓에 드라이버, 패신저 탑승 못하도록 state로 사용 할 예정. 중복 -> overlap
    const [ recruitmentOverlap, setRecruitmentOverlap ] = useState(false);
    //let driverTicketOverlap = false;
    const [ driverTicketOverlap, setDriverTicketOverlap ] = useState(false);

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

    let ticket_info;


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

    useEffect(() => {
        ReadData();
    }, []);

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
    //console.log('현재 탑승인원 : ', data.recruitment_count);
    

    const ReadData = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
        .then(
            (snapshot) => {
                if (snapshot.exists) {
                    ticket_info = snapshot.data();
                    for (let i = 0; i < ticket_info.CarpoolTicket.length; i++) {
                        for (let j = 0; j < ticket_info.CarpoolTicket[i].pesinger_info.length; j++) {
                            if (ticket_info.CarpoolTicket[i].pesinger_info[j].student_number === UserInfo.Driver[0].student_number 
                                && ticket_info.CarpoolTicket[i].pesinger_info[j].nickname === UserInfo.Driver[0].nickname) {
                                    setRecruitmentOverlap(true); // 드라이버 유저가 패신저로 탑승 할때 다른 티켓에서 탑승 하였다. 중복
                            } else if (ticket_info.CarpoolTicket[i].pesinger_info[j].student_number === UserInfo.Pesinger[0].student_number
                                && ticket_info.CarpoolTicket[i].pesinger_info[j].nickname === UserInfo.Pesinger[0].nickname) {
                                    setRecruitmentOverlap(true); // 패신저 유저가 다른 티켓에서 탑승 하였다. 중복
                            }
                        }
                    }
                    if (UserInfo.Driver[0].auth === 'driver') {
                        for (let i = 0; i < ticket_info.CarpoolTicket.length; i++) {
                            if (ticket_info.CarpoolTicket[i].student_number === UserInfo.Driver[0].student_number && ticket_info.CarpoolTicket[i].nickname === UserInfo.Driver[0].nickname) {
                                setDriverTicketOverlap(true);                            
                                break;
                            }
                        }
                    }
                    
                }
            }
        )
    }

    const TicketDelete = () => {
        if ((data.ticket_name === '카풀') && (UserInfo.Driver[0].nickname === data.nickname)) {
            const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

            updateDoc(myDoc, {CarpoolCount: userDoc.CarpoolCount-1, CarpoolTicket : arrayRemove(data)});
            alert('삭제 하였습니다.');
            Read();
            showCarpoolTicket();
            setDeleted(true);
            setDriverTicketOverlap(false);
            FindOverlay();
        }
        else if (UserInfo.Driver[0].nickname != data.nickname) {
            alert('삭제 못하였습니다.');
            setDeleted(false);
        }
    }

    // 탑승하기 버튼 클릭하면 탑승자 추가 된다.
    const addRecruitment = () => {

        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
        .then(
            (snapshot) => {
                if (snapshot.exists) {
                    ticket_info = snapshot.data();
                    for (let i = 0; i < ticket_info.CarpoolTicket.length; i++) {
                        for (let j = 0; j < ticket_info.CarpoolTicket[i].pesinger_info.length; j++) {
                            if (ticket_info.CarpoolTicket[i].pesinger_info[j].student_number === UserInfo.Driver[0].student_number 
                                && ticket_info.CarpoolTicket[i].pesinger_info[j].nickname === UserInfo.Driver[0].nickname) {
                                    setRecruitmentOverlap(true); // 드라이버 유저가 패신저로 탑승 할때 다른 티켓에서 탑승 하였다. 중복
                            } else if (ticket_info.CarpoolTicket[i].pesinger_info[j].student_number === UserInfo.Pesinger[0].student_number
                                && ticket_info.CarpoolTicket[i].pesinger_info[j].nickname === UserInfo.Pesinger[0].nickname) {
                                    setRecruitmentOverlap(true); // 패신저 유저가 다른 티켓에서 탑승 하였다. 중복
                            }
                        }
                    }
                    if (UserInfo.Driver[0].auth === 'driver') {
                        for (let i = 0; i < ticket_info.CarpoolTicket.length; i++) {
                            if (ticket_info.CarpoolTicket[i].student_number === UserInfo.Driver[0].student_number && ticket_info.CarpoolTicket[i].nickname === UserInfo.Driver[0].nickname) {
                                setDriverTicketOverlap(true);                            
                                break;
                            }
                        }
                    }
                    
                }
            }
        )
        .catch(error => alert(error.message))
        
        if (data === undefined && data.pesinger_info === null) {
            if ((defult_data.ticket_name === '카풀') && (UserInfo.Pesinger[0].auth === 'pesinger')) {

                if (default_data.pesinger_count < default_data.recruitment_count) {
                    updateDoc(myDoc, { CarpoolTicket : arrayRemove(default_Pdata) });
                    default_data.pesinger_count += 1;
                    default_data.pesinger_info.push({ student_number : UserInfo.Pesinger[0].student_number, nickname : UserInfo.Pesinger[0].nickname, department : UserInfo.Pesinger[0].department});
                    updateDoc(myDoc, { CarpoolTicket : arrayUnion(default_data) });
                    alert('탑승인원 추가 하였습니다.');
                    Read();
                    showCarpoolTicket();
                } else {
                    alert('탑승인원 초과 했습니다.');
                }
            } 
        } else if (recruitmentOverlap != true && driverTicketOverlap != true) {
            if ((data.ticket_name === '카풀') && (UserInfo.Pesinger[0].auth === 'pesinger')) {
                
                if (data.pesinger_count >= data.recruitment_count) {
                    alert('탑승인원 초과 했습니다.')
                }

                for (let i = 0; i < data.pesinger_count; i++) {
                    if (data.pesinger_info[i].student_number === UserInfo.Pesinger[0].student_number) {
                        alert('탑승 한적 있습니다.');
                        return;
                    } 
                }
                if (data.pesinger_count < data.recruitment_count) {
                    updateDoc(myDoc, { CarpoolTicket : arrayRemove(data) });
                    data.pesinger_count += 1;
                    data.pesinger_info.push({ student_number : UserInfo.Pesinger[0].student_number, nickname : UserInfo.Pesinger[0].nickname, department : UserInfo.Pesinger[0].department});
                    updateDoc(myDoc, { CarpoolTicket : arrayUnion(data)});
                    alert('탑승인원 추가 하였습니다.');
                    Read();
                    showCarpoolTicket();
                } else {

                }
            } else if ( data.nickname != UserInfo.Driver[0].nickname && UserInfo.Driver[0].auth === 'driver' && driverTicketOverlap === false) {
                const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");
                        
                if (data.pesinger_count >= data.recruitment_count) {
                    alert('탑승인원 초과 했습니다.')
                }
                for (let i = 0; i < data.pesinger_count; i++) {
                    if (data.pesinger_info[i].student_number === UserInfo.Driver[0].student_number) {
                        alert('탑승 한적 있습니다. ');
                        return;
                    } 
                }
                if (data.pesinger_count < data.recruitment_count) {
                    updateDoc(myDoc, { CarpoolTicket : arrayRemove(data) });
                    data.pesinger_count += 1;
                    data.pesinger_info.push({ student_number : UserInfo.Driver[0].student_number, nickname : UserInfo.Driver[0].nickname, department : UserInfo.Driver[0].department});
                    updateDoc(myDoc, { CarpoolTicket : arrayUnion(data)});
                    alert('탑승인원 추가 하였습니다.');
                    Read();
                    showCarpoolTicket();
                }
            } else {
                if (data.nickname === UserInfo.Driver[0].nickname) {
                    alert('자신 만든 티켓입니다.');
                }
            }
        } else {
            alert('탑승한 티켓이 존재합니다.');
            setRecruitmentOverlap(false);
            setDriverTicketOverlap(false);
            return;
        }
    }

    const ShowTicketRecruitmentButton = () => {
        if (data === undefined) {
            if (default_data.student_number != UserInfo.Driver[0].student_number && default_data.nickname != UserInfo.Driver[0].nickname) {
                return (
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            onPress={() => {
                                closeModal();
                                addRecruitment();
                            }
                        }
                            style={{width: '100%', alignItems: 'center'}}
                        >
                            <Text style={{fontWeight: 'bold'}}>탑승하기</Text>
                        </TouchableOpacity>
                    </View> 
                );
            } else {
                return (
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            onPress={() => {
                                closeModal();
                                TicketDelete();
                            }
                        }
                            style={{width: '100%', alignItems: 'center'}}
                        >
                            <Text style={{fontWeight: 'bold'}}>삭제하기</Text>
                        </TouchableOpacity>
                    </View> 
                );
            }
        } else {
            if (data.student_number != UserInfo.Driver[0].student_number && data.nickname != UserInfo.Driver[0].nickname) {
                return (
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            onPress={() => {
                                closeModal();
                                addRecruitment();
                            }
                        }
                            style={{width: '100%', alignItems: 'center'}}
                        >
                            <Text style={{fontWeight: 'bold'}}>탑승하기</Text>
                        </TouchableOpacity>
                    </View> 
                );
            } else {
                return (
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            onPress={() => {
                                closeModal();
                                TicketDelete();
                            }
                        }
                            style={{width: '100%', alignItems: 'center'}}
                        >
                            <Text style={{fontWeight: 'bold'}}>삭제하기</Text>
                        </TouchableOpacity>
                    </View> 
                );
            }
        }
    }

    // const ShowUpdateTicketButton = () => {
    //     if (data === undefined) {
    //         if (default_data.student_number === UserInfo.Driver[0].student_number && default_data.nickname === UserInfo.Driver[0].nickname) {
    //             return (
    //                 <View style={styles.button_container}>
    //                     <TouchableOpacity
    //                         onPress={() => {
    //                             closeModal();
    //                             navigation.navigate("TicketUpdateScreen");
    //                     }}
    //                         style={{width: '100%', alignItems: 'center'}}
    //                     >
    //                         <Text style={{fontWeight: 'bold'}}>수정하기</Text>
    //                     </TouchableOpacity>
    //                 </View> 
    //             );
    //         }
    //     } else {
    //         if (data.student_number === UserInfo.Driver[0].student_number && data.nickname === UserInfo.Driver[0].nickname) {
    //             return (
    //                 <View style={styles.button_container}>
    //                     <TouchableOpacity
    //                         onPress={() => {
    //                             closeModal();
    //                             navigation.navigate("TicketUpdateScreen");
    //                         }
    //                     }
    //                         style={{width: '100%', alignItems: 'center'}}
    //                     >
    //                         <Text style={{fontWeight: 'bold'}}>수정하기</Text>
    //                     </TouchableOpacity>
    //                 </View> 
    //             );
    //         }
    //     }
    // }

    const RecruitmentCountOneColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 1) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        } else {
            if (data.recruitment_count != 1) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        }
    }
    const RecruitmentCountTwoColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 2) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        } else {
            if (data.recruitment_count != 2) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        }
    }
    const RecruitmentCountThreeColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 3) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        } else {
            if (data.recruitment_count != 3) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        }
    }
    const RecruitmentCountFourColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 4) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        } else {
            if (data.recruitment_count != 4) {
                return (
                    {
                        backgroundColor: '#C4C4C4',
                        padding: '2%', 
                        paddingHorizontal: '4.5%', 
                        borderRadius: 20
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: '#315EFF',
                        padding: '2%',
                        paddingHorizontal: '4.5%',
                        borderRadius: 20
                    }
                )
            }
        }
    }

    const RecruitmentCountTextOneColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 1) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        } else {
            if (data.recruitment_count != 1) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        }
    }


    const RecruitmentCountTextTwoColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 2) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        } else {
            if (data.recruitment_count != 2) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        }
    }

    const RecruitmentCountTextThreeColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 3) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        } else {
            if (data.recruitment_count != 3) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        }
    }

    const RecruitmentCountTextFourColor = () => {
        if (data === undefined) {
            if (default_data.recruitment_count != 4) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
            }
        } else {
            if (data.recruitment_count != 4) {
                return (
                    {
                        color: 'gray',
                        fontWeight: 'bold'
                    }
                );
            } else {
                return (
                    {
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }
                );
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
                    <View style={styles.container}>
                        <View style={styles.header}>

                                <View style={styles.start_local}>
                                    <FontAwesome style={{backgroundColor: 'white',}} name="circle" size={15} color="#587DFF" />
                                    <View style={styles.start_text_container}>
                                        <Text style={styles.start_text}>출발지</Text>
                                    </View>

                                    <View style={styles.arrival_area_container}>
                                        <View style={styles.arrival_area}>
                                            <Text style={default_data.arrival_area != '항공관' ? {padding: 10, paddingHorizontal: 25, color: '#FFFFFF',fontWeight: 'bold'} : {padding: 10, paddingHorizontal: 20, color: '#FFFFFF',fontWeight: 'bold'}}>{data === undefined ? default_data.arrival_area : data.arrival_area}</Text>
                                        </View>
                                    </View>
                                </View>


                            <View style={styles.end_local}>
                                <FontAwesome style={{backgroundColor: 'white',}} name="circle" size={15} color="#587DFF" />
                                <View style={styles.end_text_container}>
                                    <Text style={styles.start_text}>도착지</Text>
                                </View>

                                <View style={styles.depart_area_container}>
                                    <View style={styles.depart_area}>
                                        <Text style={default_data.depart_area != '항공관' ? {padding: 10, paddingHorizontal: 25, color: '#FFFFFF',fontWeight: 'bold'} : {padding: 10, paddingHorizontal: 20, color: '#FFFFFF',fontWeight: 'bold'}}>{data === undefined ? default_data.depart_area : data.depart_area}</Text>
                                    </View>
                                </View>                            
                            </View>
                        
                        </View>
                        
                        <View style={styles.body}>
                            <View style={styles.recruitment_count_container}>
                                <View style={styles.recruitment_count_text_container}>
                                    <Text style={styles.recruitment_count_text}>인원</Text>
                                </View>

                                <View style={styles.recruitment_count}>
                                    <View style={RecruitmentCountOneColor()}>
                                        <Text style={RecruitmentCountTextOneColor()}>1</Text>
                                    </View>
                                    <View style={RecruitmentCountTwoColor()}>
                                        <Text style={RecruitmentCountTextTwoColor()}>2</Text>
                                    </View>
                                    <View style={RecruitmentCountThreeColor()}>
                                        <Text style={RecruitmentCountTextThreeColor()}>3</Text>
                                    </View>
                                    <View style={RecruitmentCountFourColor()}>
                                        <Text style={RecruitmentCountTextFourColor()}>4</Text>
                                    </View>                                                            
                                </View>
                            </View>




                            <View style={{flexDirection: 'row', flex: 1,}}>
                                <View style={styles.arrival_time_text}>
                                    <Text style={{fontWeight: 'bold'}}>출발 시간</Text>
                                </View>
                                <View style={styles.arrival_time_container}>
                                    <Text>{data === undefined ? default_data.arrival_time : data.arrival_time}</Text>
                                </View>
                            </View>
                
                            <View style={{flexDirection: 'row', flex: 1,}}>
                                <View style={styles.estimated_time_text}>
                                    <Text style={{fontWeight: 'bold'}}>예상 소요시간</Text>
                                </View>
                                
                                <View style={styles.estimated_time_conatainer}>
                                    <Text>{data === undefined ? default_data.departure_time : data.departure_time}</Text>
                                </View>
                            </View>


                            <View style={styles.driver_info_container}>
                                <View>
                                    <Text>{data === undefined ? default_data.nickname : data.nickname}</Text>
                                    <Text>{data === undefined ? default_data.department : data.department}</Text>
                                </View>
                        </View>

                        </View>
                        <View style={styles.recruitment_button_container}>
                            {ShowTicketRecruitmentButton()}
                        </View>   
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
        flex: 2,
        // justifyContent: "center",
        // alignItems: "center",
        
    },
    header: {
        flex: 1,
        width: "90%",
        justifyContent: "space-around",
        left: 6,


    },
    container: {
        flex:1,
        backgroundColor:"white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    },
    start_local: {
        width: "60%",
        flexDirection: 'row',
        borderColor: '#C4C4C44F',
        alignItems: 'center',
        justifyContent: "space-around",
        
    },
   

    end_local: {
        width: "60%",
        flexDirection: 'row',
        borderColor: '#C4C4C44F',
        alignItems: 'center',
        justifyContent: "space-around",
    
        
    },
    start_text_container: {

    },

    start_text: {
        fontSize: 13,
        fontWeight: 'bold',
    },

    end_text_container: {


    },

    end_text: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    arrival_area_container: {

    },
    arrival_area: {
        backgroundColor: '#315EFF',
        borderRadius: 15,
    },

    depart_area_container: {



    },

    body: {
        flex: 2,
        width: "90%",
        justifyContent: "space-around",
        alignSelf: "center",
        

    },

    depart_area: {
        backgroundColor: '#315EFF',
        borderRadius: 15,

    },
    recruitment_count_container: {
        flex: 1,
        flexDirection: 'row',
        
    },

    recruitment_count_text_container: {
        backgroundColor: '#C4C4C4',
        borderRadius: 15,
        height: 30,
        alignSelf: "center",
        flex:0.3,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    recruitment_count_text: {
        fontWeight: 'bold',


    },

    recruitment_count: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        
    },
    time_container: {
        backgroundColor:"blue",

    },
    arrival_time_text: {
        backgroundColor: '#C4C4C4',
        height: 30,
        alignSelf: "center",
        flex:0.3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 15
        
    },

    arrival_time_container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 2,
        borderColor: '#C4C4C44F',

    },

    estimated_time_text: {
        backgroundColor: '#C4C4C4',
        flex: 0.3,
        height: 30,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },

    estimated_time_conatainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 2,
        borderColor: '#C4C4C44F',
        
    },

    driver_info_container: {

        flexDirection: 'row',
        alignItems: 'center'
    },

    driver_charater: {
        backgroundColor: '#C4C4C4',
        marginLeft: '32%',
        padding: '2%',
        borderRadius: 15
    },

    recruitment_button_container: {
        flex:1,
        alignItems: 'center',
        justifyContent: "space-evenly",
    },

    button_container: {
        backgroundColor: '#FFFFFF',
        width: '70%', height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10
    }
})

export default TicketBottomSheet;