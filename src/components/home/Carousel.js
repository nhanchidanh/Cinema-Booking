import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// "https://www.bhdstar.vn/wp-content/uploads/2018/03/Visa-x-BHD-WEB.jpg",
const images = [
  "https://www.galaxycine.vn/media/2022/12/16/giangsinh-digital-1135x660_1671174048399.jpg",
  "https://img.freepik.com/premium-vector/cinema-design-background-yellow_44392-38.jpg",
  "https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645__340.jpg",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Carousel = () => {
  const [imageActive, setImageACtive] = useState(0);
  const navigation = useNavigation();
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imageActive) {
        setImageACtive(slide);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Promotion")}
              >
                <Image
                  key={e}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{ uri: e }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.wrapDot}>
        {images.map((e, index) => {
          return (
            <Text
              key={e}
              style={imageActive == index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrap: {
    width: WIDTH,
    height: "100%",
  },
  wrapDot: {
    position: "absolute",
    bottom: 10,
    left: "43%",
    flexDirection: "row",
    alignSelf: " center",
  },
  dotActive: {
    margin: 3,
    color: "black",
  },
  dot: {
    margin: 3,
    color: "white",
  },
});

export default Carousel;
