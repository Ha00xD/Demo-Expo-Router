import { Colors } from "@/src/constants/theme";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Login() {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuthStore();
  const colorScheme = useColorScheme();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: { email: string; password: string }) => {
    if (!data.email || !data.password) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    reset();
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setToken("0000");
    } catch (error) {
      console.log("error at login >>>", error);
      Alert.alert("Login Failed", "Something went wrong");
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-8 gap-3">
          <View className="items-center mb-8">
            <View
              className="w-24 h-24 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.card }}
            />
          </View>

          <View>
            <Text
              className="text-3xl font-normal text-center"
              style={{ color: colors.text }}
            >
              Title.....
            </Text>
            <Text
              className="text-sm text-center mb-10"
              style={{ color: colors.text }}
            >
              Testing
            </Text>
          </View>

          <View>
            <Text className="text-sm mb-1" style={{ color: colors.text }}>
              Email
            </Text>
            <Controller
              control={control}
              name={"email"}
              render={({ field: { value, onChange, onBlur } }) => (
                <View
                  className="flex-row items-center border rounded-xl px-3 h-12"
                  style={{ borderColor: colors.border }}
                >
                  <Feather name="mail" size={20} color={colors.text} />
                  <TextInput
                    className="flex-1 ml-3"
                    placeholder="Enter your email"
                    placeholderTextColor={colors.text}
                    style={{ color: colors.text }}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
          </View>

          <View>
            <Text className="text-sm mb-1" style={{ color: colors.text }}>
              Password
            </Text>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <View
                  className="flex-row items-center border rounded-xl px-3 h-12"
                  style={{ borderColor: colors.border }}
                >
                  <Feather name="lock" size={20} color={colors.text} />
                  <TextInput
                    className="flex-1 ml-3"
                    placeholder="Enter your password"
                    placeholderTextColor={colors.text}
                    style={{ color: colors.text }}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={20}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit(handleSignIn)}
            className="h-12 rounded-xl items-center justify-center my-6"
            style={{
              backgroundColor: Colors[colorScheme ?? "dark"].tint,
            }}
          >
            {loading ? (
              <ActivityIndicator
                color={Colors[colorScheme ?? "dark"].background}
              />
            ) : (
              <Text
                className="text-base font-semibold"
                style={{
                  color: Colors[colorScheme ?? "dark"].background,
                }}
              >
                Log In
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text style={{ color: colors.text }} className="mr-1">
              Don&apos;t have an account?
            </Text>
            <Link href={"/(auth)/forgetpassword"}>
              <Text className="font-semibold" style={{ color: colors.text }}>
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
