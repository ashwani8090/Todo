import React from "react";
import { View, StyleSheet, Text } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { Icon } from "react-native-elements/dist/Icon";

import Constant from "../utils/constant";

const TodoItem = ({
    tab,
    data,
    onDelete = () => { },
    onEdit = () => { },
    onComplete = () => { },
    onCheckBoxSelection = () => { }
}) => {
    return (
        <View style={styles.body}>
            <View style={[styles.row, styles.contentbody]} >
                <CheckBox
                    containerStyle={styles.checkboxContainer}
                    title={data?.title}
                    checked={data?.checked}
                    onPress={() => { onCheckBoxSelection(data) }}
                />
                <Text>Duration:60 sec</Text>
                <View style={styles.row}>
                    <Icon name="delete" onPress={onDelete} />
                    <Icon name="edit" onPress={onEdit} />
                    {tab != Constant.COMPLETE ? <Icon name="check" onPress={onComplete} /> : null}
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    body: {
        height: 80,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 10,
        margin: 10,
        display: 'flex',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    taskText: {
        color: '#000000',
        fontSize: 18,
    },
    row: {
        display: 'flex', flexDirection: 'row'
    },
    contentbody: {
        alignItems: 'center', justifyContent: 'space-between'
    },
    checkboxContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0
    }
})

export default TodoItem;