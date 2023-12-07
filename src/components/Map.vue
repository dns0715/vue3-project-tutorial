<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{};
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      //kakao
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1dbb59daa608943ec01cf9e8f902b759';
      document.head.appendChild(script);
    }
  },
  methods:{
    initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(36.5683, 126.9778), // 지도의 중심좌표
            level: 100, // 지도의 확대 레벨
          };
      var map = new kakao.maps.Map(mapContainer, mapOption);
      var positions = [
        {
          latlng: new kakao.maps.LatLng(37.562632898194835, 126.9454282268269),
        },
        {
          latlng: new kakao.maps.LatLng(37.56195884514403, 126.94922601468826),
        },
      ];
      //마커 생성
      positions.forEach(function(pos) {
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: pos.latlng, // 마커의 위치
        });
        //마커 표시
        marker.setMap(map);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>