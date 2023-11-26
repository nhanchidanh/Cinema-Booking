import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Carousel from "../components/home/Carousel";
import HomeFilm from "../components/home/HomeFilm";

const HomePage = () => {
  return (
    <SafeAreaView  style={styles.container}>
        
        <View style={{flex:1}}>
          <Carousel />
        </View>
        <View style={{flex:2}}>
          <HomeFilm />
        </View>
     
    </SafeAreaView>
 
  )
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    
  },
  scrollView: {
   height:30
  },
});

export default HomePage;
