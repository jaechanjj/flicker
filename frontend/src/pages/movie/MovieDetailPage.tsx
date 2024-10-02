import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams 사용
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "../../components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../../apis/axios";
import PlotModal from "../../components/PlotModal";
import { MovieDetail } from "../../type";
import Review from "../../components/Review";
import MoviesList from "../../components/MoviesList";

const MovieDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { movieSeq } = useParams<{ movieSeq: string }>(); // URL에서 movieSeq를 가져옴
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [interestOption, setInterestOption] = useState("관심 없음");
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("배우");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // movieSeq가 없으면 바로 return

  const userSeq = 2; // 예시로 userSeq 고정값 사용

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useQuery를 통해 movieDetail API 호출
  const { data, error, isLoading } = useQuery<MovieDetail, Error>({
    queryKey: ["movieDetail", movieSeq], // queryKey에 movieSeq 포함
    queryFn: async () => {
      const movieDetail = await fetchMovieDetail(Number(movieSeq), userSeq);
      console.log(movieDetail);
      return movieDetail;
    },
  });
  // console.log(data); // undefined

  useEffect(() => {
    if (data) {
      setIsLiked(bookMarkedMovie); // 초기 상태 설정
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie details.</div>;

  if (!data) return null; // data가 undefined일 경우를 처리

  const {
    movieDetailResponse: {
      movieTitle,
      director,
      genre,
      country,
      moviePlot,
      audienceRating,
      movieYear,
      runningTime,
      moviePosterUrl,
      trailerUrl,
      backgroundUrl,
      movieRating,
      actors,
    } = {}, // movieDetailResponse가 없을 경우를 대비해 기본값으로 빈 객체 설정
    bookMarkedMovie = false,
    unlikedMovie = false,
    reviews = [],
    similarMovies = [],
  } = data;

  console.log(data);

  const MAX_LENGTH = 250;
  const isLongText =
    moviePlot &&
    moviePlot.length > MAX_LENGTH;
  const displayedText = moviePlot
    ? moviePlot.slice(0, MAX_LENGTH)
    : ""; // movieDetailResponse가 없으면 빈 문자열 반환
  const extractVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/e\/|watch\?v=|watch\?.+&v=)([^&\n?#]+)/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

const videoId = trailerUrl ? extractVideoId(trailerUrl) : null;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleHeart = () => {
    setIsLiked((prev) => !prev);
  };

  const goToReview = () => {
    navigate("/review");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = () => {
    setInterestOption((prev) =>
      prev === "관심 없음" ? "관심 없음 취소" : "관심 없음"
    );
    setIsDropdownOpen(false);
  };

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case "배우":
        return (
          <div className="flex flex-wrap gap-2 mt-6">
            {(actors || []).map((actor, index) => (
              <span
                key={index}
                className="relative px-3 py-1 text-[15px] rounded-[5px] text-white bg-black bg-opacity-70 z-10"
              >
                {actor.actorName}
              </span>
            ))}
          </div>
        );
      case "감독":
        return (
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="relative px-3 py-1 text-[15px] rounded-[5px] text-white bg-black bg-opacity-70 z-10">
              {director}
            </span>
          </div>
        );
      case "장르":
        return (
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="relative px-3 py-1 text-[15px] rounded-[5px] text-white bg-black bg-opacity-70 z-10">
              {genre}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-black h-screen overflow-y-auto">
      {/* 영화 세부 정보 */}
      <div className="relative h-auto">
        <div
          className="absolute inset-0 h-[650px] w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Header with Navbar */}
        <header className="sticky top-0 bg-transparent z-20">
          <Navbar />
        </header>

        {/* Top section */}
        <div className="relative flex items-end text-white p-3 w-[1100px] h-[480px] bg-transparent ml-[50px] mt-[120px] overflow-hidden">
          {/* Left Section: Movie Poster and Details */}
          <div className="flex flex-col lg:flex-row">
            <img
              src={moviePosterUrl}
              alt="Movie Poster"
              className="w-[270px] h-[410px] shadow-md border"
            />
            <div className="mt-4 ml-[60px] flex-1">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-4xl font-bold flex-1 flex items-center overflow-hidden">
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {movieTitle}
                  </span>
                  <span className="flex items-end ml-4 flex-shrink-0">
                    <span className="text-blue-500 text-2xl">⭐</span>
                    <span className="text-2xl">{movieRating}</span>
                  </span>
                </h2>

                {/* Heart icon */}
                <div
                  className="flex items-end ml-auto relative flex-shrink-0"
                  ref={dropdownRef}
                >
                  <svg
                    className="w-6 h-6 cursor-pointer"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleHeart}
                    fill={isLiked ? "red" : "none"}
                    stroke={isLiked ? "none" : "red"}
                    strokeWidth="2"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <button
                    className="text-white text-3xl ml-2 relative z-20"
                    onClick={toggleDropdown}
                  >
                    ⋮
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-gray-200 text-black bg-opacity-90 rounded-md shadow-lg z-50 font-bold text-left">
                        <div
                          className="cursor-pointer px-4 py-2 text-base hover:bg-gray-400 rounded-md hover:bg-opacity-80 shadow-lg z-50"
                          onClick={handleOptionClick}
                        >
                          {interestOption}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Movie details */}
              <div className="flex mt-4 text-white text-[16px]">
                <span>{movieYear}</span>
                <span className="px-4 text-gray-200">|</span>
                <span>{runningTime}</span>
                <span className="px-4 text-gray-200">|</span>
                <span>{audienceRating}</span>
              </div>
              <p className="mt-4 text-lg">
                {displayedText}
                {isLongText && (
                  <button className="text-gray-400 ml-2" onClick={openModal}>
                    더보기
                  </button>
                )}
              </p>
              <PlotModal
                isopen={isModalOpen}
                onClose={closeModal}
                movieDetail={data}
              />
              <div>
                <div className="flex w-full h-[40px] bg-transparent border-b border-opacity-50 border-white text-white justify-start items-center space-x-4 mt-4 cursor-pointer">
                  {["배우", "감독", "장르"].map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`font-bold text-[18px] mt-[10px] cursor-pointer ${
                        selectedCategory === category
                          ? "border-b-2 border-white"
                          : ""
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
                {renderCategoryContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="flex">
        <div className="p-1 bg-black text-black w-[800px] h-[400px] mt-[100px] ml-[150px] border-b border-white">
          <div className="flex w-full justify-between items-center">
            <h3 className="text-2xl font-bold text-white">Reviews</h3>
            <div
              className="text-white flex ml-auto items-center cursor-pointer italic underline"
              onClick={goToReview}
            >
              more
            </div>
          </div>
          <div className="mt-4 space-y-4 text-white text-[14px]">
            {reviews.map((review) => (
              <Review
                key={review.reviewSeq}
                review={review}
                liked={review.liked}
                likes={review.likes}
                nickname={review.nickname}
                top={false} // 기본값 설정
              />
            ))}
          </div>
        </div>

        {/* Trailer */}
        <div className="w-[700px] bg-black text-white flex justify-center items-center m-4 p-4 h-[400px] ml-[50px] mt-[100px]">
          <div className="relative w-full max-w-4xl h-full">
            <iframe
              src={`${trailerUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
              title="YouTube video player"
              className="w-full h-full rounded-lg shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
              <svg className="w-12 h-12" />
            </button>
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 rounded-br-lg">
              절찬 상영중
            </div>
          </div>
        </div>
      </div>

      {/* Recommended movies */}
      <div className="h-[300px] w-[1700px] flex-shrink-0 mb-[100px] mt-[20px]">
        <MoviesList
          category="탑건: 매버릭과 유사한 장르 작품들"
          movies={similarMovies} // recommendedMovieList를 movies prop으로 전달
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;
