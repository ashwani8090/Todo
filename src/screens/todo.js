import React, { useState, useCallback, useEffect } from "react";
import { TabView, TabBar } from 'react-native-tab-view';

import { BottomTab, TodoList, EditTodoModal } from "../components";
import AsyncStorage from '@react-native-community/async-storage';


const Todo = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [todoList, setTodoList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isActioned, setIsActioned] = useState(false);
    const [isCheckBoxSelected, setCheckBoxIsSelected] = useState(false);
    const routes = [
        {
            key: 'PENDING',
            title: 'Pending',
        },
        {
            key: 'COMPLETED',
            title: 'Completed',
        },
        {
            key: 'OVERDUE', title:
                'Overdue'
        },
    ];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (selectedItem) {
            setVisible(true)
        }
    }, [selectedItem]);

    useEffect(() => {
        if (isActioned) {
            saveData();
            setCheckBoxIsSelected(todoList.some(({ checked }) => checked))

        }
    }, [todoList?.length, isActioned])

    async function fetchData() {
        try {
            const values = await AsyncStorage.getItem('todos');
            if (values !== null) {
                setTodoList(JSON.parse(values))
            }
        } catch (error) {
            console.log('>>>', error)
        }
    }

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todoList));
            setIsActioned(false);
        } catch (err) {
            console.log(err)
        }
    }


    const renderScene = useCallback(
        ({ route }) => {
            switch (route.key) {
                case 'PENDING':
                    return (
                        <TodoList tab="PENDING" handleActionOnItem={handleAction} data={todoList.filter((item) => { if ((new Date().getTime() - item.duration) / 1000 < 10 && !item.completed) { return item; } })} />
                    );
                case 'COMPLETED':
                    return (
                        <TodoList tab="COMPLETED" handleActionOnItem={handleAction} data={todoList.filter(({ completed }) => completed)} />

                    );
                case 'OVERDUE':
                    return (
                        <TodoList tab="OVERDUE" handleActionOnItem={handleAction} data={todoList.filter((item) => { if ((new Date().getTime() - item.duration) / 1000 > 10 && !item.completed) { return item; } })} />
                    );

                default:
                    return null;
            }
        },
        [index, navigation, todoList?.length],
    );


    const _onPress = () => {
        saveData();
        navigation.navigate('Add')
    }

    const handleMultipleItemAction = useCallback((action) => {
        if (action === 'DELETE') {
            setTodoList((prev) => {
                prev = prev.filter(({ checked }) => !checked);
                return prev;
            })
        } else if (action === 'COMPLETE') {
            setTodoList((prev) => {
                prev = prev.map((todo) => { if (todo.checked) { todo['completed'] = true; } return todo; })
                return prev;
            })
            setVisible(false)
        }
        setIsActioned(true);
    })

    const handleAction = useCallback((action, item) => {
        if (action === 'EDIT') {
            setSelectedItem(item)
        } else if (action === 'DELETE') {
            setTodoList((prev) => {
                prev = prev.filter(({ id }) => id != item.id);
                return prev;
            })
        } else if (action === 'COMPLETE') {
            setTodoList((prev) => {
                prev = prev.map((todo) => { if (todo.id == item.id) { todo['completed'] = true; } return todo; })
                return prev;
            })
            setVisible(false)
        } else if (action === 'CHECKBOX') {
            setTodoList((prev) => {
                prev = prev.map((todo) => {
                    if (todo.id == item.id) {
                        const selected = !(todo['checked'] ? true : false);
                        todo['checked'] = selected;
                    }
                    return todo;
                })
                return prev;
            })
        }
        setIsActioned(true);
    }, []);



    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={true}
                renderTabBar={props => <TabBar {...props} style={{ backgroundColor: 'black' }} />} // <-- add this line
            />
            <EditTodoModal data={selectedItem} onComplete={(item) => { handleAction('COMPLETE', item) }} visible={visible} onHide={() => { setVisible(false) }} />
            <BottomTab multiple={isCheckBoxSelected} tabIndex={index} handleBtnPress={_onPress} handleAction={handleMultipleItemAction} />
        </>)
}

export default Todo;