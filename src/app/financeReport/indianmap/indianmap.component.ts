
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MapDATA } from '../model/chart';
import { GraphService } from '../service/graph.service';

@Component({
  selector: 'app-indianmap',
  templateUrl: './indianmap.component.html',
  styleUrls: ['./indianmap.component.css']
})
export class IndianmapComponent implements OnInit {
  map_configTEst: any = {
    'default': { 'borderColor': '#9CA8B6', 'mapShadow': '#fff', 'shadowOpacity': '50', 'hoverShadow': '#666666', 'namesColor': '#9CA8B6', },

    'map_1': {
      'hover': 'ANDHRA PRADESH',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_2': {
      'hover': 'ARUNACHAL PRADESH',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_3': {
      'hover': 'ASSAM <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_4': {
      'hover': '<u><b>BIHAR OFFICE</b></u><br>NRI Plaza, 1st Floor, Main Road, Rajeev Nagar, Patna-800024<br>Ph. - 0612-2270045, 7488088088',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_5': {
      'hover': 'CHHATTISGARH <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_6': {
      'hover': 'GOA',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_7': {
      'hover': '<u><b>GUJARAT OFFICE</b></u><br>House No. A-2, Ashim Bunglow, Near Sarkari Tubewell,<br>Swami Narayan Road, Opp. HP Petrol Pump, Bopal, Ahmadabad-380058<br>Ph. - 02717-233087, 7405950950',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_8': {
      'hover': 'HARYANA <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_9': {
      'hover': 'HIMACHAL PRADESH',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_10': {
      'hover': 'JAMMU AND KASHMIR <br> Project Proposal Considered :279 <br>',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_11': {
      'hover': '<u><b>JHARKHAND OFFICE</b></u><br>C/O - Bhana Minj, Shahu Complex, Ground Floor,<br> Vill- Kalyanpur, Road No.-2, Post- Hatia, Dist.- Ranchi-834003<br>Ph. - +91 7488088088, +91 9386392411',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_12': {
      'hover': 'KARNATAKA',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_13': {
      'hover': 'KERALA',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_14': {
      'hover': '<u><b>MADHYA PRADESH OFFICE</b></u><br>Ground Floor, DKN 93, Scheme No. 74C, Vijay Nagar, Indore - 452010<br>Ph. - 9713229400',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_15': {
      'hover': 'MAHARASHTRA <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_16': {
      'hover': 'MANIPUR',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_17': {
      'hover': 'MEGHALAYA',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_18': {
      'hover': 'MIZORAM',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_19': {
      'hover': 'NAGALAND',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_20': {
      'hover': 'ODISHA <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_21': {
      'hover': 'PUNJAB <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_22': {
      'hover': 'RAJASTHAN <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_23': {
      'hover': 'SIKKIM',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_24': {
      'hover': 'TAMIL NADU',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_25': {
      'hover': 'TELANGANA',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_26': {
      'hover': 'TRIPURA',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_27': {
      'hover': '<u><b>UTTAR PRADESH OFFICE</b></u><br>Flat No. - 202, 2nd Floor, House No.- 18/587,<br>C-Block, Aravalli Road, Indra Nagar, Lucknow-226016<br>Ph. - 0522-2719108, +91 8511050500',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_28': {
      'hover': 'UTTARAKHAND <br> Business Associate',
      'upColor': 'yellow',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_29': {
      'hover': '<u><b>WEST BENGAL OFFICE</b></u><br>1/A Chandi Ghosh Road, Kolkata-700040<br>Ph. - 033-24711030, +91 9999045680  ',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_30': {
      'hover': 'ANDAMAN AND NICOBAR ISLANDS',
      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,

    },
    'map_31': {
      'hover': 'CHANDIGARH',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_32': {
      'hover': 'DADRA AND NAGAR HAVELI',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_33': {
      'hover': 'DAMAN AND DIU',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_34': {
      'hover': 'LAKSHADWEEP',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_35': {
      'hover': 'DELHI OFFICE</b></u><br>F-126, First Floor, Flat no.-104, Clips Apartment, Near Crecent Mall, Lado Sarai, New Delhi-110030<br>Ph. - 011-65440222',
      'upColor': 'blue',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    },
    'map_36': {
      'hover': 'PUDUCHERRY',

      'upColor': '#eff9ff',
      'overColor': '#ffcc5f',
      'downColor': '#477cb2',
      'enable': true,
    }
  }
  map_config: any = {
    'default': { 'borderColor': '#9CA8B6', 'mapShadow': '#fff', 'shadowOpacity': '50', 'hoverShadow': '#666666', 'namesColor': '#9CA8B6', },

  };
  data: string;

  constructor(private service: GraphService) { }

  ngOnInit() {
    debugger;

    this.service.GetStateMapData().subscribe(result => {
      console.log(result);
      result.forEach(a => {

        this.map_config[a.map] = {
          'hover': a.hover, 'upColor': 'blue',
          'overColor': '#ffcc5f',
          'downColor': '#477cb2', 'enable': true,
          'data':a.data
        };
        this.addEvent(a.map);
      });


    });
    // $('#regions').click(function (x) {
    //   alert(x);
    // });


  }

  // Quick feature detection
  isTouchEnabled() {
    return (('ontouchstart' in window)
      || (navigator.maxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
  }

  addEvent(id: string, relationId?: string) {
    debugger;
    let map_config = this.map_config;
    var _obj = $('#' + id);
    var _Textobj = $('#' + id + ',' + '#' + map_config[id]['namesId']);
    //var _h = $('#map').height();
    $('#' + ['text-abb']).attr({ 'fill': map_config['default']['namesColor'] });

    _obj.attr({ 'fill': map_config[id]['upColor'], 'stroke': map_config['default']['borderColor'] });
    _Textobj.attr({ 'cursor': 'default' });
    if (map_config[id]['enable'] == true) {
      if (this.isTouchEnabled()) {
        //clicking effect
        _Textobj.on('touchstart', function (e) {
          var touch = e.originalEvent.touches[0];
          var x = touch.pageX + 10, y = touch.pageY + 15;
          var tipw = $('#map-tip').outerWidth(), tiph = $('#map-tip').outerHeight(),
            x = (x + tipw > $(document).scrollLeft() + $(window).width()) ? x - tipw - (20 * 2) : x
          y = (y + tiph > $(document).scrollTop() + $(window).height()) ? $(document).scrollTop() + $(window).height() - tiph - 10 : y
          $('#' + id).css({ 'fill': map_config[id]['downColor'] });
          $('#map-tip').show().html(map_config[id]['hover']);
          $('#map-tip').css({ left: x, top: y })
        })
        _Textobj.on('touchend', function () {
          $('#' + id).css({ 'fill': map_config[id]['upColor'] });
          if (map_config[id]['target'] == 'new_window') {
            window.open(map_config[id]['url']);
          } else if (map_config[id]['target'] == 'same_window') {
            window.location.href = map_config[id]['url'];
          }
        })
      }
      _Textobj.attr({ 'cursor': 'pointer' });
      _Textobj.click(function () {
        let data=map_config[id]["data"];
        let state=map_config[id]["hover"];
        
        console.log(data);
        alert("state " + state + " ,Gounded " + data.Grounded + " ,Completed " + data.Completed + " ,Occupied " + data.Occupied);
      });
      _Textobj.hover(function () {
        //moving in/out effect
        $('#map-tip').show().html(map_config[id]['hover']);
        _obj.css({ 'fill': map_config[id]['overColor'] })
      }, function () {
        $('#map-tip').hide();
        $('#' + id).css({ 'fill': map_config[id]['upColor'] });
      })
      //clicking effect
      _Textobj.mousedown(function () {
        $('#' + id).css({ 'fill': map_config[id]['downColor'] });
      })
      _Textobj.mouseup(function () {
        $('#' + id).css({ 'fill': map_config[id]['overColor'] });
        if (map_config[id]['target'] == 'new_window') {
          window.open(map_config[id]['url']);
        } else if (map_config[id]['target'] == 'same_window') {
          window.location.href = map_config[id]['url'];
        }
      })
      _Textobj.mousemove(function (e) {
        var x = e.pageX + 10, y = e.pageY + 15;
        var tipw = $('#map-tip').outerWidth(), tiph = $('#map-tip').outerHeight(),
          x = (x + tipw > $(document).scrollLeft() + $(window).width()) ? x - tipw - (20 * 2) : x
        y = (y + tiph > $(document).scrollTop() + $(window).height()) ? $(document).scrollTop() + $(window).height() - tiph - 10 : y
        $('#map-tip').css({ left: x, top: y })
      })
    }
  }


}