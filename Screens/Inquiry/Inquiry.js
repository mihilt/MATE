import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Inquiry({ navigation }) {
    const [ inquiryData, setInquiryData ] = useState();
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQwMDc1MjIsImV4cCI6MTY2NDA5MzkyMn0.WG6xx-sqh9ljJKoPyDioJldK4LjwOnWsjkewcvB998aas1l3_7JWelnuHGPvgny6vLK1GFO8TNh4AdIcsizbhA'
    
    
    useEffect(() => {
        axios.get('http://3.37.159.244:8080/QuestionBoard' , { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                console.log("문의 데이터 : ", res);
            })
            .catch((error) => console.warn(error));

        //const res = await axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
        //console.log("문의 데이터 res2: ", res2);
        //setInquiryData(res1);    
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <AntDesign name='left' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>문의내역</Text>
            {/* 문의내역 데이터 없을 경우 */}
            {/* <View style={[styles.item_view, styles.item_empty]}>
                <Text style={styles.empty_inquiry}>최근 문의 내역이 없어요</Text>
            </View> */}
            <View style={[styles.item_view, styles.item_exist]}>
                <View style={styles.item_wrapper}>
                    <Text style={styles.item_date}>22.08.01</Text>
                    <Text style={styles.item_title}>오류 신고합니다.</Text>
                    <Text>왜 와이파이에서만 접속되죠? 데이터로는 접속이 불가해요.</Text>
                </View>
                <View style={styles.item_wrapper}>
                    <Text style={styles.item_date}>22.08.01</Text>
                    <Text style={styles.item_title}>오류 신고합니다.</Text>
                    <Text>왜 와이파이에서만 접속되죠? 데이터로는 접속이 불가해요.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    header: {
        paddingTop: 45,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },

    title: {
        paddingTop: 48,
        position: 'absolute',
        alignSelf: 'center'
    },

    item_view: {
        backgroundColor: '#E0E0E0',
        flex: 1
    },

    item_empty: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    empty_inquiry: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    item_exist: {
        padding: 20
    },

    item_wrapper: {
        marginBottom: 15,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15
    },

    item_date: {
        color: '#404040',
        textAlign: 'right'
    },

    item_title: {
        fontSize: 16,
        paddingBottom: 10
    }
});
