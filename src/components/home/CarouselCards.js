import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import movieApi from '../../api/movieApi';
import { useNavigation } from '@react-navigation/native';


const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002625?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002628?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const {width: screenWidth} = Dimensions.get('window');

const CarouselCards = props => {
  const [films, setFilms] = useState([])
  const carouselRef = useRef(null);
  const navigation = useNavigation()

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const handleOnpress = (id) =>{
    navigation.navigate("FilmDetail", {id})
  }

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity style={styles.item} onPress={()=>handleOnpress(item?.id)}>
        <ParallaxImage
          source={{uri: item?.image ? item?.image : 'https://i.imgur.com/2nCt3Sbl.jpg' }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={styles.blockContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item?.nameMovie}
          </Text>
          <Text style={styles.time} numberOfLines={2}>
          <AntDesign name="clockcircleo" size={12} color="#900" /> {item?.duration} minutes
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(()=>{

    const getFilms = async () =>{
      const data = await movieApi.getMovies();
      setFilms(data)
    }
    getFilms()
  },[])
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={films}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default CarouselCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 100,
    height: screenWidth - 100,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  title: {
    color:"white",
    textTransform:"uppercase",
    fontWeight:"700",
    fontSize:14
  },
  time : {
    color:"white",
    fontSize:14,
    color:"gray"
  },
  blockContent: {
    display: "flex",
    justifyContent:"space-between",
    flexDirection:"column",
    alignItems:"center",
    marginTop:12,
  },
  
});
