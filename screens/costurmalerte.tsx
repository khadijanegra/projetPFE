import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

type AlertType = "success" | "error" | "info" | "warning";

const CustomAlert = ({
  visible,
  onClose,
  title,
  message,
  type = "info",
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: AlertType;
}) => {
  

 
 

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 bg-black bg-opacity-60 justify-center items-center p-5`}>
        <View
          style={[
            tw`w-full max-w-md bg-white rounded-2xl p-6`,
            {
              elevation: 12,
              shadowOffset: { width: 0, height: 4 },
                shadowColor: "#000",
              shadowOpacity: 0.4,
              shadowRadius: 8,
              borderTopWidth: 8,
            
            },
          ]}
        >
          <Text style={tw`text-xl font-extrabold text-center text-gray-800 mb-3`}>
            {title}
          </Text>
          <Text style={tw`text-base text-center text-gray-700 mb-6 leading-6`}>
            {message}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={[
              tw`rounded-full py-3 px-6 mx-2`,
              {
                backgroundColor: "#4f46e5",
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
              },
            ]}
          >
            <Text style={tw`text-white font-bold text-center text-base  `}>
              Continuer l'aventure !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
