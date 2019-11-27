import { Component, OnInit, NgZone } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
//import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_indiaHigh from "@amcharts/amcharts4-geodata/indiaHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';

@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.css']
})
export class IndiaMapComponent implements OnInit {
  private map: am4maps.MapChart;
  showProperty = "none";
  DistrictPanel: boolean = false;
  constructor(private zone: NgZone, private router: Router, ) { }
  /* Map Functions and Datas */
  dataArray = [{
    "id": "IN-JK",
    "name": "Jamu & Kashmir",
    "value": 100,
    "lebels":"abc"
  }];
  zoomControl: any;
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let map = am4core.create("chartdiv", am4maps.MapChart);

      map.paddingRight = 40;
      map.geodata = am4geodata_indiaHigh;
      map.zoomToRectangle(
        map.north,
        map.east,
        map.south,
        map.west,
        1,
        true
      );
      map.maxZoomLevel = 0.85;
      let home = map.chartContainer.createChild(am4core.Button);
      home.label.text = "Focus";
      home.align = "right";
      home.events.on("hit", function (ev) {
        map.goHome();
      });
      // Set projection
      map.projection = new am4maps.projections.Miller();

      // Create map polygon series
      var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

      // Exclude Antartica
      polygonSeries.exclude = ["AQ"];

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value}";
     // polygonTemplate.getTagValue("ABC");
      polygonTemplate.titleElement.textContent="{name}: {value}";
      polygonTemplate.defaultState.name="{name}: {value}";
      polygonSeries.propertyFields.fill = "name";

      polygonSeries.data = JSON.parse(JSON.stringify(this.dataArray));
      //polygonTemplate.fill = am4core.Label="#ed3b3b";
      //polygonTemplate.propertyFields.fill = "fill";

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#2258d6");
      // ="{name}: {value}";
      map.zoomControl = new am4maps.ZoomControl();
      map.zoomControl.slider.height = 100;


      let gradient = new am4core.LinearGradient();
      gradient.rotation = 90;
      polygonTemplate.fill = am4core.color("#ed3b3b");
      polygonTemplate.propertyFields.fill = "fill";
      /*  gradient.addColor(am4core.color("orange"));
       gradient.addColor(am4core.color("white"));
       gradient.addColor(am4core.color("green"));
       polygonTemplate.fill = gradient; */
      // map.openPopup("Hello there!");
      /*   polygonTemplate.events.on("hit", this.showModel, this); */


     //00000000000000000000000000000000000000000
// Show tooltips only if the state has a value
// (A tooltip will appear if tooltipText is not empty.)
// polygonTemplate.adapter.add("tooltipText", function(tooltipText, polygon) {
//   if (isNaN(polygon.dataItem.dataContext.value)) {
//     return "";
//   }
//   return tooltipText;
// });

// When clicking a US State, if it has a numeric value:
// 1. hide tooltip (use hit event handler)
// 2. open URL if available (use url property, property binding, and adapter)
polygonTemplate.events.on("hit", function(event) {
  // The original logic was if this state has a numeric value,
  // but a tooltip will only show if that's the case,
  // so we can just hide it regardless.
  
  // All these are ways to hide the tooltip, the actual tooltip
  // object is on the series, not the individual mapPolygons:
  // polygonSeries.tooltip.hide();
  // polygonSeries.hideTooltip();
  event.target.hideTooltip();
});

polygonTemplate.propertyFields.url = "modalUrl";
polygonTemplate.urlTarget = "_self";
// We can either now parse data before it's processed and prevent modalUrl
// from being applied if the value DNE or isNaN,
// OR!
// We can use an adapter for url, reset it as needed, and override the cursor style.

