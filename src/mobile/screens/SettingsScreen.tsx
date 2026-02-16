import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { colors } from "../theme/colors";
import { sharedStyles } from "../theme/styles";
import { getApiKey, setApiKey, clearApiKey } from "../services/storageService";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

/**
 * Settings screen — lets the user enter, view, and remove their OpenAI API key.
 */
export default function SettingsScreen({ navigation: _navigation }: Props) {
  const [key, setKey] = useState("");
  const [masked, setMasked] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await getApiKey();
      if (stored) {
        setKey(stored);
        setSaved(true);
      }
    })();
  }, []);

  const handleSave = useCallback(async () => {
    const trimmed = key.trim();
    if (!trimmed) {
      Alert.alert("Invalid Key", "Please enter a valid OpenAI API key.");
      return;
    }
    await setApiKey(trimmed);
    setSaved(true);
    Alert.alert(
      "Saved ✓",
      "Your API key has been stored securely on this device.",
    );
  }, [key]);

  const handleClear = useCallback(async () => {
    Alert.alert("Remove API Key?", "This will remove your saved key.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await clearApiKey();
          setKey("");
          setSaved(false);
        },
      },
    ]);
  }, []);

  return (
    <KeyboardAvoidingView
      style={sharedStyles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={sharedStyles.content}>
        <Text style={sharedStyles.title}>Settings</Text>
        <Text style={sharedStyles.subtitle}>
          Your API key is stored locally on this device and is never sent
          anywhere except to the OpenAI API.
        </Text>

        <View style={styles.section}>
          <Text style={sharedStyles.label}>OpenAI API Key</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[sharedStyles.textInput, styles.input]}
              value={key}
              onChangeText={(text) => {
                setKey(text);
                setSaved(false);
              }}
              placeholder="sk-..."
              placeholderTextColor={colors.textPlaceholder}
              secureTextEntry={masked}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setMasked(!masked)}
            >
              <Text style={styles.toggleText}>{masked ? "👁" : "🙈"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[sharedStyles.buttonPrimary, saved && styles.savedButton]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={saved}
        >
          <Text style={sharedStyles.buttonPrimaryText}>
            {saved ? "✓  Saved" : "Save API Key"}
          </Text>
        </TouchableOpacity>

        {key.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.8}
          >
            <Text style={styles.clearText}>Remove API Key</Text>
          </TouchableOpacity>
        )}

        <View style={sharedStyles.divider} />

        <View style={sharedStyles.card}>
          <Text style={styles.helpTitle}>How to get an API key</Text>
          <Text style={styles.helpText}>
            1. Go to platform.openai.com/api-keys{"\n"}
            2. Sign in or create an account{"\n"}
            3. Click "Create new secret key"{"\n"}
            4. Copy and paste it here
          </Text>
          <Text
            style={[styles.helpText, { marginTop: 12, color: colors.warning }]}
          >
            ⚠️ The OpenAI Vision API is not free. You will be charged per image
            processed.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleText: {
    fontSize: 20,
  },
  savedButton: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  clearButton: {
    alignItems: "center",
    paddingVertical: 14,
  },
  clearText: {
    fontSize: 15,
    color: colors.error,
    fontWeight: "500",
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
