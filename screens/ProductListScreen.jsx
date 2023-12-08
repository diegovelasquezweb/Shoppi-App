import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import UserBar from "../components/UserBar";
import { styles } from "../styles/styles";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const MainScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const firestore = getFirestore();
    
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(firestore, "users", userId);

      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            });
          } else {
            console.log("User data not found.");
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <UserBar userData={userData} />
        <Search onSearchChange={setSearchTerm} />
        <ProductList searchTerm={searchTerm} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;