// This adapter will trigger on hit
polygonTemplate.adapter.add("url", function(url, polygon) {
  // if data isn't ready, or value isn't a number, kill the url if it has one
  // if (! polygon.dataItem || !polygon.dataItem.dataContext || isNaN(polygon.dataItem.dataContext.value)) {
  //   return "";
  // }
  return url;
});
// When url is applied, hover cursor is changed to pointer
polygonSeries.events.on("datavalidated", function() {
  polygonSeries.mapPolygons.each(function(polygon) {
    // Since we only set url via property binding, if it has an url
    // already, then it definitely has the dataItem.dataContext,
    // but maybe not a value.
    // if (polygon.properties.url && isNaN(polygon.dataItem.dataContext.value)) {
    //   polygon.cursorOverStyle = am4core.MouseCursorStyle.default;
    // }
  });
})

// To create labels for our mapPolygons, we'll need a MapImageSeries.
// The MapImage will serve as a container for our labels and is able
// to be positioned on the map according to geographic coordinates.
// (It is important to make an actual MapImageSeries, not attempt
// to make a MapImage as a child of a MapPolygon.)
var imageSeries = map.series.push(new am4maps.MapImageSeries());
var mapImageTemplate = imageSeries.mapImages.template;
mapImageTemplate.propertyFields.latitude = "latitude";
mapImageTemplate.propertyFields.longitude = "longitude";

var labelTemplate = mapImageTemplate.createChild(am4core.Label);
labelTemplate.text = "{id}";
labelTemplate.horizontalCenter = "middle";
labelTemplate.verticalCenter = "middle";
labelTemplate.textAlign = "middle";
labelTemplate.interactionsEnabled = false; // let hover pass through, this way a country's hover effect is maintained

// Once a mapPolygon is loaded, it will calculate a rough, center coordinate,
// and assign values to its immediate latitude and longitude properties.
//
// For States whose calculations are off, provide your own center coordinate,
// e.g. for Idaho, Florida, etc.
var longitude = {
  // polygonSeries.getPolygonById('US-TX').longitude
  // -100.0994
  "US-TX": -99,
  "US-FL": -81.65
};
var latitude = {
  // polygonSeries.getPolygonById('US-ID').latitude
  // 45.496849999999995
  "US-ID": 43.6
};
polygonSeries.events.once("datavalidated", function(){
  var imageData = [];
  polygonSeries.mapPolygons.each(function(polygon) {
    var stateData = polygon.dataItem.dataContext;
    var stateLabelData = {
      latitude: latitude[stateData["id"]] || polygon.latitude,
      longitude: longitude[stateData["id"]] || polygon.longitude,
      id: stateData["id"].substr(3) // stateData.id.replace(/US-/, '')
    }
    imageData.push(stateLabelData);
  });
  imageSeries.data = imageData;
});





      //-------------------------------------------
      polygonTemplate.events.on("hit", function (ev) {
        map.closeAllPopups();
        // map.openPopup("We clicked on <strong>" + ev.target.dataItem.dataContext.name + "</strong>");
        let dataContext: any = Object.assign({}, ev.target.dataItem.dataContext)
        map.openModal("You have clicked on <strong>" + dataContext.name + "</strong>" + "<br><table><tbody><tr><th>District</th><th>Central Active License</th><th>Central total License</th><th>State Active License</th><th>State Total License</th><th>Active Certificate</th><th>Total Certificate<th></tr><tr><td>Jamu and KAshmir</td><td>100</td><td>1500</td><td>500</td><td>2000</td><td>200</td><td>500</td></tr><tr><td>Kathua District</td><td>7500</td><td>8600</td><td>650</td><td>7000</td><td>300</td><td>600</td></tr><tr><td>Doda District</td><td>750</td><td>8500</td><td>1600</td><td>6000</td><td>100</td><td>400</td></tr><tr><td>Jammu District</td><td>170</td><td>1900</td><td>800</td><td>7000</td><td>150</td><td>400</td></tr></tbody></table>");
      });
    });
  }

  ngOnInit() {
    this.ngAfterViewInit()
    
  }

}
