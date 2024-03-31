import { DEFAULT_OPTION, RESULT_PER_PAGE } from "../utils/constants";
import supabase, { supabaseAuth } from "./supabase";

export async function getProducts({
  productType,
  location,
  filters,
  pageParam,
  pagination,
}) {
  let query = supabase
    .from(productType || "cabins")
    .select(
      "id,location,maxCapacity,regularPrice,discount,image,isGuestsFavorite,averageRate,coordinates",
      { count: "exact" }
    );

  if (location && location !== DEFAULT_OPTION) {
    // Use ilike to check if the location column contains any of the locations in the array
    query = query.ilike("location", `%${location}%`);
  }

  if (filters)
    filters.forEach((filter) => {
      if (filter.value && filter.value !== DEFAULT_OPTION) {
        query = query[filter.operation](filter.filter, filter.value);
      }
    });

  if (pagination)
    query = query.range(
      (pageParam - 1) * RESULT_PER_PAGE,
      pageParam * RESULT_PER_PAGE - 1
    );

  const { data: products, error, count } = await query;

  if (error) {
    // don't do this in real word
    if (error.message === `relation "public.${productType}" does not exist`)
      throw new Error(`${productType} not existe`);
    else {
      console.error(error.message);
      throw new Error(`${productType} coult not be loaded`);
    }
    // throw new Error("Products could not be loaded");
  }

  return { products, count };
}

export async function getProduct({ productType, productId }) {
  const { data: product, error } = await supabase
    .from(productType)
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Product could not be loaded");
  }

  return product;
}

export async function likeDislikeProduct(newLikedProducts) {
  const { data: user, error } = await supabaseAuth.auth.updateUser({
    data: { likedProducts: newLikedProducts },
  });

  if (error) throw new Error("User could not be updated");

  return user;
}

export async function getProductsByIds(productIds) {
  const { data: products, error } = await supabase
    .from("cabins")
    .select("id,averageRate,regularPrice,name, maxCapacity, image,location")
    .in("id", productIds);

  if (error) {
    console.error(error.message);
    throw new Error("Products could not be loaded");
  }

  return products;
}
