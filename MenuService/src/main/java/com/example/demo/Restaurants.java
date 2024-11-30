package com.example.demo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Restaurants {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String address;
	@OneToMany(mappedBy = "restaurant",fetch = FetchType.EAGER)
	@JsonManagedReference
	private List<Plats> plats;
	public Restaurants() {}
	public Restaurants(String name,String address) {
		this.name=name;
		this.address=address;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public List<Plats> getPlats() {
		return plats;
	}
	public void setPlats(List<Plats> plats) {
		this.plats = plats;
	}
	

}
