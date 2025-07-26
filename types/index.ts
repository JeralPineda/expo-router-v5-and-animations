import { IonIconName } from "@/components/ui/ion-icon";
import { LinkProps } from "expo-router";

export interface NavigationItem {
  id: number;
  name: string;
  href: LinkProps["href"];
  icon: IonIconName;
}
