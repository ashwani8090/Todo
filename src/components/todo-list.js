import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from 'react-native'

import { TodoItem } from ".";

const TodoList = ({ tab, data, handleActionOnItem = () => { } }) => {
    const [todoItem, setTodoItem] = useState([]);

    useEffect(() => {
        setTodoItem(data)
    }, [todoItem?.length, data])

    return (
        <>
            <FlatList
                contentContainerStyle={styles.flexGrow}
                data={data}
                renderItem={({ item }) => {
                    return (<TodoItem
                        data={item}
                        tab={tab}
                        onCheckBoxSelection={() => handleActionOnItem('CHECKBOX', item)}
                        onEdit={() => handleActionOnItem('EDIT', item)}
                        onDelete={() => handleActionOnItem('DELETE', item)}
                        onComplete={() => handleActionOnItem('COMPLETE', item)}
                    />);
                }}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    <View style={[styles.flexGrow, styles.emptyContainer]}>
                        <Text>{"No items to display. Please press “Add” to add new items."}</Text>
                    </View>
                }
            />
        </>
    )
}


const styles = StyleSheet.create({
    flexGrow: {
        flexGrow: 1,
        marginHorizontal: 16,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: { color: 'grey', fontSize: 15 },
    flatlistContainer: {
        flexGrow: 1,
        paddingHorizontal: '5',
    },
});

export default TodoList;