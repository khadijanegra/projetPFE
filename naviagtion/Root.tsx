
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import signup from "screens/home/signup";
import Login from "screens/home/login";
import homepage from "screens/home/homepage";
import Password from "screens/home/password";
import AcceuilPage from "screens/acceuilpage";
import maps from "screens/home/maps";
import getcurrentlocation from "screens/home/getcurrentlocation"
import Passwordkey from "screens/home/passwordkey";
import userprofile from "screens/home/userprofile"
import Firstpage from "screens/home/firstpage";
import formshop from "screens/home/formshop"
import Profileshop from "screens/home/profileshop";
import locationdemand from "screens/home/locationdemand";
import reviewform from "screens/home/reviewform"
import TaskCard from "screens/home/userfavoris"
import ReviewShop from "screens/home/reviewshop";
import DeleteAccount from "screens/home/deleteAccount";
import Reclam from "screens/home/reclam";
import Myshop from "screens/home/myshop";
import Consultshop from "screens/consultshop";
import Chatbot from "screens/home/chatbot";
import LocationsMap from "screens/home/allshopsinmaps"
import EventForm from "screens/home/formevent";
import commande from "screens/home/commande";
import OrderScreen from "screens/home/order";
import PaymentScreen from "screens/home/payment";
const Stack = createStackNavigator();

export default function Root() {
  return ( 
    <Stack.Navigator>
      <Stack.Screen name="firstpage" component={Firstpage}/>
      <Stack.Screen name="homepage" component={homepage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="signup" component={signup} />
      <Stack.Screen name="locationdemand" component={locationdemand} />
      <Stack.Screen name="getcurrentlocation" component={getcurrentlocation} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="acceuilpage" component={AcceuilPage} />
      <Stack.Screen name="passwordkey" component={Passwordkey} />
      <Stack.Screen name="userprofile" component={userprofile} />
      <Stack.Screen name="formshop" component={formshop} />
      <Stack.Screen name="profileshop" component={Profileshop} />
      <Stack.Screen name="reviewform" component={reviewform} />
      <Stack.Screen name="userfavoris" component={TaskCard} />
      <Stack.Screen name="reviewshop" component={ReviewShop} />
      <Stack.Screen name="deleteAccount" component={DeleteAccount} />
      <Stack.Screen name="reclam" component={Reclam} />
      <Stack.Screen name="myshop" component={Myshop} />
      <Stack.Screen name="allshopsinmaps" component={LocationsMap}/>
      <Stack.Screen name="consultshop" component={Consultshop} />
      <Stack.Screen name="chatbot" component={Chatbot} />
      <Stack.Screen name="formevent" component={EventForm}/>
      <Stack.Screen name="commande" component={commande}/>
      <Stack.Screen name="order" component={OrderScreen}/>
      <Stack.Screen name="payement" component={PaymentScreen}/>
      

    </Stack.Navigator> 
      

      
  );
}