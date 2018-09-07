import ol from 'openlayers';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import TileWMS from 'ol/source/TileWMS.js';
import TileGrid from 'ol/tilegrid/TileGrid';
// import TileGrid from 'ol/tilegrid/TileGrid.js';
// import getTileRangeForExtentAndZ from 'ol/tilegrid/TileGrid.js'

      var projExtent = ol.proj.get('EPSG:3857').getExtent();
      var startResolution = ol.extent.getWidth(projExtent) / 256;
      var resolutions = new Array(19);
      var origins = new Array(19);

      for (var i = 0, ii = resolutions.length; i < ii; ++i) {
        resolutions[i] = startResolution / Math.pow(2, i);

      }

      // var projection = ol.proj.get('EPSG:900913');
      // var tileGrid = new TileGrid.createXYZ({
      //     extent: projection.getExtent(),
      //     tileSize: 256
      // });
      // resolutions.unshift(78271.51696402048);

      var tileGrid = new TileGrid({
        extent: projExtent,
        resolutions: resolutions,
        origin: ol.extent.getTopLeft(projExtent),
        tileSize: [256, 256],
        minZoom: 1

      });

      // var tileGrid = ol.tilegrid.createForProjection(ol.proj.get('EPSG:900913'));
      // console.log(tileGrid);
      console.log(tileGrid.getOrigin(3));
      console.log(startResolution);
      console.log(resolutions);

      var layers = [
        // new TileLayer({
        //   source: new OSM(),
        // }),
        new TileLayer({
          extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],

          source: new TileWMS({
            url: 'http://map.24bpd.ru/geowebcache/service/wms',
            params: {'LAYERS': 'egis_wm_light', 'SRS': 'EPSG:3857', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
            tileGrid: tileGrid

          })
        })
      ];
      var map = new Map({
        layers: layers,
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 0,
          resolutions: resolutions
        }),

      });