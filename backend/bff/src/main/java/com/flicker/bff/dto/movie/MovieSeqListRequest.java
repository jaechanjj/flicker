package com.flicker.bff.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieSeqListRequest {
    private String movieTitle;
    private int movieYear;
}
