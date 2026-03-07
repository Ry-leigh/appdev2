import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native"

export default function TodoScreen() {
    const [search, setSearch] = useState("")
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([
        { id: 1, text: "Learn React Native Layout", completed: false },
        { id: 2, text: "Learn React Native Core Components", completed: true },
    ]);

    const filteredTodo = todoList.filter(item => item.text.toLowerCase().includes(search.toLocaleLowerCase()));

    const addTodo = () => {
        setTodoList([
            {
                id: Date.now().toString(),
                text: todo,
                completed: false
            },
            ...todoList
        ])
        setTodo("")
    }

    const deleteTodo = (id) => {
        setTodoList(todoList.filter(item => item.id !== id))
    }

    const confirmDelete = (id) => {
        Alert.alert("Delete Todo", "Are you sure you want to delete this?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteTodo(id) }
        ])
    }

    const toggleTodo = (id) => {
        setTodoList(todoList.map(item => item.id === id ? { ...item, completed: !item.completed } : item ))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Tasks</Text>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} />
                    <TextInput placeholder="Search todos..."
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <View style={styles.formContainer}>
                <ScrollView>
                    {filteredTodo.map(item => (
                        <View style={styles.todoContainer} key={item.id}>
                            <TouchableOpacity style={styles.todoTextWrapper} onPress={() => toggleTodo(item.id)}>
                                {item.completed ? <Ionicons name="checkmark-circle" size={25} color="#7D7AFF"/> : <Ionicons name="ellipse-outline" size={25} color="#AAA"/>}
                                <Text
                                    style={[styles.todoText, item.completed && { textDecorationLine: 'line-through', color: "#AAA"}]}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >
                                    {item.text}
                                </Text>
                            </TouchableOpacity>
                        
                            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                                <Ionicons name="trash-outline" size={25} color="red"/>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            >
                <View style={styles.inputWrapper} >
                    <TextInput
                        placeholder="Add a new task"
                        style={styles.input}
                        value={todo}
                        onChangeText={setTodo}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                        <Ionicons name="add-outline" size={30} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7D7AFF',
        paddingTop: 40,
    },
    header: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20
    },
    formContainer: {
        flex: 3,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 30,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 20,
        alignItems: 'center'
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        borderColor: '#D3D3D3',
        borderWidth: 0.5,
    },
    todoTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    todoText: {
        flexShrink: 1,  
        maxWidth: "75%",
        paddingLeft: 10,
        color: "#666"
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        backgroundColor: "#FFF"
    },
    input: {
        backgroundColor: '#F0F0F0',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 14,
        width: '85%',
        marginRight: 10
    },
    addButton: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: '#FFCC00',
        justifyContent: 'center',
        alignItems: 'center',
    }
});