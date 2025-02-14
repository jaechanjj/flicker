package com.flicker.bff.dto.client;

import lombok.Data;

import java.util.List;

@Data
public class BoardingPageDto {
    public boolean bookMarkedMovie;
    public boolean unlikedMovie;
    public MovieDto movie;
    public List<ReviewDto> reviewList;
    public List<RecommendMovieDto> recommendedMovieList;
}
