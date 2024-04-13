package com.tig.techinterviewguruservice.service;

import com.tig.techinterviewguruservice.model.Beer;

import java.util.List;

public interface BeerService {
    public List<Beer> getAllBeers();

    public Beer getBeer(final Integer id);
}
