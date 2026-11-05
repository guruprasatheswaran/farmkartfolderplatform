package com.farmkart.entity;

import jakarta.persistence.*;

@Entity
public class Crop {

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic crop information
    @Column(nullable = false)
    private String name;

    private String category;
    private String icon;
    private String season;
    private String duration;
    private String water;
    private String soil;

    // Crop descriptions
    @Column(length = 1500)
    private String benefit;

    @Column(length = 1000)
    private String summary;

    // Crop financial information
    private Double yieldPerAcre;
    private Double pricePerKg;
    private Double costPerAcre;

    // Farming information
    @Column(length = 1500)
    private String tips;

    @Column(length = 2000)
    private String steps;


    // Getter for id
    public Long getId() {
        return id;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String v) {
        name = v;
    }

    // Getter and Setter for category
    public String getCategory() {
        return category;
    }

    public void setCategory(String v) {
        category = v;
    }

    // Getter and Setter for icon
    public String getIcon() {
        return icon;
    }

    public void setIcon(String v) {
        icon = v;
    }

    // Getter and Setter for season
    public String getSeason() {
        return season;
    }

    public void setSeason(String v) {
        season = v;
    }

    // Getter and Setter for duration
    public String getDuration() {
        return duration;
    }

    public void setDuration(String v) {
        duration = v;
    }

    // Getter and Setter for water
    public String getWater() {
        return water;
    }

    public void setWater(String v) {
        water = v;
    }

    // Getter and Setter for soil
    public String getSoil() {
        return soil;
    }

    public void setSoil(String v) {
        soil = v;
    }

    // Getter and Setter for benefit
    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String v) {
        benefit = v;
    }

    // Getter and Setter for summary
    public String getSummary() {
        return summary;
    }

    public void setSummary(String v) {
        summary = v;
    }

    // Getter and Setter for yieldPerAcre
    public Double getYieldPerAcre() {
        return yieldPerAcre;
    }

    public void setYieldPerAcre(Double v) {
        yieldPerAcre = v;
    }

    // Getter and Setter for pricePerKg
    public Double getPricePerKg() {
        return pricePerKg;
    }

    public void setPricePerKg(Double v) {
        pricePerKg = v;
    }

    // Getter and Setter for costPerAcre
    public Double getCostPerAcre() {
        return costPerAcre;
    }

    public void setCostPerAcre(Double v) {
        costPerAcre = v;
    }

    // Getter and Setter for tips
    public String getTips() {
        return tips;
    }

    public void setTips(String v) {
        tips = v;
    }

    // Getter and Setter for steps
    public String getSteps() {
        return steps;
    }

    public void setSteps(String v) {
        steps = v;
    }
}