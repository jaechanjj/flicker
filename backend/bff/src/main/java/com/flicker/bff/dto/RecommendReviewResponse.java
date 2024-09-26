package com.flicker.bff.dto;

import lombok.Data;

@Data
public class RecommendReviewResponse {
    private int movieSeq;
    private double reviewRating;
    private double sentimentScore;
}
