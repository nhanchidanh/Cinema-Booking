import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { VND } from "../../constant";

const ProductCard = ({
  product,
  qualityGlobal,
  setPickProducts,
  pickProducts,
}) => {
  const [quality, setQuality] = useState(0);

  const handleDown = () => {
    if (quality === 0) return;
    const newQty = quality - 1;
    if (newQty === 0) {
      const newArr = pickProducts.filter((val) => {
        return val?.id !== product?.id;
      });
      setPickProducts(newArr);
      return;
    }
    const item = { ...product, qty: newQty };

    const isFound = pickProducts.some((element) => {
      if (element.id === product.id) {
        return true;
      }
      return false;
    });
    if (isFound) {
      const newArr = pickProducts.map((val) => {
        if (val?.id === product?.id) {
          return { ...val, qty: newQty };
        }
        return val;
      });
      setPickProducts(newArr);
    } else {
      setPickProducts([...pickProducts, { ...item }]);
    }

    setQuality(newQty);
  };

  const handleUp = () => {
    const newQty = quality + 1;
    const item = { ...product, qty: newQty };

    const isFound = pickProducts.some((element) => {
      if (element.id === product.id) {
        return true;
      }
      return false;
    });
    if (isFound) {
      const newArr = pickProducts.map((val) => {
        if (val?.id === product?.id) {
          return { ...val, qty: newQty };
        }
        return val;
      });
      setPickProducts(newArr);
    } else {
      setPickProducts([...pickProducts, { ...item }]);
    }

    setQuality(newQty);
  };

  useEffect(() => {
    const index = pickProducts.findIndex((p) => {
      return product?.id === p?.id;
    });
    if (index != -1) {
      setQuality(pickProducts[index]?.qty);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GRx8TxV3MDoA0kF_YrrXg0uQVC8Ag6Ul_w&usqp=CAU",
          }}
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>{product.productCode}</Text>
          <Text style={[styles.text, { color: "gray", fontWeight: 400 }]}>
            {product?.productName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 500 }}>
            Giá: {VND.format(product?.price)}
          </Text>
          <View style={styles.blocks}>
            <Text onPress={handleDown} style={styles.option}>
              -
            </Text>
            <Text style={styles.option}>{quality}</Text>
            <Text onPress={handleUp} style={styles.option}>
              +
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  blocks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "white",
    height: 380,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  image: {
    flex: 2.5,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default ProductCard;
