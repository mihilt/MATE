// 모듈 불러오는 부분, 현재 수정중
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Image } from "react-native";
// 아이콘(원격주소) 불러오기
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg";

export default function Main({ navigation, route }) { 
    // State
    // modal state
    const [ isDriverPesingerModal, setIsDriverPesingerModal ] = useState(false);
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ toggleCarpoolList, setToggleCarpoolList ] = useState(true);
    
    const toggleModal = () => {
        //setIsModalVisible(prev => !prev);
        setIsModalVisible(!isModalVisible);
    }

    const dirverPensingerModal = () => {
        setIsDriverPesingerModal(!isDriverPesingerModal);
    }

    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
    console.log(typeof SCREEN_HEIGHT);
    return (
        <View style={(isModalVisible === true || isDriverPesingerModal === true) ? { flex:1, backgroundColor: 'black', opacity: 0.8, paddingLeft: 20, paddingRight: 20,} : styles.container}>
            <View style={isModalVisible === true || isDriverPesingerModal === true ? {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 120, opacity: 0.1} :  styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logo_text}>MATE</Text>
                </View>
                <View style={{width: 120}}/>
                <TouchableOpacity>
                    <Ionicons name="md-person-circle-outline" size={30} color="#909090" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="settings" size={24} color="#909090" />
                </TouchableOpacity>
            </View>
            <View style={ isModalVisible === true || isDriverPesingerModal === true ? {height: 380, opacity: 0.1} : styles.main}>
                <View style={{paddingLeft: 20, paddingRight: 20}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("LocalSettingFirst")}
                        style={styles.local_setting}
                    >
                        <View style={styles.local_display}>
                            <MaterialCommunityIcons name="map-marker-outline" size={24} color="#007AFF"/>
                            <Text style={styles.local_display_text}>지역설정</Text>            
                            <Text style={styles.local_name}>테스트 지역</Text>
                            <AntDesign name="right" size={24} color="#909090" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.carpool_section}
                        onPress={() => navigation.navigate("TicketScreen", {firstLocal: "인동", secondLocal: "경운대학교"})}
                    >
                        <View style={styles.local_display}>
                            <Ionicons name="car-outline" size={24} color="#007AFF"/>
                            <Text style={styles.carpool_display_text}>카풀 모집하기</Text>
                            <Text style={styles.carpool_people}>00</Text>
                            <Text style={styles.carpool_unit}>명</Text>
                            <AntDesign name="right" size={24} color="#909090" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.carpool_list_section}
                        onPress={() => setToggleCarpoolList(e => !e)}
                    >
                        <View style={styles.local_display}>
                            <Svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3 3H17C17.5523 3 18 3.44772 18 4V7H21C21.5523 7 22 7.44772 22 8V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V4C2 3.44772 2.44772 3 3 3ZM4 5V18C4 18.5523 4.44772 19 5 19H16.1707C16.0602 18.6872 16 18.3506 16 18V8V5H4ZM18 9V18C18 18.5523 18.4477 19 19 19C19.5523 19 20 18.5523 20 18V9H18ZM6 8C6 7.44772 6.44772 7 7 7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H7C6.44772 9 6 8.55228 6 8ZM9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H9Z"
                                fill="#007AFF"
                            />
                            </Svg>
                            <Text style={styles.carpool_list_display_text}>카풀 목록</Text>
                            <AntDesign name={toggleCarpoolList ? 'down' : 'up'} size={24} color="#909090" />
                        </View>
                    </TouchableOpacity>
                </View>
                {toggleCarpoolList && <View style={styles.carpool_list}>
                    <TouchableOpacity style={styles.carpool_list_ticket_display}>
                        <View style={styles.profile_image}></View>
                        <View style={styles.carpool_list_ticket_display_title}>
                            <View style={styles.carpool_list_ticket_content}>
                                <View style = {{flexDirection: 'row'}}>
                                    <Text>안동 출발</Text>
                                    <Text>{' / '}</Text>
                                    <Text style = {{color: '#007AFF', fontWeight: '600'}}>무료</Text>
                                </View>
                                <Text style={styles.carpool_list_ticket_time}>8월 24일, 오전 8시 30분</Text>
                            </View>
                            <View style={styles.carpool_list_passenger_chip}>
                                <Text style={styles.carpool_list_passenger_chip_text}>1/4</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.carpool_list_ticket_display}>
                        <View style={styles.profile_image}></View>
                        <View style={styles.carpool_list_ticket_display_title}>
                            <View style={styles.carpool_list_ticket_content}>
                                <View style = {{flexDirection: 'row'}}>
                                    <Text>안동 출발</Text>
                                    <Text>{' / '}</Text>
                                    <Text style = {{color: 'red', fontWeight: '600'}}>유료</Text>
                                </View>
                                <Text style={styles.carpool_list_ticket_time}>8월 24일, 오전 11시</Text>
                            </View>
                            <View style={styles.carpool_list_passenger_chip}>
                                <Text style={styles.carpool_list_passenger_chip_text}>1/4</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.carpool_list_ticket_display}>
                        <View style={styles.profile_image}></View>
                        <View style={styles.carpool_list_ticket_display_title}>
                            <View style={styles.carpool_list_ticket_content}>
                                <View style = {{flexDirection: 'row'}}>
                                    <Text>경운대학교 출발</Text>
                                    <Text>{' / '}</Text>
                                    <Text style = {{color: 'red', fontWeight: '600'}}>유료</Text>
                                </View>
                                <Text style={styles.carpool_list_ticket_time}>8월 25일, 오후 6시</Text>
                            </View>
                            <View style={styles.carpool_list_passenger_chip_full}>
                                <Text style={styles.carpool_list_passenger_chip_text}>4/4</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>}
            </View>

            <Modal animated="slide" visible={isDriverPesingerModal} transparent={true}>
                <View style={styles.DriverPesingerModal}>
                    <View style={styles.DriverPesingerModalView}>
                        <View style={{alignItems: 'flex-end', paddingRight: 17, marginBottom: 10, marginTop: 10}}>
                            <TouchableOpacity 
                                onPress={dirverPensingerModal}
                                style={{flexDirection: 'row'}}>
                                <AntDesign name="close" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row',  flex: 1, paddingLeft: 17, paddingRight: 17, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: "40%", alignItems: 'center'}}>
                                <View style={{width: "40%", alignItems: 'center', marginBottom: 15}}>                                    
                                    <Fontisto name="taxi" size={26.5} color="black" />                                    
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsDriverPesingerModal(!isDriverPesingerModal);
                                        setTimeout(() => {
                                            navigation.navigate("TicketScreen", {firstLocal: "인동", secondLocal: "경운대학교"});
                                        }, 300);
                                    }}
                                >
                                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>타세요</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: "40%", alignItems: 'center'}}>
                                <View style={{width: "40%", alignItems: 'center', marginBottom: 15}}>                                    
                                    <Ionicons name="person-add" size={24} color="black" />                                    
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsDriverPesingerModal(!isDriverPesingerModal);
                                        setTimeout(() => {
                                            navigation.navigate("TicketScreen", {firstLocal: "인동", secondLocal: "경운대학교"});
                                        }, 300);
                                    }}
                                >
                                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>태워주세요</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animated="slide" visible={isModalVisible} transparent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{alignItems: 'flex-end', paddingRight: 17, marginBottom: 10, marginTop: 10}}>
                            <TouchableOpacity 
                                onPress={toggleModal}
                                style={{flexDirection: 'row'}}>
                                <AntDesign name="close" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', paddingLeft: 17, paddingRight: 17, height: 30,  alignItems: 'center', justifyContent: 'space-between',}}>
                            <Text>리스트</Text>
                            <View style={styles.list_container_text_container}>
                                <Text>내역</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* <View style={styles.footer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("BordingList")}
                    style={styles.list_container}>
                    <Text>리스트</Text>
                    <View style={styles.list_container_text_container}>
                        <Text>내역</Text>
                    </View>
                </TouchableOpacity>
            </View> */}
            <View style={styles.footer}>
                <View
                    style={styles.footer_button}
                >
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        예약된 카풀이 없어요!
                    </Text>
                </View>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ecf0f1',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 120,
        paddingLeft: 20,
        paddingRight: 20,
    },

    logo: {

    },

    logo_text: {
        fontSize: 35,
        color: '#007AFF',
        fontWeight: 'bold',
    },

    main: {
        height: 380,
    },

    local_setting: {
        backgroundColor: '#FFFFFF',
        height: 60,
        paddingLeft: 20, 
        paddingRight: 17,
        borderRadius: 20,
    },

    local_display: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 17,
    },

    local_display_text: {
        width: 70,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: '600'
    },

    carpool_display_text: {
        width: 210,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: '600'
    },

    carpool_list_display_text: {
        width: 250,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: '600'
    },

    ticket_create: {
        backgroundColor: '#FFFFFF',
        height: 69,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 27,
        borderRadius: 20,
        marginTop: 17
    },

    carpool_list: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 37, 
        paddingRight: 17,
        paddingTop: 27,
    },

    carpool_list_title: {
        marginBottom: 27,
    },

    carpool_list_ticket_display: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center'
    },

    profile_image: {
        width: 40,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
    },

    carpool_list_ticket_display_title: {
        flexDirection: 'row',
        width: 255,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
    },

    carpool_list_ticket_display_title_driver: {
        width: 37,
        height: 21,
        backgroundColor: '#3B67FF',
    },

    carpool_list_ticket_display_title_pesinger: {
        width: 37,
        height: 21,
        backgroundColor: '#A8BBFF',
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
    },

    list_container: {
        backgroundColor: '#FFFFFF',
        flex: 0.3,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingLeft: 17, 
        paddingRight: 17,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    list_container_text_container: {
        backgroundColor: '#D9D9D9',
        height: 25,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    DriverPesingerModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },

    DriverPesingerModalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: SCREEN_HEIGHT-320,
        shadowColor: '#000',
        //그림자의 영역 지정
        shadowOffset: {
          width: 0,
          height:2
        },
        //불투명도 지정
        shadowOpacity: 0.25,
        //반경 지정
        shadowRadius: 3.84,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop:22,
        paddingLeft: 20,
        paddingRight: 20,
        

    },
    
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        height: SCREEN_HEIGHT-320,
        shadowColor: '#000',
        //그림자의 영역 지정
        shadowOffset: {
          width: 0,
          height:2
        },
        //불투명도 지정
        shadowOpacity: 0.25,
        //반경 지정
        shadowRadius: 3.84,
    },

    carpool_section: {
        backgroundColor: '#FFFFFF',
        height: 60,
        paddingLeft: 20, 
        paddingRight: 17,
        borderRadius: 20,
        marginTop: 5
    },

    carpool_list_section: {
        height: 60,
        paddingLeft: 20, 
        paddingRight: 17,
        borderRadius: 20,
        marginTop: 5
    },

    carpool_people: {
        width: 20
    },

    carpool_unit: {
        fontSize: 15,
        paddingRight: 10
    },

    local_name: {
        fontSize: 15,
        textAlign: 'right',
        paddingRight: 10,
        width: 180
    },

    carpool_list_passenger_chip: {
        backgroundColor: '#007AFF',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 20,
    },

    carpool_list_passenger_chip_full: {
        backgroundColor: '#D9D9D9',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 20,
    },

    carpool_list_passenger_chip_text: {
        color: 'white',
        fontWeight: '600'
    },

    carpool_list_ticket_content: {
        paddingLeft: 5
    },

    carpool_list_ticket_time: {
        fontSize: 15,
    },

    footer_button: {
        justifyContent: 'flex-end',
        backgroundColor: '#007AFF',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 20
    }

});