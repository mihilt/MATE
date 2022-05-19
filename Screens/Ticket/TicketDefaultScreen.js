import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
// 아이콘(원격주소)
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//firebase
import { db } from '../../Database/DatabaseConfig/firebase';
import { doc, getDoc } from 'firebase/firestore';
// 회원정보 데이터
import { UserInfo } from'../../Database/Data/User/userInfo';

export default function TicketDefaultScreen({navigation})  {


    const ShowName = () => {
        if (UserInfo.Driver[0].auth != "") {
            return UserInfo.Driver[0].nickname;
        } else {
            return UserInfo.Pesinger[0].nickname;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.text}>새로운 만남이{"\n"}{ShowName()}님을{"\n"} 기다리고 있어요</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{paddingHorizontal: 30}}
                    onPress={() => navigation.navigate("Main")}
                >
                    <Ionicons name="home" size={24} color="black" />
                </TouchableOpacity>
                
                <View style={{paddingHorizontal: 30}}>
                    <Ionicons onPress={() => navigation.navigate("TicketScreen")} name="card-outline" size={30} color="black" />
                </View>
        
                <TouchableOpacity 
                    style={{paddingHorizontal: 30}}
                    onPress={() => navigation.navigate("ProfileScreen")}
                >
                    <FontAwesome name="user-circle-o" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create( {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        text_container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }, 
        text: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        footer: {
            height: 80,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderWidth: 0.3,
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        
    }
);