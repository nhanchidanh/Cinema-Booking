import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, SafeAreaView,ScrollView, Dimensions, Image } from "react-native";
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
const CardFilm = () => {
    return (
      <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{
                uri: 'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/s/u/super_mario_bros._payoff_poster.jpg',
                }}
            />
            <Text  style={styles.text} >Trinh cong son</Text>
      
      </View>)
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  tinyLogo : {
    width:WIDTH/2,
    borderRadius:6,
    height:HEIGHT/3,

  },
  text:{
    marginTop:6,
    
  }

});

export default CardFilm;
