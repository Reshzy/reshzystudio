import profile from "@/content/profile/profile.json";
import type { Profile } from "@/types/content";

export function loadProfile(): Profile {
  return profile as Profile;
}
