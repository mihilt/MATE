import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export default function DiclationScreen({ navigation }) {
    const [reportable, setReportable] = useState(false);
    const [reason, setReason] = useState();
    const [etcContent, setEtcContent] = useState('');

    const selectReason = (select) => {
        setReportable(true);
        setReason(select);
        if (select !== 3) {
            setEtcContent('');
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ marginTop: 31 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('BordingList')}
                            style={{ width: 35, height: 35, justifyContent: 'center' }}>
                            <AntDesign name='left' size={25} color='black' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>신고하시는 이유가 무엇일까요?</Text>
                </View>
                <View style={styles.reason_section}>
                    <Text
                        style={reason === 0 ? styles.reason_selected_text : styles.reason_text}
                        onPress={() => {
                            selectReason(0);
                        }}>
                        카풀 돈을 받지 못했어요
                    </Text>
                    <Text
                        style={reason === 1 ? styles.reason_selected_text : styles.reason_text}
                        onPress={() => {
                            selectReason(1);
                        }}>
                        성희롱을 해요
                    </Text>
                    <Text
                        style={reason === 2 ? styles.reason_selected_text : styles.reason_text}
                        onPress={() => {
                            selectReason(2);
                        }}>
                        욕설, 비속어를 사용해요
                    </Text>
                    <Text
                        style={reason === 3 ? styles.reason_selected_text : styles.reason_text}
                        onPress={() => {
                            selectReason(3);
                        }}>
                        기타 (하단에 내용 작성)
                    </Text>
                </View>
                <View style={styles.form}>
                    <View style={{ height: 100, flexDirection: 'row', marginTop: 10 }}>
                        <View style={[styles.selectListContainer, { marginRight: 15 }]}>
                            <TextInput
                                maxLength={200}
                                editable={reason === 3}
                                multiline={true}
                                textAlignVertical='top'
                                value={etcContent}
                                onChange={(e) => {
                                    setEtcContent(e.nativeEvent.text);
                                }}
                                placeholder='불편했던 점들을 자세히 작성해주세요.'
                                style={{
                                    borderWidth: 1,
                                    width: Dimensions.get('window').width - 40,
                                    height: 100,
                                    paddingLeft: 10,
                                    borderColor: 'gray',
                                    backgroundColor: reason === 3 ? 'white' : '#E0E0E0'
                                }}
                            />
                        </View>
                    </View>
                    <View alignItems='flex-end'>
                        <Text style={{ color: '#909090' }}>{etcContent.length} / 200</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.button_container}>
                        <TouchableOpacity
                            disabled={!reportable}
                            onPress={async () => {
                                if (etcContent.length !== 0) {
                                    const res = await axios.post('http://3.37.159.244:8080/ReportBoard/new', {
                                        "wirterStudentId": "201702003",
                                        "wirterEmail": "zonins3@gmail.com",
                                        "reportStudentId": "201602005",
                                        "content": etcContent,
                                    })
                                    alert('신고 접수 했습니다.');
                                }
                                
                                navigation.navigate('Main');
                            }}
                            style={
                                reportable
                                    ? styles.button_container_next_button
                                    : styles.button_container_next_button_disabled
                            }>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>
                                신고하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },

    header: {
        flex: 0.21,
        justifyContent: 'center',
        marginBottom: 20
    },

    title_container: {
        justifyContent: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    stepbar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },

    stepbar_container_first_step: {
        width: 95,
        height: 5.5,
        backgroundColor: '#3B67FF'
    },

    stepbar_container_second_step: {
        width: 95,
        height: 5.5,
        backgroundColor: '#d9d9d9'
    },

    form: {
        flex: 0.4
    },

    form_container: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center'
    },

    form_label_text: {
        fontWeight: 'bold',
        width: 60
    },

    startpoint_first_dropmenu: {
        width: 80,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10
    },

    endpoin_first_dropmenu: {
        width: 80,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10
    },

    selectListContainer: {
        width: 105
    },

    second_dropmenu: {
        width: 130,
        borderColor: 'gray',
        borderBottomWidth: 1
    },

    form_input: {
        width: 250,
        borderColor: 'gray',
        borderBottomWidth: 1
    },

    footer: {
        flex: 0.5,
        justifyContent: 'flex-end'
    },

    message_container: {
        flex: 0.2,
        justifyContent: 'center'
    },

    message_container_text: {
        fontSize: 10,
        color: '#989595'
    },

    button_container: {
        flex: 0.3,
        justifyContent: 'center',
        marginBottom: 20
    },

    button_container_next_button: {
        backgroundColor: '#3B67FF',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },

    button_container_next_button_disabled: {
        backgroundColor: '#B0B0B0',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },

    reason_text: {
        color: '#202020',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },

    reason_section: {
        marginTop: 15
    },

    reason_selected_text: {
        color: '#3B67FF',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    }
});
