import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {fallbackpersonImage, image185} from '../api/moviedb'
export default function Cast({cast}) {
    
    const navigation = useNavigation();
  return (
    <View className="my-6">
      <Text className="text-white text-xl mx-4 mb-4">The Cast</Text>
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >   
            {
                cast && cast.map((person,index)=>{
                    return (
                        <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=>navigation.navigate('Person',person)}>
                            <View className="rounded-full overflow-hidden h-20 w-20 border border-neutral-400">
                                <Image
                                    className="rounded-xl h-24 w-20"
                                    source={{
                                        uri:(image185(person?.profile_path) || fallbackpersonImage)
                                    }}
                                />
                            </View>
                            <Text className="text-neutral-200 text-sm mt-1">
                                {person?.character.length>10?person.character.slice(0,10)+'...':person?.character}
                            </Text>
                            <Text className="text-neutral-200 text-sm mt-1">
                                {person?.original_name.length>10?person?.original_name.slice(0,10)+'...':person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    )
                })   
            }
        </ScrollView>
    </View>
  )
}