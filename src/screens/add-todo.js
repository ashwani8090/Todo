import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const AddItem = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);

    const _retrieveData =
        async () => {
            try {

                const values = await AsyncStorage.getItem('todos');
                if (values !== null) {
                    console.log(values)
                    setTodos(JSON.parse(values))
                }
            } catch (error) {
                console.log(error)
            }
        };


    useEffect(() => {
        _retrieveData()
    }, [])

    const handleAddItem = async () => {
        if (title) {
            try {
                const newItem = { id: new Date().getTime(), duration: new Date().getTime(), title }
                let todoList = [...todos]
                todoList.push(newItem)
                await AsyncStorage.setItem('todos', JSON.stringify(todoList))
                handleCancel();
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleCancel = () => {
        navigation.navigate('Task')
    }

    return (
        <View style={styles.body}>
            <TextInput style={styles.inputbox} placeholder="title" onChangeText={(text) => setTitle(text)}></TextInput>
            <View style={styles.flexContainer}>
                <TouchableOpacity onPress={handleCancel} style={[styles.button]}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleAddItem} style={[styles.button, styles.confirmBtn]}><Text style={styles.confirmText}>Confirm</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between'
    },
    inputbox: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'grey',
        margin: 10,
        padding: 10
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        flexGrow: 1,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'grey',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

export default AddItem;