import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomSheet = (props) => {
    const { modalVisible, setModalVisible, startInputText, endInputText, setStartInputText, setEndInputText, ticket, setTicket, Create, Read, showCarpoolTicket, showTaxiTicket} = props;
    //const [ button, setButton ] = useState(0);

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
            Create();
            Read();
            Read();
            showCarpoolTicket();
            showTaxiTicket();
        })
    }

    const setStartLocalSelect = () => {
        if (button === 1) {
            setStartInputText('경운대학교');
            console.log('modal console : ', startInputText);
            console.log(button);
        }
        else if (button === 2) {
            setStartInputText('인동');
            console.log('modal console : ', startInputText);
            console.log(button);
        }
        else if (button === 3) {
            setStartInputText('옥계');
            console.log('modal console : ', startInputText);
            console.log(button);
        }
        else if (button === 4) {
            setTicket('카풀');
        }
        else if (button === 5) {
            setTicket('택시');
        }
    }

    const setEndLocalSelect = () => {
        if (button === 1) {
            setEndInputText('경운대학교');
            console.log('modal console : ', startInputText);
            console.log(button);
        }
        else if (button === 2) {
            setEndInputText('인동');
            console.log('modal console : ', startInputText);
            console.log(button);
        }
        else {
            setEndInputText('옥계');
            console.log('modal console : ', startInputText);
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
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginRight: 5}}>
                        <View style={{marginBottom: 10}}><Text>출발지 선택</Text></View>
                        <TouchableOpacity onPress={() => { button = 1; setStartLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 50, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>경운대학교</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { button = 2; setStartLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>인동</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { button = 3; setStartLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>옥계</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { button = 4; setStartLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>카풀</Text></TouchableOpacity>

                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                        <View style={{marginBottom: 10}}><Text>도착지 선택</Text></View>
                        <TouchableOpacity onPress={() => { button = 1; setEndLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 50, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>경운대학교</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { button = 2; setEndLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>인동</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { button = 3; setEndLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>옥계</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { button = 5; setStartLocalSelect();}} style={{backgroundColor: 'green', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 10, marginVertical: 5}}><Text>택시</Text></TouchableOpacity>
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
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row'
        
    }
})

export default BottomSheet;