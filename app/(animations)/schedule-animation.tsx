import { Scheduler } from "@/components/schedule-animation/scheduler";
import { ScrollView, View } from "react-native";

export default function ScheduleAnimation() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <ScrollView>
        <Scheduler />
      </ScrollView>
    </View>
  );
}
