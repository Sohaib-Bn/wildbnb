import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function PageNotFount() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full grid grid-cols-2 px-[8rem] items-center justify-center text-colorBlackLight">
      <div className="flex items-start gap-7">
        <div className="flex gap-6 flex-col">
          <h1 className="font-bold text-9xl">Oops!</h1>
          <h3 className="font-noraml text-[1.7rem]">
            We can't seem to find the page you're looking for.
          </h3>

          <div>
            <Button onClick={() => navigate(-1)}>Go back &larr;</Button>
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-[35rem]"
          src="/public/notFound-2.svg"
          alt="notFound"
        />
      </div>
    </div>
  );
}

export default PageNotFount;
