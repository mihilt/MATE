// 모듈 불러오는 부분, 현재 수정중
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// 아이콘(원격주소) 불러오기
import { AntDesign } from '@expo/vector-icons';

import SelectList from 'react-native-dropdown-select-list'

export default function LocalSettingFirst({ navigation, route }) { 

  // 드롭메뉴 State
  const [ selected, setSelected ] = useState("");
  const localData = ["경운대학교", "인동", "옥계"];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main")}
          >
            <AntDesign name="left" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.title}>
            <Text style={styles.title_text}>지역을 선택해 주세요</Text>
          </View>
          <View style={styles.local_dropmenu_container}>
            <SelectList 
              setSelected={setSelected}
              data={localData}
              onSelect={() => alert(selected)}
              placeholder="지역1"
              search={false}
            /> 
          </View>
          <SelectList 
              setSelected={setSelected}
              data={localData}
              onSelect={() => alert(selected)}
              placeholder="지역2"
              search={false}
            /> 
        </View>
        <View style={styles.footer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Main")}
            style={styles.next_btn}>
            <Text style={styles.next_btn_text}>설정완료</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,

    },
    header: {
      height: 120,
      flexDirection: 'row',
      alignItems: 'center',
    },  

    title_text: {
      fontSize: 25,
      fontWeight: 'bold',
    },

    local_dropmenu: {
      width: 100,
      height: 30,
      borderBottomWidth: 0.5,
    }, 

    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 60,
    },

    local_dropmenu_container: {
      flexDirection: 'column',
      marginTop: 30,
      height: 180,
    },
    
    next_btn: {
      height: 50,
      backgroundColor: '#3B67FF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },

    next_btn_text: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },  
});