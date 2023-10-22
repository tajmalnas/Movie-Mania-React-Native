import { View, Text, Dimensions, TextInput, Touchable, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../components/LoadingScreen';
import { debounce, set } from 'lodash';
import { image342, searchMovies } from '../api/moviedb';
const {height, width} = Dimensions.get('window');
export default function SearchScreen() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleSearch = (text)=>{
        // console.log("check this : ",text);
        if(text && text.length>2){
            setLoading(true);
            searchMovies({
                query: text,
                include_adult: false,
                language: 'en-US',
                page: 1,
            }).then(data=>{
                setResults(data.results);
                setLoading(false);
            })
        }
        else{
            setResults([]);
            setLoading(false);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 300),[]);

  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
        <View className="mx-4 flex-row justify-between items-center border border-neutral-400 rounded-full p-1 mb-4">
            <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search"
                placeholderTextColor="white"
                className="pb-1 pt-1 pl-4 text-base text-white"
            />
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                className="rounded-full bg-neutral-800 p-2"
            >
                <XMarkIcon size={22} color="white" />
            </TouchableOpacity>
        </View>
        {
            loading==true?(
                <LoadingScreen/>
            ):
            results.length>0?(
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 10}}
                    className="space-y-3"
                >
                    <Text className="text-white font-semibold ml-2 mb-4">
                        Results:{results.length}
                    </Text>
                    <View className="flex flex-row justify-between flex-wrap">
                        {
                            results.map((item, index)=>(
                                <TouchableWithoutFeedback key={index} onPress={()=>navigation.push("Movie",item)}>
                                    <View className="space-y-2 mb-4">
                                        <Image 
                                            className="rounded-xl"
                                            source={{uri:image342(item?.poster_path)}}
                                            style={{width:width*0.45, height:height*0.3}}
                                        />
                                        <Text className="text-white font-semibold text-base">
                                            {item.original_title.length>20?item.original_title.substring(0,20)+"...":item.original_title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </View>
                </ScrollView>
            )
            :(
                <View className="flex-col items-center justify-center mt-16">
                    <Image
                        source={require('../assets/Found_nothing.png')}
                        className="w-80 h-80"
                    />
                    <Text className="text-white text-2xl font-semibold mt-4">
                        No Results Found
                    </Text>
                </View>
            )
        }
        
    </SafeAreaView>
  )
}