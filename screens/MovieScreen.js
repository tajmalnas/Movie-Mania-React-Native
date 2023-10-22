import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
// import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/MovieList';
import Cast from '../components/Cast';
import LoadingScreen from '../components/LoadingScreen';
import { getMovieCredits, getMovieDetails, getSimilarMovies } from '../api/moviedb';

var {height, width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ?'':'mt-3';
export default function MovieScreen() {
    const {params:item} = useRoute();
    const [isFav, setIsFav] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie,setMovie] = useState({});
    useEffect(()=>{
        setLoading(true);
        fetchMovieDetails(item.id);
        fetchMovieCredits(item.id);
        fetchSimilarMovies(item.id);
        setTimeout(()=>setLoading(false),500);
    },[item])

    const fetchMovieDetails = async(id)=>{
        const data = await getMovieDetails(id);
        if(data){
            setMovie(data);
            
        }
    }

    const fetchMovieCredits = async(id)=>{
        const data = await getMovieCredits(id);
        if(data && data.cast){
            setCast(data.cast);
            
        }
    }

    const fetchSimilarMovies = async(id)=>{
        const data = await getSimilarMovies(id);
        if(data && data.results){
            setSimilarMovies(data.results);
            
        }
    }

    if(loading==true){
        return(
            <LoadingScreen/>
        )
    }

  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        className="flex-1 bg-neutral-900"
    >
        <View className="w-full">
            <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 '+topMargin}>
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
                        <Image
                            source={{
                                uri:'https://image.tmdb.org/t/p/w500'+movie?.poster_path
                            }}
                            style={{width:width, height:height*0.6}}
                        />
                        <View
                            style={{width,height:height*0.40}}
                            className="absolute bottom-0"
                        />
                    </View>
                )
            }
            
        </View>
        <View style={{marginTop:-(height*0.09)}} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movie?.title}
            </Text>
            <Text className="text-neutral-400 text-center text-base font-semibold">
                    {movie.status}: {movie?.release_date?.split('-')[0]} • {movie?.runtime} min 
                </Text>
            <View className="flex-row justify-center mx-4 space-x-2"> 
                {movie?.genres?.map((genre,index)=>{
                    return(
                        <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                            {genre?.name}
                        </Text>
                    )}
                )}
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide">
                {movie?.overview}
            </Text>
        </View>
        <Cast cast={cast} /> 

        <MovieList title="More Like This" hideSeeAll = {true} data={similarMovies} />
    </ScrollView>
  )
}