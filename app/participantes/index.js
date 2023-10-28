import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useNameStore } from "../store/nameStore";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent:"center",
    alignItems: "center",
    gap: 30,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    height: 55,
    width: 80,
    textAlign: "center",
    textAlignVertical: "center",
  },
  title: {
    fontFamily: "Ubu",
    fontSize: 24,
  },

  inputGroup: {
    position: "relative",
  },
  participantesText: {
    fontSize: 18,
  },
  label: {
    position: "absolute",
    top: 10,
    left: 5,
    fontSize: 13,
    backgroundColor: "white",
    // elevation: 2,
    // zIndex:1,
    // paddingHorizontal: 4,
    transform: [
      { translateX: 10 }, // Traducción horizontal de 10 píxeles
      { translateY: 10 }, // Traducción vertical de 10 píxeles
    ],
    marginRight: 20,
  },
  labelText: {
    color: "black",
  },
  input: {
    borderRadius: 8,
    width: 150,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    position: "relative",
  },
});

const home = () => {
  const names = useNameStore((state) => state.names);
  const addName = useNameStore((state) => state.addName);
  const resetNames = useNameStore((state) => state.resetNames);

  const [text, setText] = useState("");
  const [isEmptyMessage, setIsEmptyMessage] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handlePress = () => {
    if (names.length > 4) return;
    if (text.trim() === "" && names.length < 4) {
      setIsEmptyMessage(true);
      return;
    }

    // Si hay menos de 4 nombres, entra, si no, pasa al siguiente if
    if (names.length < 4) {
      addName(text);
      setText("");
    }

    // Redirigir a "/homeScreen" si es igual a 4
    if (names.length === 4) {
      router.replace("/homeScreen");
    }
  };
  console.log("names:", names);

  const handleInputChange = (inputText) => {
    // Oculta el mensaje de error cuando se comienza a escribir.
    if (inputText.trim() !== "") {
      setIsEmptyMessage(false);
    }

    // Actualiza el estado del input.
    const formattedText =
      inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
    setText(formattedText);
  };

  useEffect(() => {
    setText("");
    resetNames();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Wikipadel",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.replace("/settings")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        
        <Text style={styles.title}>¡Empezemos a jugar!</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              marginRight: 20,
            }}
          >
            <View style={{ alignItems: "flex-start", color: "red" }}>
              {names.map((n, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.participantesText}>🥎 {n}</Text>
                </View>
              ))}
            </View>
            <View
              style={
                names.length === 4
                  ? { ...styles.inputGroup, opacity: 0, height: 0 }
                  : styles.inputGroup
              }
            >
              <Animatable.Text
                style={[
                  styles.label,
                  isInputFocused && {
                    zIndex: 1,
                    top: 0,
                    left: 15,
                    transform: [{ translateX: 0 }, { translateY: 0 }],
                  },
                ]}
                animation={isInputFocused ? "fadeInUp" : "fadeIn"}
                useNativeDriver={false}
              >
                Nombre participante
              </Animatable.Text>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                editable={names.length !== 4} // Deshabilita la interacción cuando hay 4 nombres
              />
            </View>
          </View>

          <View style={{ flexDirection: "column", gap: 20 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#26dbc0", "#079a89"]}
              style={{ borderRadius: 8 }}
            >
              <Pressable onPress={handlePress}>
                <Text style={styles.text}>
                  {names.length === 4 || names.length === 2
                    ? "Entrar"
                    : "Añadir"}
                </Text>
              </Pressable>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#26dbc0", "#079a89"]}
              style={{ borderRadius: 8 }}
            >
              <Pressable onPress={() => resetNames()}>
                <Text style={styles.text}>Limpiar</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
        {isEmptyMessage && (
          <Text style={{ color: "red", marginTop: 10 }}>
            El campo no puede estar vacío
          </Text>
        )}
        <Image
          source={require("../assets/jugadores.png")}
          style={{
            // width: 320,
            // height: 255,
            resizeMode: "contain",
          }}
        />
      </View>
    </>
  );
};

export default home;
