import supabase from "./supabase";
const supabaseUrl = "https://qhxlwihazoqljmgyeawh.supabase.co";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("cabim could not deleted");
  }
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create or edit
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error("SUPABASE ERROR:", error.message, error.details, error.hint);
    throw new Error("Cabin could not be saved");
  }

  if (hasImagePath) return data;

  // 3. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.log("STORAGE ERROR:", storageError);
    if (!id) await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded");
  }

  return data;
}
