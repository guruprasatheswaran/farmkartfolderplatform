package com.farmkart.dto; 
import jakarta.validation.constraints.*; 
public record ProfitRequest(@NotNull @Positive Double landArea,
    @NotNull @PositiveOrZero Double yieldPerAcre,
   @NotNull @PositiveOrZero Double sellingPricePerKg,
   @NotNull @PositiveOrZero Double seedCost,
   @NotNull @PositiveOrZero Double inputCost,
   @NotNull @PositiveOrZero Double labourCost,
   @NotNull @PositiveOrZero Double otherExpenses,
   @NotNull @DecimalMin(value="0") 
@DecimalMax(value="100") Double expectedLossPercentage){}
