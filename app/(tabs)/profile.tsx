import { useAuth } from "@/provider/auth-provider";
import { Button, Text, View } from "react-native";

export default function Profile() {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
