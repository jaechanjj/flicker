import { Sprite } from "pixi.js";

export interface ReviewType {
  reviewSeq: number;
  createdAt: string;
  nickname: string;
  reviewRating: number;
  content: string;
  spoiler: boolean;
  likes: number;
  liked: boolean;
  top: boolean;
}

export interface ReviewProps {
  review: ReviewType;
  onLikeToggle: (reviewSeq: number) => void; // 좋아요 토글 함수
}

export interface FilterOptions {
  value: string; // 드롭다운 옵션 값
  label: string; // 드롭다운 옵션 레이블
}

export interface RatingData {
  stars: number; // 평점 데이터
  count: number; // 평점 개수
}

export interface SignUpParams {
  userId: string;
  email: string;
  password: string;
  passCheck: string;
  nickname: string;
  birthDate: string;
  gender: "M" | "F" | "";
}

export interface SignInParams {
  userId: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string; 
  email: string;
  nickname: string;
  birthDate: string;
  gender: "M" | "F" | "";
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  //   data?: any; // 만약 응답 데이터 구조가 복잡하다면, 여기서 구체적인 타입을 추가할 수 있음
}

export interface ExtendedSprite extends Sprite {
  userData: {
    angle: number;
    rotationOffset: number;
    yOffset: number;
  };
}

export interface MovieDetail {
  bookMarkedMovie: boolean;
  movie: {
    movieSeq: number;
    movieDetail: {
      movieTitle: string;
      director: string;
      genre: string;
      country: string;
      moviePlot: string;
      audienceRating: string;
      movieYear: number;
      runningTime: string;
      moviePosterUrl: string;
      trailerUrl: string;
      backgroundUrl: string;
    };
    movieRating: number;
    actors: {
      actorName: string;
      role: string;
    }[];
  };
  reviewList: {
    reviewSeq: number;
    createdAt: string;
    nickname: string;
    reviewRating: number;
    content: string;
    spoiler: boolean;
    likes: number;
    liked: boolean;
    top: boolean;
  }[];
  recommendedMovieList: {
    movieSeq: number;
    moviePosterUrl: string;
  }[];
  likeMovie: boolean;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface SearchBarProps {
  initialSearchQuery?: string;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ServiceContentProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface TopTenMovie {
  movieSeq: number;
  movieTitle: string;
  moviePosterUrl: string;
}

// Photocard Review 데이터 타입
export interface PhotoCardReviewDto {
  userSeq: number;
  movieSeq: number;
  reviewSeq: number;
  nickname: string;
  reviewRating: number;
  content: string;
  spoiler: boolean;
  likes: number;
  liked: boolean;
  createdAt: string;
  top: null | string;
}

// Movie Image DTO 데이터 타입
export interface MovieImageDto {
  moviePosterUrl: string;
}

// Photocard 데이터 타입
export interface PhotocardData {
  reviewDto: PhotoCardReviewDto;
  movieImageDto: MovieImageDto;
}

// Photocard API 응답 데이터 타입
export interface PhotocardResponse {
  data: PhotocardData[];
}

// IFlipBook = 포토북
export interface IFlipBook {
  flipNext: () => void;
  flipPrev: () => void;
  pageFlip: () => { flipNext: () => void; flipPrev: () => void };
}

export interface PhotoCardFrontProps {
  images: { src: string; alt: string }[];
  pageIndex: number;
}