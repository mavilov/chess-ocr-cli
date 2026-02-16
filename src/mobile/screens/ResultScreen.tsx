import React, { useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { colors } from "../theme/colors";
import { sharedStyles } from "../theme/styles";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

/**
 * Result screen — displays the PGN output and provides copy / share / new-scan actions.
 */
export default function ResultScreen({ route, navigation }: Props) {
  const { pgn } = route.params;

  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(pgn);
    Alert.alert("Copied!", "PGN has been copied to your clipboard.");
  }, [pgn]);

  const shareFile = useCallback(async () => {
    try {
      const fileUri =
        FileSystem.documentDirectory + `chess_game_${Date.now()}.pgn`;
      await FileSystem.writeAsStringAsync(fileUri, pgn, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Sharing not available on this device.");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "application/x-chess-pgn",
        dialogTitle: "Share PGN file",
      });
    } catch (error) {
      Alert.alert(
        "Share Failed",
        error instanceof Error ? error.message : String(error),
      );
    }
  }, [pgn]);

  const startNew = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <View style={sharedStyles.screenContainer}>
      <ScrollView
        style={sharedStyles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>✅ Conversion Complete</Text>
        <Text style={sharedStyles.subtitle}>
          The chess game has been converted to PGN format
        </Text>

        <View style={[sharedStyles.card, styles.pgnCard]}>
          <ScrollView nestedScrollEnabled style={styles.pgnScroll}>
            <Text style={styles.pgnText} selectable>
              {pgn}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <View style={sharedStyles.row}>
          <TouchableOpacity
            style={[sharedStyles.buttonSecondary, styles.halfButton]}
            onPress={copyToClipboard}
            activeOpacity={0.8}
          >
            <Text style={sharedStyles.buttonSecondaryText}>📋 Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[sharedStyles.buttonPrimary, styles.halfButton]}
            onPress={shareFile}
            activeOpacity={0.8}
          >
            <Text style={sharedStyles.buttonPrimaryText}>📤 Share</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.newScanButton}
          onPress={startNew}
          activeOpacity={0.8}
        >
          <Text style={styles.newScanText}>New Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.success,
    marginBottom: 8,
  },
  pgnCard: {
    marginTop: 8,
    maxHeight: 360,
  },
  pgnScroll: {
    maxHeight: 320,
  },
  pgnText: {
    fontSize: 14,
    fontFamily: "monospace",
    color: colors.textPrimary,
    lineHeight: 22,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  halfButton: {
    flex: 1,
    marginBottom: 0,
  },
  newScanButton: {
    marginTop: 14,
    alignItems: "center",
    paddingVertical: 14,
  },
  newScanText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },
});
