import React, { useState, useCallback, useEffect } from "react";
import { TabView, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-community/async-storage';

import { BottomTab, TodoList, EditTodoModal } from "../components"
import Constants from "../utils/constant";

const Todo = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [todoList, setTodoList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isActioned, setIsActioned] = useState(false);
    const [isCheckBoxSelected, setCheckBoxIsSelected] = useState(false);
    const routes = [
        {
            key: Constants.PENDING,
            title: 'Pending',
        },
        {
            key: Constants.COMPLETE,
            title: 'Completed',
        },
        {
            key: Constants.OVERDUE,
            title: 'Overdue'
        },
    ];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (isActioned) {
            saveData();
            setCheckBoxIsSelected(todoList.some(({ checked }) => checked))
        }
    }, [todoList?.length, isActioned])

    useEffect(() => {
        if (index == 0) {
            setCheckBoxIsSelected(todoList.some((item) =>
                (new Date().getTime() - item.duration) / 1000 < 60 && !item.completed && item.checked))
        } else if (index == 1) {
            setCheckBoxIsSelected(todoList.some((item) =>
                item.completed && item.checked))

        } else if (index == 2) {
            setCheckBoxIsSelected(todoList.some((item) =>
                (new Date().getTime() - item.duration) / 1000 > 60 && !item.completed && item.checked))
        }
    }, [index])

    async function fetchData() {
        try {
            const values = await AsyncStorage.getItem('todos');
            if (values !== null) {
                setTodoList(JSON.parse(values))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todoList));
            setIsActioned(false);
        } catch (err) {
            console.error(err)
        }
    }


    const renderScene = useCallback(
        ({ route }) => {
            switch (route.key) {
                case Constants.PENDING:
                    return (
                        <TodoList tab={Constants.PENDING} handleActionOnItem={handleAction} data={todoList.filter(pending)} />
                    );
                case Constants.COMPLETE:
                    return (
                        <TodoList tab={Constants.COMPLETE} handleActionOnItem={handleAction} data={todoList.filter(complete)} />

                    );
                case Constants.OVERDUE:
                    return (
                        <TodoList tab={Constants.OVERDUE} handleActionOnItem={handleAction} data={todoList.filter(overdue)} />
                    );

                default:
                    return null;
            }
        },
        [index, navigation, todoList?.length],
    );

    const pending = (item) => ((new Date().getTime() - item.duration) / 1000 < 60 && !item.completed)
    const overdue = (item) => ((new Date().getTime() - item.duration) / 1000 > 60 && !item.completed)
    const complete = (item) => (item.completed)

    const _onPress = () => {
        saveData();
        navigation.navigate('Add')
    }

    const handleMultipleItemAction = useCallback((action) => {
        if (action === Constants.DELETE) {
            console.log(todoList.filter(complete))

            setTodoList((prev) => {
                let filteredArray = []
                if (index == 0) {
                    filteredArray = prev.filter(pending)
                } else if (index == 1) {
                    filteredArray = prev.filter(complete)
                } else if (index == 2) {
                    filteredArray = prev.filter(overdue)
                }
                filteredArray = filteredArray.map((item) => { if (item.checked) { return item.id } });

                return prev.filter((item) => !filteredArray.includes(item.id));
            })
        } else if (action === Constants.COMPLETE) {
            setTodoList((prev) => {
                prev = prev.map((todo) => { if (todo.checked) { todo['completed'] = true; } return todo; })
                return prev;
            })
            setVisible(false)
        } else if (action === Constants.EDIT) {
            setSelectedItem(null)
            setVisible(true)
        }
        setIsActioned(true);
    }, [index])

    const handleAction = useCallback((action, item) => {
        if (action === Constants.EDIT) {
            setVisible(true)
            setSelectedItem(item)
        } else if (action === Constants.DELETE) {
            setTodoList((prev) => {
                prev = prev.filter(({ id }) => id != item.id);
                return prev;
            })
        } else if (action === Constants.COMPLETE) {
            setTodoList((prev) => {
                prev = prev.map((todo) => { if (todo.id == item.id) { todo['completed'] = true; } return todo; })
                return prev;
            })
        } else if (action === Constants.UPDATE) {
            if (item.id) {
                setTodoList((prev) => {
                    prev = prev.map((todo) => { if (todo.id == item.id) { todo.title = item.title; } return todo; })
                    return prev;
                })
            } else {
                setTodoList((prev) => {
                    prev = prev.map((todo) => { if (todo.checked) { todo.title = item.title }; return todo; })
                    return prev;
                })
            }
            setVisible(false)
        } else if (action === Constants.CHECKBOX) {
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
                renderTabBar={props => <TabBar {...props} style={{ backgroundColor: 'black' }} />}
            />
            <EditTodoModal data={selectedItem} onComplete={(item) => { handleAction(Constants.UPDATE, item) }} visible={visible} onHide={() => { setVisible(false) }} />
            <BottomTab multiple={isCheckBoxSelected} tabIndex={index} handleBtnPress={_onPress} handleAction={handleMultipleItemAction} />
        </>)
}

export default Todo;