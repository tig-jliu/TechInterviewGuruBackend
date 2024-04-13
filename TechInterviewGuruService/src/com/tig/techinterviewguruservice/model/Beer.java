package com.tig.techinterviewguruservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Beer {
    private int beerId;
    private String beerName;
    private String beerType;
}
