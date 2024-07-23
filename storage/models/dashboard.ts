import { IconVariant } from "@/components/ui/Icon";

export type StatItem = {
  variant: "primary" | "secondary";
  icon: string;
  iconVariant: IconVariant;
  total: number;
  name: string;
  value?: number;
  href: string;
};
