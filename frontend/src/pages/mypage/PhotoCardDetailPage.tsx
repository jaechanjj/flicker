import React, { useState } from "react";
import thumbUpOutline from "../../assets/review/thumb_up_outline.png";
import starFull from "../../assets/review/star.png";
import starHalf from "../../assets/review/star_half.png";
import "../../css/PhotoCard.css";
import { PhotoCardFrontProps } from "../../type";

const PhotoCardDetailPage: React.FC<{
  card: PhotoCardFrontProps["images"][0] | null;
  handleCloseModal: () => void; // 모달 닫기 함수 추가
}> = ({ card, handleCloseModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  

  // card가 undefined일 경우 렌더링하지 않음
  if (!card) {
    return <p>카드 데이터가 없습니다.</p>;
  }

  return (
    <div
      className="w-[450px] h-[650px] photo-card-animation"
      onClick={handleCardClick}
    >
      <div className={`photo-card ${isFlipped ? "flipped" : ""}`}>
        <div className="photo-card-front bg-white p-4 opacity-95 shadow-xl rounded-lg">
          <img
            src={card.src}
            alt="Front"
            className="w-full h-[550px] object-cover rounded-md"
          />
          <h2 className="text-right text-xl mr-2 mt-4 text-black">
            {card.createdAt.slice(0, 10)}
          </h2>
        </div>

        <div className="photo-card-back bg-white p-10 opacity-95 shadow-xl rounded-lg relative">
          <img
            src="/assets/common/x.png"
            alt="Back Button"
            className="w-4 h-4 absolute top-4 right-4 cursor-pointer"
            onClick={handleCloseModal} 
          />
          <h2 className="text-center text-xl italic mb-3 text-black">
            My Photo Card
          </h2>
          <hr className="mb-2 border-gray-600" />
          <p className="text-center text-sm mb-2 text-black">
            {card.movieYear}
          </p>
          <h1 className="text-center text-2xl font-bold mb-4 text-black">
            {card.movieTitle}
          </h1>
          <hr className="mb-6 border-gray-600" />

          <div className="flex items-center justify-center mb-6">
            {Array.from({ length: 5 }, (_, index) => (
              <img
                key={index}
                src={index + 1 <= card.reviewRating ? starFull : starHalf}
                alt="Star"
                className="w-7 h-7 ml-1"
              />
            ))}
            <span className="ml-3 text-xl text-black font-bold">
              {card.reviewRating.toFixed(1)}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 ml-2 text-black text-lg italic">
              info
            </h3>
            <div className="border border-gray-500 rounded-sm p-4 text-sm text-black font-semibold">
              <p>{card.createdAt}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold ml-2 mb-2 text-black text-lg italic">
                my review
              </h3>
              <div className="flex items-center mr-1">
                <img
                  src={thumbUpOutline}
                  alt="Thumb Up"
                  className="w-5 h-5 mr-1 cursor-pointer"
                />
                <span className="text-gray-600 font-semibold">
                  {card.likes}
                </span>
              </div>
            </div>
            <div className="border border-gray-500 rounded-sm p-4 text-sm text-black font-semibold leading-relaxed">
              <p>{card.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCardDetailPage;
