import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

const EditTodo = ({ visible, onHide = () => { }, onComplete = () => { }, data }) => {
    const [title, setTitle] = useState('');

    useEffect(() => { setTitle(data?.title) }, [data?.title])

    return (
        (visible ? <View style={styles.body}>
            <View style={styles.alertBox}>
                <Text style={[styles.cancelText, { fontSize: 22 }]}>Edit</Text>
                <TextInput value={title} style={styles.inputbox} placeholder="title" onChangeText={(text) => setTitle(text)}></TextInput>
                <View style={styles.flexContainer}>
                    <TouchableOpacity onPress={onHide} style={[styles.button]}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { title && onComplete({ ...data, title }) }} style={[styles.button, styles.confirmBtn]}><Text style={styles.confirmText}>Complete</Text></TouchableOpacity>
                </View>
            </View>
        </View> :
            <></>))
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgba(0 ,0, 0, 0.5)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: 15
    },
    alertBox: {
        backgroundColor: '#ffffff',
        height: 200,
        display: 'flex',
        borderRadius: 10,
        justifyContent: 'space-between',
        padding: 10
    },
    inputbox: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'grey',
        padding: 10
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'grey',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%'
    },
    confirmBtn: {
        backgroundColor: 'black',
    },
    confirmText: {
        color: '#ffffff',
        fontSize: 14
    },
    cancelText: {
        color: '#000000',
        fontSize: 14
    }
})

export default EditTodo;