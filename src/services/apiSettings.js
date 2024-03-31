import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("minBookingLength, maxBookingLength, breakfastPrice")
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Settings could not be uploaded");
  }

  return settings;
}
