import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

const TaskCard = () => {
  const statusColors = {
    Waiting: "bg-blue-500",
    Suspended: "bg-purple-600",
    "In Progress": "bg-yellow-500",
  };

  return (
    <View style={tw`p-4 m-2 bg-red-100 border border-gray-200 shadow-lg rounded-2xl`}> 
      <View style={tw`flex-row items-center mb-2`}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={tw`w-10 h-10 mr-3 rounded-full`}
        />
        <Text style={tw`font-bold text-gray-800 te-xt-lg `}>Title lorem ipsum</Text>
      </View>
      <Text style={tw`mb-2 text-gray-600`}>It is possible to place this data on the Single Page or the items grid. You will be able to do it only </Text>
      <Text style={tw`text-sm text-gray-500`}>Deadline</Text>
      <Text style={tw`mb-2 font-semibold text-black`}>24/04/2003</Text>
      <View style={tw`self-end px-4 py-1 rounded-full `}>
        <Text style={tw`font-semibold text-white`}>aaaaaaa</Text>
      </View>
    </View>
  );
};

export default TaskCard;
