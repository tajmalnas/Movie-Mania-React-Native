import { View, Text, Touchable, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

export default function TrendingMovies({data}) {
    const width = Dimensions.get('window').width;

  return (
    <View className="mb-8 mt-4">
      <Text className="text-gray-50 text-xl mx-4 mb-5">TrendingMovies</Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <MovieCard item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.4}
        sliderWidth={width}
        itemWidth={width*0.6}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}

const MovieCard = ({item}) => {
    const navigation = useNavigation();

    return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Movie',item)}>
            <Image className='rounded-xl' source={{
              uri:image500(item?.poster_path)
            }} style={{width: 200, height: 300}}/>
        </TouchableWithoutFeedback>
    )
}