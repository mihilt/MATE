import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Setting({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <AntDesign name='left' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>설정</Text>
            <View>
                <Text style={styles.large_category}>문의</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("InquiryScreen")}>
                <Text style={styles.category}>1:1 문의</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Inquiry")}>
                <Text style={styles.category}>문의내역</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('로그아웃')}>
                <Text style={styles.large_category}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('회원탈퇴')}>
                <Text style={styles.large_category}>회원탈퇴</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20
    },

    header: {
        paddingTop: 45,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        paddingTop: 48,
        position: 'absolute',
        alignSelf: 'center'
    },

    large_category: {
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 15,
        fontWeight: 'bold',
        fontSize: 15
    },

    category: {
        paddingRight: 10,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10
    }
});
