import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { colors } from "../theme/colors";
import { sharedStyles } from "../theme/styles";
import { processImageWithOpenAI } from "../services/openaiService";
import { getApiKey } from "../services/storageService";

type Props = NativeStackScreenProps<RootStackParamList, "Processing">;

/**
 * Processing screen — sends the captured image to the OpenAI Vision API
 * and shows a loading indicator while waiting for the response.
 */
export default function ProcessingScreen({ route, navigation }: Props) {
  const { imageUri } = route.params;
  const [status, setStatus] = useState("Reading image…");

  useEffect(() => {
    let cancelled = false;

    async function process() {
      try {
        const apiKey = await getApiKey();
        if (!apiKey) {
          Alert.alert("Error", "API key not found. Please set it in Settings.");
          navigation.goBack();
          return;
        }

        setStatus("Encoding image…");
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (cancelled) return;

        setStatus("Analyzing scoresheet with AI…");
        const result = await processImageWithOpenAI(base64, apiKey);

        if (cancelled) return;

        navigation.replace("Result", { pgn: result });
      } catch (error) {
        if (cancelled) return;
        Alert.alert(
          "Processing Failed",
          error instanceof Error ? error.message : String(error),
          [
            { text: "Go Back", onPress: () => navigation.goBack() },
            {
              text: "Retry",
              onPress: () => {
                setStatus("Reading image…");
                process();
              },
            },
          ],
        );
      }
    }

    process();

    return () => {
      cancelled = true;
    };
  }, [imageUri, navigation]);

  return (
    <View style={[sharedStyles.screenContainer, sharedStyles.centered]}>
      <Image source={{ uri: imageUri }} style={styles.preview} />
      <ActivityIndicator
        size="large"
        color={colors.accent}
        style={styles.spinner}
      />
      <Text style={styles.statusText}>{status}</Text>
      <Text style={styles.hint}>
        This usually takes from 10 seconds to a minute
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: 200,
    height: 260,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  spinner: {
    marginBottom: 16,
  },
  statusText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
