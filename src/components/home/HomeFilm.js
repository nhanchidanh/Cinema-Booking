import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import useHomeFilmHook from "./ useHomeFilmHook";

export default function Example() {
  const { items, handleOnpress } = useHomeFilmHook();

  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        spacing={14}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOnpress(item?.id)}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item?.image
                  ? item?.image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdMVXZJrkibncovfmQIUqjWgXn27YxQPuzQ&usqp=CAU",
              }}
            />
            <Text style={styles.text}>
              {item?.nameMovie.length < 20
                ? item?.nameMovie
                : item?.nameMovie.substring(0, 18) + "..."}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  tinyLogo: {
    borderRadius: 6,
    height: 300,
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },
});
