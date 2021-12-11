import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from "react-native-elements/dist/Icon";

const BottomTab = ({
    handleAction = () => { },
    handleBtnPress = () => { },
    multiple,
    tabIndex }) => {

    return (
        <View style={[styles.body]}>
            {multiple ? <View style={[styles.row, { marginBottom: 10 }]}>
                <Icon name="delete" onPress={() => handleAction("DELETE")} />
                {tabIndex != 1 ? <Icon name="check" onPress={() => handleAction("COMPLETE")} /> : null}
                {tabIndex != 0 && tabIndex != 2 ? <Icon name="edit" onPress={() => handleAction("EDIT")} /> : null}
            </View> : null}
            <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleBtnPress}>
                <View>
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </View>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        height: 40,
        width: 110,
        backgroundColor: "#151617",
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 3,
        borderLeftWidth: 2,
        marginVertical: 1,
    },
    row: {
        flexDirection: 'row'
    }
})

export default BottomTab;