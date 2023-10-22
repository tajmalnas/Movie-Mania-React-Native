import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon} from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import LoadingScreen from '../components/LoadingScreen'
import { getPersonDetails, image500 } from '../api/moviedb'

var {height, width} = Dimensions.get('window');
export default function PersonScreen() {
    const {params:item} = useRoute();  
    console.log(item.character); 
    const [isFav, setIsFav] = useState(false);
    var [person, setPerson] = useState();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        setLoading(true);
        fetchPersonDetails(item.id);
    },[])

    const fetchPersonDetails = async(id)=>{
        const data = await getPersonDetails(id);
        if(data){
            setPerson(data);
            setLoading(false);
        }
    }

    const ios = Platform.OS === 'ios';
    const topMargin = ios ?'':'mt-3';
    // person = {
    //     "adult": false,
    //     place_of_birth: "Beirut, Lebanon",
    //     birthday: "1964-09-02",
    //     gender:1,
    //     known_for_department: "Acting",
    //     name: "Robert Downet Jr",
    //     popularity: 84.23,
    //     biography:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
    // }
  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom:20}} >
         <SafeAreaView className={'z-20 w-full flex-row justify-between items-center px-4 '+topMargin}>
            <TouchableOpacity onPress={()=>navigation.goBack()} className="rounded-xl p-1">
                <ChevronLeftIcon size='28' strokeWidth={3} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsFav(!isFav)} >
                <HeartIcon size='28' strokeWidth={3} color={isFav?"hotpink":"white"} />
            </TouchableOpacity>
        </SafeAreaView>
        {
            loading==true?(
                <LoadingScreen/>
            ):(
                <View>
                    <View
                        className="flex justify-center items-center"
                    >
                        <View 
                            className="rounded-full items-center overflow-hidden h-72 w-72 border border-neutral-400"
                        >
                            <Image
                                source={{uri:image500(person?.profile_path)}}
                                style={{width:width*0.75, height:height*0.4}}
                            />
                        </View>
                        <View className="mt-6">
                                <Text className="text-3xl text-white font-bold text-center">
                                    {/* Keanu Reeves */}
                                    {person?.name}
                                </Text>
                                <Text className="text-neutral-500 text-base text-center">
                                    {person?.place_of_birth}
                                    {/* Beirut, Lebanon */}
                                </Text>
                            </View>
                    
                            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold ">Gender</Text>
                                    <Text className="text-neutral-300 text-sm">
                                        {/* Male */}
                                        {
                                            person?.gender==1? 'Female': 'Male'
                                        }
                                    </Text>
                                </View>
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Birthday</Text>
                                    <Text className="text-neutral-300 text-sm">
                                        {/* 1964-09-02 */}
                                        {person?.birthday}
                                    </Text>
                                </View>
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">known for</Text>
                                    <Text className="text-neutral-300 text-sm">
                                        {/* Acting */}
                                        {person?.known_for_department}
                                    </Text>
                                </View>
                                <View className="px-2 items-center">
                                    <Text className="text-white font-semibold">Popularity</Text>
                                    <Text className="text-neutral-300 text-sm">
                                        {/* 84.23 % */}
                                        {person?.popularity?.toFixed(2)} %
                                    </Text>
                                </View>
                                    
                            </View>
                            <View className="my-6 mx-4 space-y-2">
                                <Text className="text-white text-lg">Biography</Text>
                                <Text className="text-neutral-400 tracking-wide">
                                    {
                                        person?.biography? person.biography : 'N/A'
                                    }
                                </Text>
                            </View>                
                        </View>
                </View>
            )
        }
        
    </ScrollView>
  )
}