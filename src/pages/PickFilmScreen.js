import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView,ScrollView, TouchableOpacity, Image } from "react-native";
import { Text, VStack, Center, NativeBaseProvider } from "native-base";
import Video from 'react-native-video';
import AntDesign from "react-native-vector-icons/AntDesign";
import video from '../images/video.mp4'
import Carousel from "../components/home/Carousel";
import movieApi from '../api/movieApi';
import { log } from "react-native-reanimated";
const PickFilmScreen = ({route}) => {
  const [film, setFilm] = useState(null);
  const {id } = route.params;
  const [isActive, setIsActive] = useState(0)

  useEffect(()=>{
    const getFilm = async (id) =>{
      const data = await movieApi.getMovieById(id)
      setFilm(data);
    }

    getFilm(id)
  }, [])
    return (
        <SafeAreaView style={styles.container}>
                    
                <View style={styles.top}>
                  {/* <Carousel /> */}
                <Image
                style={styles.tinyLogo}
                source={{
                  uri: film?.image
                }} />
          
                </View>
              <ScrollView style={styles.scrollView}>  
                <View style={styles.bottom}>
                    <View style={styles.bottom_one}>
                        <Text style={{textTransform:"capitalize", fontSize:20, fontWeight:"600"}}  color="white" >{film?.nameMovie}</Text>
                        <Box style={{flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:6}}>
                            <Text fontSize="xs" color="#DFD3C3">Comedy, Romatic </Text>
                            <Text fontSize="xs" color="#DFD3C3">{film?.duration} minus</Text>
                        </Box>
                    </View>
                    <View style={styles.times}>
                      <TouchableOpacity style={[styles.time, styles.active]}>
                        <Text style={styles.timeText}>03</Text>
                        <Text style={styles.timeDay}>T2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.time}>
                        <Text style={styles.timeText}>03</Text>
                        <Text style={styles.timeDay}>T2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.time}>
                        <Text style={styles.timeText}>03</Text>
                        <Text style={styles.timeDay}>T2</Text>
                      </TouchableOpacity>
                    </View>
             
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  times : {
    display:'flex',
    flexDirection:'row',
    marginTop :10,
    paddingHorizontal:12
  },
  time: {
    width:50,
    backgroundColor:'black',
    display:"flex",
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal:8,
    paddingVertical:8,
    marginRight:10,
    borderRadius:4,
    
    
  },
  active:{
    backgroundColor: '#79D70F',
    color:"white",
  },
  timeText: {

    fontSize:18,
    color:"#E5E0FF",
    fontWeight:'700'
  },
  timeDay:{
    color:"white",
    fontSize:14,
    fontWeight:500
  },

  container: {
    flex: 1,
    backgroundColor:"black"
  },
  top:{
    flex:0.5,
    backgroundColor:"white"
  },
  bottom:{
    flex:3,
   
  },
  bottom_one : {
    flex:1,
    paddingTop:12,
    paddingBottom:12,
    borderBottomColor:"#333",
    borderWidth:0.5,
    justifyContent:"space-between",
    paddingLeft:20,
    paddingRight:20
  },
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: '#79D70F',
    height: 40,
    borderRadius: 5,
    width:"100%",
    marginTop:14
   
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight:"400",
    fontSize:16,
    marginLeft:10
  },
  scrollView: {
    flex:1,
    marginTop:12
  } ,
  videoStyle : {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 250,
  },
  tinyLogo: {
      width:"100%",
      height:"100%"
    
  },
});

export default PickFilmScreen;
