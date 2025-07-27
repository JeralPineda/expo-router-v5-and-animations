import { LeaderBoard } from "@/components/leaderboard/leader-board";
import { View } from "react-native";

export default function LeaderboardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LeaderBoard />
    </View>
  );
}
