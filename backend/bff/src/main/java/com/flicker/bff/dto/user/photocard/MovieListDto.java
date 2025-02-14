package com.flicker.bff.dto.user.photocard;

import lombok.Data;

@Data
public class MovieListDto {
    private int movieSeq;
    private String movieTitle;
    private Integer movieYear;
    private String moviePosterUrl;
    private String backgroundUrl;
    private Double movieRating;
    private String audienceRating;
    private String runningTime;
}
