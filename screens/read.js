import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import * as SecureStore from 'expo-secure-store';
import { Icon } from "react-native-elements"
import localstory from "../story";

export default function read() {

    const [contentType, setcontentType] = useState(false);
    const [Story, setStory] = useState("");
    const [moral, setmoral] = useState("");
    const [author, setauthor] = useState("");
    const [refreshed, setrefreshed] = useState(false)
    const [randomStory, setrandomStory] = useState(Math.round(Math.random() * 6));

    function refresh() {
        setrandomStory(Math.round(Math.random() * 6) + 1);
    }

    async function getValueFor(key, vari) {
        return (await SecureStore.getItemAsync(key));
    }

    async function getValue() {
        setStory(await getValueFor("story"));
        setmoral(await getValueFor("moral"));
        setauthor(await getValueFor("author"));
        console.log("returned")
    }

    async function intialize() {
        getValue().then(() => {
            setTimeout(() => {
                if (!Story) {
                    setcontentType(true);
                    console.log("ok1");
                } else {
                    setcontentType(false);
                    console.log("ok2");
                    ToastAndroid.showWithGravity(
                        "You don't have any story",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }, 100)
            setrefreshed(true)
        })
    }
    useEffect(() => {
        intialize();
    }, []);

    return (
        <View style={{ width: "100%", hieght: "100%" }}>
            {refreshed ? (
                Story && contentType ? (
                    <ScrollView scrollEnabled contentContainerStyle={styles.container} keyboardDismissMode={"on-drag"}>
                        <View style={{ backgroundColor: "#ca9", borderRadius: 10, margin: 40, padding: 20 }}>
                            <Text style={{ fontSize: 19 }}>{Story}</Text>
                            {moral ? (<Text style={{ color: "#060" }}>{"\n"}Moral: {moral}</Text>) : (<View />)}
                            {author ? (
                                <Text style={{ alignSelf: "flex-end", color: "#555" }}>Author: {author}</Text>
                            ) : (
                                <View />
                            )}
                        </View>
                        <TouchableOpacity onPress={() => { setcontentType(false); }} style={{ elevation: 2, backgroundColor: "#fff", padding: 10, borderRadius: 6 }}>
                            <Text>LOCAL STORIES</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )
                    : (
                        <View>
                            <ScrollView scrollEnabled contentContainerStyle={styles.container} keyboardDismissMode={"on-drag"}>
                                <View style={{ backgroundColor: "#ca9", borderRadius: 10, margin: 40, padding: 20 }}>
                                    <Text style={{ fontSize: 19 }}>{localstory[randomStory].story}</Text>
                                    <Text style={{ color: "#060" }}>{"\n"}Moral: {localstory[randomStory].moral}</Text>
                                    {localstory[randomStory].author ? (
                                        <Text style={{ alignSelf: "flex-end", color: "#555" }}>Author: {localstory[randomStory].author}</Text>
                                    ) : (
                                        <View />
                                    )}
                                </View>
                                <TouchableOpacity onPress={() => { intialize(); }} style={{
                                    elevation: 2, backgroundColor: "#fff", padding: 10, borderRadius: 6
                                }}>
                                    <Text>MY STORIES</Text>
                                </TouchableOpacity>
                            </ScrollView>
                            <Icon
                                raised
                                brand
                                reverse
                                reverseColor={"#000"}
                                name='refresh'
                                type='font-awesome'
                                color='#5a0'
                                onPress={() => { refresh() }}
                                containerStyle={{ elevation: 2, position: "absolute", zIndex: 1, alignSelf: "flex-end", transform: [{ translateX: -30 }, { translateY: 40 }] }} />
                        </View>
                    )) : (
                <View>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>)}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 50
    },
});
