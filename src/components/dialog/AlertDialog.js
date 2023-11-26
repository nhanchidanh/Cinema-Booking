import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AlertDialog,
  Button,
  Center,
  TouchableOpacity,
  NativeBaseProvider,
} from "native-base";
import { PayMent } from "../../constant";

const AlertDialogCustom = ({isOpen, onClose, content, callBack}) => {
  const navigation = useNavigation();
  const handleClick =  () => {
    onClose()
    if(content?.type == PayMent){
      callBack()
    }else{
      navigation.navigate("Login");
    }
  };

  const handleClose = () => {
    onClose()
    if(content?.type == PayMent){
      callBack()
    }
  }

  const cancelRef = React.useRef(null);
  return (
    <>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Thông báo</AlertDialog.Header>
            <AlertDialog.Body>
              
              {
                content?.text || 'Bạn cần đăng nhập để tiếp tục'
              }
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={handleClose}
                  ref={cancelRef}
                >
                  Hủy
                </Button>
                <Button colorScheme="green" onPress={handleClick}>
                 {
                  content?.buttonContent || 'Đăng nhập'
                 }
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </>
  );
};

export default AlertDialogCustom;
