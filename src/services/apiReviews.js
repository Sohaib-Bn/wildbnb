import { REVIEWS_PER_PAGE } from "../utils/constants";
import supabase, { supabaseAuth } from "./supabase";

export async function getProductReviews({ productId, pageParam, productType }) {
  const {
    data: reviews,
    error,
    count,
  } = await supabase
    .from(`${productType}Reviews`)
    .select("*", { count: "exact" })
    .eq("productId", productId)
    .order("created_at", { ascending: false })
    .range(
      (pageParam - 1) * REVIEWS_PER_PAGE,
      pageParam * REVIEWS_PER_PAGE - 1
    );

  if (error) {
    console.error(error.message);
    throw new Error("Reviews could not be loaded");
  }

  return { reviews, count };
}

export async function addReview(reviewData) {
  const { data: review, erros } = await supabase
    .from("cabinsReviews")
    .insert([reviewData])
    .select("rate")
    .single();

  if (erros) {
    console.error(erros.message);
    throw new Error("Review could not be added");
  }

  const {
    data: reviews,
    count,
    errors: errors1,
  } = await supabase
    .from("cabinsReviews")
    .select("rate", { count: "exact" })
    .eq("productId", reviewData.productId);

  if (errors1) {
    console.error(errors1.message);
    throw new Error("Reviews could not be uploaded");
  }

  let isGuestsFavorite;

  // Calculate the total rate
  const totalRate = reviews.reduce((acc, curr) => acc + curr.rate, 0);

  // Calculate the average rate
  const averageRate = (totalRate / reviews.length).toFixed(2);

  if (averageRate >= 4 && count > 5) isGuestsFavorite = true;
  else isGuestsFavorite = false;

  console.log(count);

  const starRates = {};
  for (let i = 1; i <= 5; i++) {
    const rateCount = reviews.filter((rev) => rev.rate === i).length;
    starRates[i] = +((rateCount * 100) / count).toFixed(1);
  }

  const { error } = await supabase
    .from("cabins")
    .update({
      starRates: JSON.stringify(starRates),
      averageRate,
      isGuestsFavorite,
    })
    .eq("id", reviewData.productId)
    .select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be updated");
  }

  return review;
}

export async function likeDislikeReviews({
  reviewId,
  newReviewData,
  newLikedReviews,
  newDislikedReviews,
}) {
  const { data: review, erros } = await supabase
    .from("cabinsReviews")
    .update(newReviewData)
    .eq("id", reviewId)
    .select();

  let updatedUserData = {};

  if (newLikedReviews)
    updatedUserData = {
      likedReviews: newLikedReviews,
    };

  if (newDislikedReviews)
    updatedUserData = {
      ...updatedUserData,
      dislikedReviews: newDislikedReviews,
    };

  const { error } = await supabaseAuth.auth.updateUser({
    data: updatedUserData,
  });

  if (error) throw new Error("User could not be updated");

  if (erros) {
    console.error(erros.message);
    throw new Error("Review could not be updated");
  }

  return review;
}

export async function setProductReviewInfo(cabinId) {
  const { data: reviews, count } = await supabase
    .from("cabinsReviews")
    .select("rate", { count: "exact" })
    .eq("productId", cabinId);

  let isGuestsFavorite;
  let totalRate;
  let averageRate;
  let starRates;

  if (!count) {
    isGuestsFavorite = false;
    averageRate = "1.0";
    starRates = {
      1: 100,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
  }

  if (count) {
    // Calculate the total rate
    totalRate = reviews.reduce((acc, curr) => acc + curr.rate, 0);

    // Calculate the average rate
    averageRate = (totalRate / reviews.length).toFixed(2);

    if (averageRate >= 4 && averageRate >= 4 && count > 5)
      isGuestsFavorite = true;
    else isGuestsFavorite = false;

    const star1Rate =
      (reviews.filter((rev) => rev.rate === 1).length * 100) / count === 0
        ? 0
        : (
            (reviews.filter((rev) => rev.rate === 1).length * 100) /
            count
          ).toFixed(1);

    const star2Rate =
      (reviews.filter((rev) => rev.rate === 2).length * 100) / count === 0
        ? 0
        : (
            (reviews.filter((rev) => rev.rate === 2).length * 100) /
            count
          ).toFixed(1);

    const star3Rate =
      (reviews.filter((rev) => rev.rate === 3).length * 100) / count === 0
        ? 0
        : (
            (reviews.filter((rev) => rev.rate === 3).length * 100) /
            count
          ).toFixed(1);

    const star4Rate =
      (reviews.filter((rev) => rev.rate === 4).length * 100) / count === 0
        ? 0
        : (
            (reviews.filter((rev) => rev.rate === 4).length * 100) /
            count
          ).toFixed(1);

    const star5Rate =
      (reviews.filter((rev) => rev.rate === 5).length * 100) / count === 0
        ? 0
        : (
            (reviews.filter((rev) => rev.rate === 5).length * 100) /
            count
          ).toFixed(1);

    starRates = {
      1: star1Rate,
      2: star2Rate,
      3: star3Rate,
      4: star4Rate,
      5: star5Rate,
    };
  }

  const { error } = await supabase
    .from("cabins")
    .update({
      starRates: JSON.stringify(starRates),
      averageRate,
      isGuestsFavorite,
    })
    .eq("id", cabinId)
    .select("*");

  if (error) {
    console.error(error.message);
    throw new Error("cabin could not be updated");
  }
}
