import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView,ScrollView, TouchableOpacity, Image } from "react-native";
import { Text, VStack, Center, NativeBaseProvider } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import movieApi from '../api/movieApi';
import { useNavigation } from "@react-navigation/native";

const DetailsFilm = ({route}) => {
  const [film, setFilm] = useState(null);
  const {id } = route.params;
  const navigation = useNavigation()
 
  useEffect(()=>{
    const getFilm = async (id) =>{
      const data = await movieApi.getMovieById(id)
      setFilm(data);
    }

    getFilm(id)
  }, [])
  const handleOnpress = (id) =>{
    navigation.navigate("PickFilm", {id})
  }
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
                        <Box>
                            <Text fontSize="md" bold color="white" style={{textTransform:"capitalize"}}>Description </Text>
                            <Text fontSize="xs" color="white">
                                {film?.desc}
                            </Text>
                        </Box>
                    </View>
                    <View style={styles.bottom_one}>
                        <Box style={{flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:6}}>
                            <Text fontSize="sm" color="white">Released Date </Text>
                            <Text fontSize="sm" color="#DFD3C3">{film?.releaseDate.substring(0,10)}</Text>
                        </Box>
                        <Box style={{flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:6}}>
                        <Text fontSize="sm" color="white">Language </Text>
                            <Text fontSize="xs" color="#DFD3C3">{film?.language}</Text>
                        </Box>
                        <Box style={{flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:6}}>
                        <Text fontSize="sm" color="white">Classify</Text>
                            <Text fontSize="xs" color="#DFD3C3">{film?.classify}</Text>
                        </Box>
                    </View>
                    <View style={styles.bottom_one}>
                        <Box style={{flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:6}}>
                        <Text fontSize="sm" color="white">Director </Text>
                            <Text fontSize="xs" color="#DFD3C3">{film?.director}</Text>
                        </Box>
                        <Box style={{flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:6}}>
                        <Text fontSize="sm" color="white">Cast </Text>
                            <Text fontSize="xs" color="#DFD3C3">{film?.cast}</Text>
                        </Box>
                        <TouchableOpacity style={styles.buttonGPlusStyle} activeOpacity={0.5} onPress={() => handleOnpress(film?.id)}>
                
                            <AntDesign name="clockcircleo" size={16} />
                            <Text style={styles.buttonTextStyle}>Booking</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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

export default DetailsFilm;
