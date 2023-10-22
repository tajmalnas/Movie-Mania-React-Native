import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import { styles } from '../themes'
import { useNavigation } from '@react-navigation/native';

var {height, width} = Dimensions.get('window');

export default function MovieList({title,data,hideSeeAll}) {
    const movieName = "Iron Man";
    const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>
            {hideSeeAll==false &&
                <TouchableOpacity>
                <Text style={styles.text}>See All</Text>
            </TouchableOpacity>
            }
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
           {data.map((item,index)=>{
                return (
                    <TouchableWithoutFeedback key={index} onPress={()=>navigation.push('Movie',item)}>
                        <View className="space-y-1 mr-4">
                                <Image className="rounded-xl" source={{
                                    uri:'https://image.tmdb.org/t/p/w500'+item.poster_path
                                }} style={{width:width*0.33, height:height*0.22}}/>
                            <Text className="text-neutral-200">
                                {item?.title?.length>15?item.title.slice(0,15)+'...':item?.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
        </ScrollView>
    </View>
  )
}