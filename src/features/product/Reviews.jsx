import { format } from "date-fns";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useProductReviews } from "./useProductReviews";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./useProduct";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useLikeDislikeReview } from "./useLikeDislikeReview";
import { useUser } from "../auth/useUser";

import Rating from "../../ui/Rating";
import ReadOnlySlider from "../../ui/ReadOnlySlider";
import SkeletonReviews from "./SkeletonRviews";
import AddReviewForm from "./AddReviewForm";
import ButtonAddReview from "../../ui/ButtonAddReview";

function Reviews() {
  return (
    <div id="reviews-section" className="flex flex-col gap-6 mt-5">
      <h2 className="font-semibold text-colorBlack text-[1.35rem]">Reviews</h2>
      <ReviewsOverView />
      <ReviewsList />
    </div>
  );
}

export default Reviews;

function ReviewsOverView() {
  const {
    product: { averageRate, starRates },
  } = useProduct();

  const starRatesParsed = JSON.parse(starRates);

  const { count } = useProductReviews();

  return (
    <div className="flex items-start gap-[4rem]">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-6xl text-colorGrey900">{averageRate}</h2>
        <Rating value={averageRate} />
        <p
          className="font-nomal text-base
           text-colorGrey900 transition-all"
          href="/"
        >
          {count} reviews
        </p>
      </div>
      <div className="w-[40%] flex flex-col-reverse text-sm">
        {Object.keys(starRatesParsed).map((rating) => (
          <div className="flex items-center gap-5" key={rating}>
            <span>{rating}</span>
            <ReadOnlySlider value={Number(starRatesParsed[rating])} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsList() {
  const [showForm, setShowForm] = useState(false);

  const { isLoading, reviews, hasNextPage, fetchNextPage } =
    useProductReviews();

  if (isLoading) return <SkeletonReviews />;

  return (
    <div className="flex flex-col gap-5 mt-5">
      <ul className="flex flex-col gap-10">
        {reviews.map((rev) => (
          <Review key={rev.id} reviewData={rev} />
        ))}
      </ul>
      <div className="grid grid-cols-2 items-center">
        {!showForm && (
          <>
            {hasNextPage && (
              <div className="justify-self-star">
                <button
                  onClick={fetchNextPage}
                  className="underline hover:text-colorBlack"
                >
                  Show more
                </button>
              </div>
            )}

            <div className="justify-self-end text-sm col-start-2">
              <ButtonAddReview setShowForm={setShowForm} />
            </div>
          </>
        )}
        {showForm && (
          <div className="flex flex-col gap-4">
            <Divider />
            <AddReviewForm setShowForm={setShowForm} />
          </div>
        )}
      </div>
    </div>
  );
}

function Review({ reviewData }) {
  const { id, name, avatar, date, rate, review, likes, dislikes } = reviewData;

  const { isPending, likeDislikeReview } = useLikeDislikeReview();
  const { isAuthorized } = useAppContext();
  const navigate = useNavigate();

  const { user = {} } = useUser();

  let likedReviews = user?.user_metadata?.likedReviews || [];
  let dislikedReviews = user?.user_metadata?.dislikedReviews || [];

  const isLiked = likedReviews.includes(id);
  const isDisliked = dislikedReviews.includes(id);

  function handleLike() {
    if (!isAuthorized) {
      sessionStorage.setItem(
        "redirectTo",
        `${window.location.href}#reviews-section`
      );
      navigate(`/login`);

      return;
    }

    let newLikedReviews, newDislikedReviews;
    let newReviewData = {};

    if (isLiked) {
      newLikedReviews = likedReviews.filter((rev) => rev !== id);
      newReviewData = { likes: likes - 1 };
    } else {
      newLikedReviews = [...likedReviews, id];
      newReviewData = { likes: likes + 1 };
    }

    if (isDisliked) {
      newDislikedReviews = dislikedReviews.filter((rev) => rev !== id);
      newReviewData = { ...newReviewData, dislikes: dislikes - 1 };
    }

    likeDislikeReview({
      reviewId: id,
      newReviewData,
      newLikedReviews,
      newDislikedReviews,
    });
  }

  function handleDislike() {
    if (!isAuthorized) {
      sessionStorage.setItem(
        "redirectTo",
        `${window.location.href}#reviews-section`
      );
      navigate(`/login`);

      return;
    }

    let newLikedReviews, newDislikedReviews;
    let newReviewData = {};

    if (isDisliked) {
      newDislikedReviews = dislikedReviews.filter((rev) => rev !== id);
      newReviewData = { dislikes: dislikes - 1 };
    } else {
      newDislikedReviews = [...dislikedReviews, id];
      newReviewData = { dislikes: dislikes + 1 };
    }

    if (isLiked) {
      newLikedReviews = likedReviews.filter((rev) => rev !== id);
      newReviewData = { ...newReviewData, likes: likes - 1 };
    }

    likeDislikeReview({
      reviewId: id,
      newReviewData,
      newLikedReviews,
      newDislikedReviews,
    });
  }

  return (
    <li className="flex flex-col gap-3">
      <div className="flex gap-3 items-start">
        <img
          className="w-10 rounded-full"
          src={avatar !== "" ? avatar : "/public/default-user.jpg"}
          alt="avatar"
        />
        <div>
          <p className="font-medium text-[.95rem] text-colorBlack">{name}</p>
          <p className="font-light text-colorGrey500 text-[0.8rem]">
            {format(date, "MMMM do',' yyyy")}
          </p>
        </div>
      </div>
      <Rating size="1.3rem" value={rate} />
      <p className="text-[0.95rem]">{review}</p>
      <div className="flex items-center gap-4">
        <button
          disabled={isPending}
          onClick={handleLike}
          className={`flex items-center  gap-2 hover:text-colorBlack hover:scale-105 transition-all ${
            isLiked ? "text-colorBlack scale-105" : "text-colorGrey600"
          }`}
        >
          <AiOutlineLike size={18} />
          <span>{likes ? likes : ""}</span>
        </button>
        <button
          disabled={isPending}
          onClick={handleDislike}
          className={`flex items-center  gap-2 hover:text-colorBlack hover:scale-105 transition-all ${
            isDisliked ? "text-colorBlack scale-105" : "text-colorGrey600"
          }`}
        >
          <AiOutlineDislike size={18} />
          <span>{dislikes ? dislikes : ""}</span>
        </button>
      </div>
    </li>
  );
}
