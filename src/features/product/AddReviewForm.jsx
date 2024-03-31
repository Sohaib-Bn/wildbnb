import { useEffect, useRef, useState } from "react";
import { useUser } from "../auth/useUser";
import { useProduct } from "./useProduct";
import { useAddReview } from "./useAddReview";

import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import RatingControlled from "../../ui/RatingControlled";
import FormRow from "../../ui/FormRow";

function AddReviewForm({ setShowForm }) {
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [erros, setErros] = useState({
    review: "",
    rate: "",
  });

  const { isPending, addReview } = useAddReview();

  const {
    user: {
      user_metadata: { picture, full_name },
    },
  } = useUser();

  const {
    product: { id },
  } = useProduct();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErros({
      review: "",
      rate: "",
    });

    if (!rate) {
      setErros((erros) => {
        return { ...erros, review: "Please leave a rate" };
      });

      return;
    }

    if (!review) {
      setErros((erros) => {
        return { ...erros, review: "Please leave a review" };
      });
      inputRef.current.focus();

      return;
    }

    // PREPARING REVIWE DATA
    const reviewData = {
      avatar: picture,
      name: full_name,
      dislikes: 0,
      likes: 0,
      productId: id,
      date: new Date().toISOString(),
      review,
      rate,
    };

    addReview(reviewData, { onSuccess: () => setShowForm(false) });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span>How was your trip?</span>

        <RatingControlled
          disabled={isPending}
          value={rate}
          setValue={setRate}
        />
      </div>

      <FormRow orientaion="vertical" error={erros.review || erros.rate}>
        <TextArea
          disabled={isPending}
          inputRef={inputRef}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
        />
      </FormRow>

      <div className="flex items-center gap-4 self-end">
        <Button
          disabled={isPending}
          onClick={() => setShowForm(false)}
          variation="secondary"
          size="small"
        >
          Cancel
        </Button>

        <Button disabled={isPending} size="small">
          Add
        </Button>
      </div>
    </form>
  );
}

export default AddReviewForm;
