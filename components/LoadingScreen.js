import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../themes'

const { width, height } = Dimensions.get('window')
export default function LoadingScreen() {
  return (
    <View style={{height:height*1.2,width}} className="bg-neutral-800 absolute flex-row justify-center items-center">
      <Text className="text-3xl font-base text-neutral-300 bottom-20">Loading...</Text>
    </View>
  )
}