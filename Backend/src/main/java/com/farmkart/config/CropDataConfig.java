package com.farmkart.config;
import com.farmkart.entity.Crop;
 import com.farmkart.repository.CropRepository; 
 
import org.springframework.boot.CommandLineRunner;
  import org.springframework.context.annotation.*;
@Configuration public class CropDataConfig {
     @Bean CommandLineRunner seedCrops(CropRepository repo){

        return args->{if(repo.count()>0)return; 
    //  add(repo,"Tomato","Vegetable","🍅","Kharif / Rabi","90–120 days","Regular","Well-drained loam",25000,30,85000,"A high-value vegetable crop with frequent harvests and strong local demand.","Rich in vitamins and can generate regular income through staggered picking.","Use healthy seedlings, mulch the beds, and monitor for pests.","Prepare raised beds|Transplant healthy seedlings|Irrigate regularly|Harvest ripe fruits");
     add(repo,"Rice","Cereal","🍚","Kharif","120–150 days","High","Clay loam",2500,28,42000,"A staple cereal cultivated widely in warm, water-abundant regions.","Primary food grain with reliable market demand.","Use certified seed and manage standing water carefully.","Prepare puddled field|Sow or transplant seedlings|Maintain water level|Harvest golden panicles");
     add(repo,"Wheat","Cereal","🌾","Rabi","120–140 days","Moderate","Loam to clay loam",2200,27,30000,"A cool-season staple grain suited to well-prepared fields.","A dependable crop with storage-friendly grain.","Sow on time and avoid excess irrigation near maturity.","Prepare fine seedbed|Drill seeds evenly|Irrigate at critical stages|Harvest when dry");
     add(repo,"Maize","Cereal","🌽","Kharif / Rabi","90–110 days","Moderate","Well-drained loam",3000,24,32000,"Versatile cereal used for food, feed, and industry.","Fast-growing crop with diverse market uses.","Ensure spacing and weed control during early growth.","Prepare field|Sow in rows|Fertilize and weed|Harvest dry cobs");
     add(repo,"Potato","Vegetable","🥔","Rabi","90–120 days","Moderate","Sandy loam",10000,22,70000,"A tuber crop that rewards careful seed and moisture management.","High yield potential and broad culinary demand.","Use disease-free seed tubers and earth up plants.","Prepare loose beds|Plant seed tubers|Irrigate lightly|Harvest after foliage dries");
     add(repo,"Onion","Vegetable","🧅","Rabi","120–150 days","Moderate","Sandy loam",8000,26,60000,"A kitchen staple requiring steady irrigation and curing.","Consistent household demand and good storage potential.","Avoid waterlogging and cure bulbs before storage.","Raise nursery|Transplant seedlings|Irrigate and weed|Cure mature bulbs");
     add(repo,"Sugarcane","Cash Crop","🎋","Annual","10–14 months","High","Deep fertile loam",35000,4.5,95000,"Long-duration cash crop grown for sugar and jaggery.","High biomass yield and by-product value.","Use fresh setts and maintain regular irrigation.","Prepare deep field|Plant cane setts|Earth up and irrigate|Harvest mature cane");
     add(repo,"Groundnut","Oilseed","🥜","Kharif / Rabi","100–120 days","Moderate","Sandy loam",1000,65,28000,"An oilseed legume that also supports soil health.","Valuable edible oil and protein source.","Use well-drained soil and avoid excess water at maturity.","Prepare fine seedbed|Sow treated seed|Weed early|Lift plants when pods mature");};}
      private void add( 
        CropRepository r,String n,String c,String i,String s,String d,String w,String soil,double y,double p,double cost,String summary,String benefit,String tips,String steps)
      {Crop x=new Crop();
        x.setName(n);
        x.setCategory(c);
        x.setIcon(i);
        x.setSeason(s);
        x.setDuration(d);
        x.setWater(w);
        x.setSoil(soil);
        x.setYieldPerAcre(y);
        x.setPricePerKg(p);
        x.setCostPerAcre(cost);
        x.setSummary(summary);
        x.setBenefit(benefit);
        x.setTips(tips);
        x.setSteps(steps);
        r.save(x);
    }
}
