import React from "react";
import { View, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { Icon } from "react-native-elements/dist/Icon";

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
                    title={data?.title}
                    checked={data?.checked}
                    onPress={() => { onCheckBoxSelection(data) }}
                />
                <View style={styles.row}>
                    <Icon name="delete" onPress={onDelete} />
                    <Icon name="edit" onPress={onEdit} />
                    {tab != 'COMPLETED' ? <Icon name="check" onPress={onComplete} /> : null}
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
        padding: 10
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
    }
})

export default TodoItem;