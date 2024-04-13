package com.tig.techinterviewguruservice.controller;

import com.tig.techinterviewguruservice.model.Beer;
import com.tig.techinterviewguruservice.service.BeerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BeerController {
    private BeerService beerService;

    @Autowired
    public BeerController(final BeerService beerService) {
        this.beerService = beerService;
    }

    @GetMapping("/beers")
    public List<Beer> getAllBeers(){
        return beerService.getAllBeers();
    }

    @GetMapping("/beer/{id}")
    public Beer getBeer(@PathVariable("id") final Integer id){
        return beerService.getBeer(id);
    }

    @GetMapping("/health")
    public String getHealth() {
        return "Healthy";
    }
}
