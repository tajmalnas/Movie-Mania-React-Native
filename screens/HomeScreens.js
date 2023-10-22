import { ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../themes'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../components/LoadingScreen'
import { getPopularMovies, getTrendingMovies, getUpcomingMovies } from '../api/moviedb'
export default function HomeScreens() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(()=>{
        fetchTrendingMovies();
        fetchUpcomingMovies();
        fetchPopularMovies();
    },[])

    const fetchTrendingMovies = async()=>{
        const data = await getTrendingMovies();
        if(data && data.results){
            setTrending(data.results);
            setLoading(false);
        }
    }

    const fetchUpcomingMovies = async()=>{
        const data = await getUpcomingMovies();
        if(data && data.results){
            setUpcoming(data.results);
            setLoading(false);
        }
    }

    const fetchPopularMovies = async()=>{
        const data = await getPopularMovies();
        if(data && data.results){
            setPopular(data.results);
            setLoading(false);
        }
    }
        
  return (
    <View className='flex-1 bg-neutral-800'>
        <SafeAreaView>
            <StatusBar style="light"/>
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon  size="30" color="white" strokeWidth={2}/>
                <Text className="text-white text-3xl font-bold">
                    <Text style={styles.text}>M</Text>
                    <Text>A</Text>
                    <Text style={styles.text}>N</Text>
                    <Text>I</Text>
                    <Text>A</Text>
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size="30" color="white" strokeWidth={2}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        {
            loading==true?(
                <LoadingScreen/>
            ):(
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10}}
                >
                   { trending.length>0 &&
                     <TrendingMovies data ={trending}/>
                   }
                    <MovieList title="Upcoming" hideSeeAll={false} data={upcoming}/>

                    <MovieList title="Popular" hideSeeAll={false} data={popular}/>
                </ScrollView>
            )
        }
        
    </View>
  )
}