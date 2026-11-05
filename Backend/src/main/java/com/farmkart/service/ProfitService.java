package com.farmkart.service;

import com.farmkart.dto.*;

import org.springframework.stereotype.Service;

@Service
public class ProfitService {

    public ProfitResponse calculate(ProfitRequest r) {

        double gross = r.landArea() * r.yieldPerAcre();

        double saleable =
                gross * (1 - r.expectedLossPercentage() / 100);

        double revenue =
                saleable * r.sellingPricePerKg();

        double cost =
                r.landArea() *
                (r.seedCost()
                + r.inputCost()
                + r.labourCost()
                + r.otherExpenses());

        return new ProfitResponse(
                round(gross),
                round(saleable),
                round(revenue),
                round(cost),
                round(revenue - cost)
        );
    }

    private double round(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}