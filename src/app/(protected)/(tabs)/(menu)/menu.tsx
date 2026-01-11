import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsOnline } from "@/src/hooks/useIsOnline";
import Axios from "@/src/constants/axios";

const MenuScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      phonenumber: "",
    },
  });

  const db = useSQLiteContext();
  const isOnline = useIsOnline();
  const [pendingCount, setPendingCount] = useState(0);
  const [data, setData] = useState();

  const loadPendingCount = async () => {
    const result = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM usersInfo WHERE isSynced = 0"
    );
    const res = await db.getAllAsync(`SELECT * FROM usersInfo`);
    console.log("SSSDDDD>>>", res);
    setPendingCount(result?.count ?? 0);
  };

  useEffect(() => {
    loadPendingCount();
  }, []);

  const insertUserInfo = async (data) => {
    return await db.runAsync(
      `INSERT INTO usersInfo
       (username,password, phoneNumber, status, isSynced, updatedAt)
       VALUES (?, ?, ?, 'pending', 0, ?)`,
      [data.username, data.password, data.phonenumber, new Date().toISOString()]
    );
  };

  const saveUserInfo = async (data) => {
    try {
      const result = await insertUserInfo(data);
      reset();

      if (!isOnline) {
        Alert.alert("Saved locally", "Will sync when online");
        return;
      }

      const res = await Axios.post("/TicketQr/is-valid-qr", {
        qrCode: data.username,
      });

      console.log("Check Saveinfo res", res.data);

      await db.runAsync(
        `UPDATE usersInfo SET status='synced', isSynced=1 WHERE id=?`,
        [result.lastInsertRowId]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      loadPendingCount();
    }
  };

  const syncUserInfo = async () => {
    const pending = await db.getAllAsync(
      "SELECT * FROM usersInfo WHERE isSynced = 0"
    );

    for (const item of pending) {
      try {
        const res = await Axios.post("/TicketQr/is-valid-qr", {
          qrCode: item.username,
        });

        console.log("Sync response!!!!!!!!!!!!!!!!!!!!", res.data);

        await db.runAsync(
          `UPDATE usersInfo
           SET isSynced=1, status='synced', updatedAt=?
           WHERE id=?`,
          [new Date().toISOString(), item.id]
        );
      } catch {
        await db.runAsync(`UPDATE usersInfo SET status='failed' WHERE id=?`, [
          item.id,
        ]);
      }
    }
    loadPendingCount();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="h-14 items-center justify-center bg-stone-200">
        <Text className="text-lg font-semibold">Menu</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-4 gap-3">
          <View>
            <Text className="mb-1 font-semibold text-gray-700">User Name</Text>
            <Controller
              control={control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  className="border border-gray-300 rounded-lg px-3 py-3"
                />
              )}
            />
            {errors.username && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-1 font-semibold text-gray-700">
              Phone Number
            </Text>
            <Controller
              control={control}
              name="phonenumber"
              rules={{ required: "Phone number is required" }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-lg px-3 py-3"
                />
              )}
            />
            {errors.phonenumber && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.phonenumber.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-1 font-semibold text-gray-700">Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  className="border border-gray-300 rounded-lg px-3 py-3"
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit(saveUserInfo)}
            className="border rounded-lg py-3 items-center"
          >
            <Text className="font-semibold">Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => db.runAsync("DELETE FROM usersInfo")}
            className="border rounded-lg py-3 items-center"
          >
            <Text className="font-semibold">Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isOnline}
            onPress={syncUserInfo}
            className={`border rounded-lg py-3 items-center ${
              !isOnline ? "opacity-40" : ""
            }`}
          >
            <Text className="font-semibold">
              Sync UserInfo ({pendingCount})
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MenuScreen;
