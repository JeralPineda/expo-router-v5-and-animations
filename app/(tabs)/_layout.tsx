import { Tabs } from "expo-router";

export default function TabLayout() {
  const isAdmin = false;

  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />

      <Tabs.Protected guard={isAdmin}>
        <Tabs.Screen name="admin" />
      </Tabs.Protected>
    </Tabs>
  );
}
