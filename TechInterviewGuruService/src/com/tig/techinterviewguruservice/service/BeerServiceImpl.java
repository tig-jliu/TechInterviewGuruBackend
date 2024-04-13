package com.tig.techinterviewguruservice.service;

import com.google.common.collect.ImmutableList;
import com.tig.techinterviewguruservice.model.Beer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeerServiceImpl implements BeerService {
    private static final List<Beer> BEER_LIST = ImmutableList.of(
            new Beer(1, "Test beer1", "Pilsner"),
            new Beer(2, "Test beer2", "IPA"),
            new Beer(3, "Test beer3", "Hefeweizen")
    );

    @Override
    public List<Beer> getAllBeers(){
        return BEER_LIST;
    }

    @Override
    public Beer getBeer(final Integer id) {
        for (Beer beer: BEER_LIST) {
            if (beer.getBeerId() == id) {
                return beer;
            }
        }
        return null;
    }
}
