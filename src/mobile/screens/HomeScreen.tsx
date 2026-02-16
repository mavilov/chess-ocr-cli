import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { colors } from "../theme/colors";
import { sharedStyles } from "../theme/styles";
import { getApiKey } from "../services/storageService";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

/**
 * Home screen — the main entry point of the app.
 * Allows the user to take a photo or pick one from the gallery.
 */
export default function HomeScreen({ navigation }: Props) {
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const key = await getApiKey();
      setHasApiKey(!!key);
    });
    return unsubscribe;
  }, [navigation]);

  const handleImage = useCallback(
    async (launcher: () => Promise<ImagePicker.ImagePickerResult>) => {
      if (!hasApiKey) {
        Alert.alert(
          "API Key Required",
          "Please set your OpenAI API key in Settings before processing images.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Go to Settings",
              onPress: () => navigation.navigate("Settings"),
            },
          ],
        );
        return;
      }

      const result = await launcher();
      if (result.canceled || !result.assets?.[0]) return;

      navigation.navigate("Processing", {
        imageUri: result.assets[0].uri,
      });
    },
    [hasApiKey, navigation],
  );

  const takePhoto = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Camera Access",
        "Camera permission is needed to take photos of chess scoresheets.",
      );
      return;
    }
    await handleImage(() =>
      ImagePicker.launchCameraAsync({
        quality: 1,
        base64: false,
      }),
    );
  }, [handleImage]);

  const pickImage = useCallback(async () => {
    await handleImage(() =>
      ImagePicker.launchImageLibraryAsync({
        quality: 1,
        base64: false,
      }),
    );
  }, [handleImage]);

  return (
    <View style={sharedStyles.screenContainer}>
      <View style={styles.hero}>
        {/* Chess piece icon placeholder */}
        <Text style={styles.icon}>♚</Text>
        <Text style={sharedStyles.title}>Chess OCR</Text>
        <Text style={sharedStyles.subtitle}>
          Photograph a handwritten chess scoresheet and convert it to PGN
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={sharedStyles.buttonPrimary}
          onPress={takePhoto}
          activeOpacity={0.8}
        >
          <Text style={sharedStyles.buttonPrimaryText}>📷 Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={sharedStyles.buttonSecondary}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          <Text style={sharedStyles.buttonSecondaryText}>
            🖼 Pick from Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {!hasApiKey && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            ⚠️ Set your OpenAI API key in Settings to get started
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  actions: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  banner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.warning + "22",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.warning + "44",
  },
  bannerText: {
    fontSize: 13,
    color: colors.warning,
    textAlign: "center",
  },
});
