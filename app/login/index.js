import { Stack, Link, router, Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet,Pressable } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo 
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { View, TextField, Text, Button } from "react-native-ui-lib";
const provider = new GoogleAuthProvider();

// Importar la fuente Poppins

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  text: {
    color: "white",
    fontFamily: "Ubu",
    fontSize: 24,
  },
  ball: {
    fontSize: 44,
  },
  maintenance: {
    fontFamily: "Ubuu",
    fontSize: 20,
    marginTop: 30,
    width: "100%",
    textAlign: "left",
    color: "#0b564f",
  },
  button: {
    width: "100%",
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Ubu",
    marginTop: 10,
    marginBottom: 1,
  },

  password: {
    marginTop: 10,
  },
  input: {
    borderColor: "white",
    width: "100%",
    margin: 2,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderRadius: 3,
    color: "#fff",
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({
    Ubu: require("../assets/fonts/Ubuntu-Medium.ttf"),
    Ubuu: require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  useEffect(() => {
    // Evita que la pantalla de presentación se oculte automáticamente
    SplashScreen.preventAutoHideAsync();

    // Realiza cualquier inicialización necesaria aquí
    // Por ejemplo, cargar datos, configurar servicios, etc.

    // Cuando hayas terminado con la inicialización, oculta la pantalla de presentación
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]); // Se ejecuta solo cuando las fuentes se carguen

  if (!fontsLoaded) {
    return null; // No necesitas retornar nada aquí, ya que SplashScreen se encargará de mostrar la pantalla de presentación
  }

  const handleCreateAccount = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        alert(result.user.displayName)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/participantes");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <LinearGradient
      colors={["rgba(55,236,186,1)", "rgba(114,175,211,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: "Home",
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />

      <View style={styles.header}>
        <Text style={styles.ball}>
          <Ionicons name="tennisball" size={34} color="white" />
        </Text>
        <Text style={styles.text}>WELCOME TO</Text>
        <Text style={styles.text}>WIKIPADEL</Text>
      </View>
      <View
        style={{
          width: "70%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.maintenance}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={"#7c7c7c"}
          placeholder="luis.herdeth@gmail.com"
        />

        <Text style={styles.maintenance}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={"#7c7c7c"}
          placeholder="********"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Pressable onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create account</Text>
      </Pressable>
    </LinearGradient>
  );
}
