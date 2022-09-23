// 모듈 불러오는 부분, 현재 수정중
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// 아이콘(원격주소) 불러오기
import { AntDesign } from '@expo/vector-icons';

import SelectList from 'react-native-dropdown-select-list';

import axios from 'axios';

export default function LocalSettingFirst({ navigation, route }) {

    // 드롭메뉴 State
    const [selected, setSelected] = useState('');
    const localData = ['인동', '옥계', '대구'];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {                                        
                        navigation.navigate('Main');
                    }
                }>
                    <AntDesign name='left' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <View style={styles.title}>
                    <Text style={styles.title_text}>지역을 설정해 주세요</Text>
                </View>
                <View style={styles.local_dropmenu_container}>
                    <SelectList
                        setSelected={setSelected}
                        data={localData}
                        onSelect={() => { 
                            alert(selected);
                            route.params.area = selected;
                        }}
                        placeholder='지역'
                        search={false}
                    />
                    <Text style={styles.descriptionText}>거주지를 선택해 주세요</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => { 
                        console.log(route.params.area);
                                                
                        if (selected === '') {
                            alert("지역 설정 안했습니다.")    
                        } else {
                            navigation.goBack('Main', route.params)
                        }                        
                        
                        // await axios.put('http://3.37.159.244:8080/area', {
                        //     area: selected,
                        //     },{
                        //         headers: '사용자JWT 토큰 ex)ancnjjfkslw.skdkdkfskffk.skdkdkdskdsk'
                        //     },
                        //);
                        
                    }}
                    style={styles.next_btn}>
                    <Text style={styles.next_btn_text}>설정하기</Text>
                </TouchableOpacity>
            </View>
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
        height: 120,
        flexDirection: 'row',
        alignItems: 'center'
    },

    title_text: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    local_dropmenu: {
        width: 100,
        height: 30,
        borderBottomWidth: 0.5
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40
    },

    local_dropmenu_container: {
        flexDirection: 'column',
        marginTop: 30,
        height: 180
    },

    next_btn: {
        marginTop: 80,
        backgroundColor: '#007AFF',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },

    next_btn_text: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },

    descriptionText: {
        color: '#909090',
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 12
    }
});
