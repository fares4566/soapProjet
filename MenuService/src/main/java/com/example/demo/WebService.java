package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;


import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;


@Path("/service")
public class WebService {

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    PlatRepository platRepository;

    @POST
    @Path("/restaurant")
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurants addRestaurant(Restaurants restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @POST
    @Path("/restaurant/{id}/plats")
    @Produces(MediaType.APPLICATION_JSON)
    public Plats addPlatToRestaurant(@PathParam("id") int restaurant_id, Plats plat) {
        Optional<Restaurants> r1 = restaurantRepository.findById(restaurant_id);
        if (r1.isPresent()) {
            plat.setRestaurant(r1.get());
            return platRepository.save(plat);
        } else {
            throw new NotFoundException("Restaurant not found with ID: " + restaurant_id);
        }
    }

    @GET
    @Path("/restaurant/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Plats> getPlats(@PathParam("id") int restaurant_id) {
        Optional<Restaurants> r1 = restaurantRepository.findById(restaurant_id);
        if (r1.isPresent()) {
            return r1.get().getPlats();
        } else {
            throw new NotFoundException("Restaurant not found with ID: " + restaurant_id);
        }
    }
}
