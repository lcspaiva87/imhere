import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Animated } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Loading } from "../components/Loading";

export default function Home() {
    const [participants, setParticipants] = useState<string>('');
    const [participantList, setParticipantList] = useState<{ id: number, name: string }[]>([]);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const saveParticipant = async () => {
        try {
            const newParticipant = { id: Date.now(), name: participants };
            const newParticipants = [...participantList, newParticipant];
            setParticipantList(newParticipants);
            const jsonValue = JSON.stringify(newParticipants);
            await AsyncStorage.setItem('participants', jsonValue);
            setParticipants('');
            Alert.alert('Participante salvo com sucesso');
        } catch (error) {
            Alert.alert('Erro ao salvar participante');
        }
    }

    const removeParticipant = async (id: number) => {
        try {
            const updatedParticipants = participantList.filter(item => item.id !== id);
            setParticipantList(updatedParticipants);
            const jsonValue = JSON.stringify(updatedParticipants);
            await AsyncStorage.setItem('participants', jsonValue);
            Alert.alert('Participante removido com sucesso');
        } catch (error) {
            Alert.alert('Erro ao remover participante');
        }
    }

    const readParticipants = async () => {
        
        try {
            setIsLoading(true);
            const value = await AsyncStorage.getItem('participants');
            if (value !== null) {
                setParticipantList(JSON.parse(value));
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            Alert.alert('Erro ao ler participantes');
        }
    }

    useEffect(() => {
        readParticipants();
    }, []);

    return (
        <View className="bg-black/90 w-full h-full p-8 space-y-6">
            <View className="space-y-2  justify-center">
                <Text className="text-white text-2xl font-bold">Nome do evento</Text>
                <Text className="text-white/30">{formattedDate}</Text>
                <View className="flex flex-row w-full gap-2 ">
                    <TextInput
                        className="bg-white/5 w-[80%] h-10 p-2 rounded-lg placeholderTextColor:text-gray-50  text-white"
                        placeholder="Nome do participante"
                        placeholderTextColor="#9f9e9e"
                        value={participants}
                        onChangeText={(e) => setParticipants(e)}
                    />
                    <TouchableOpacity
                        className="w-10 h-10 p-2 items-center rounded-lg bg-green-400/80"
                        onPress={saveParticipant}
                    >
                        <Text className="text-white text-center ">+</Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <Loading />
                ) : (
                    <ScrollView className="space-y-1 w-full p-0" showsHorizontalScrollIndicator={false}>
                        {participantList.map((participant) => (
                            <View key={participant.id} className="flex flex-row w-full gap-2">
                                <Text className="bg-white/5 w-[80%] h-10 p-2 rounded-lg placeholderTextColor:text-gray-50 gap-2  text-white">
                                    {participant.name}
                                </Text>
                                <TouchableOpacity
                                    className="w-10 h-10 p-2 items-center rounded-lg bg-red-600/80"
                                    onPress={() => removeParticipant(participant.id)}
                                >
                                    <Text className="text-white text-center">-</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}


            </View>
        </View>
    )
}
