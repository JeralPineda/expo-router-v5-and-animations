import { AppleInvites } from "@/components/apple-invites";
import { BackButton } from "@/components/back-button";
import { StatusBar } from "expo-status-bar";

export default function AppleInvitation() {
  return (
    <>
      <AppleInvites />
      <BackButton />
      <StatusBar style="light" />
    </>
  );
}
