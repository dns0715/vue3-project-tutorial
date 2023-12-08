<template>
  <div class="rightContainer">
    <div id="cityNameBox">
        <div class="cityName">
            <p>{{cityName}}</p>
            <p>{{currentTime}}</p>
        </div>
    </div>
    <div id="contentsBox">
        <div class="buttonBox">
            <div class="buttonBackground">
                <button class="forecast">forecast</button>
                <button class="airquality">airquality</button>
            </div>
        </div>
        <div class="weatherBox">
            <div class="airCondition">
                <p>{{feeling}}</p>
            </div>
            <div class="detail">
                <div class="title">
                    <p>detail temperatures</p>
                </div>
                <div class="data" v-for="(detailData, index) in subWeatherData" :key="index">
                    <div class="dataName">
                        <p></p>
                        <p>{{ detailData.name }}</p>
                    </div>
                    <div class="dataValue">
                        <p>
                            {{ detailData.value }}<span></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Map></Map>
    <nav>
        <i class="fas fa-home"></i>
        <i class="fas fa-search-location"></i>
        <i class="fas fa-chart-line"></i>
        <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
import Map from "@/components/Map.vue";
import axios from 'axios';
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
export default {
    components: {
        Map,
    },
    //Composition API
    setup(){
      let currentTime = dayjs().format("YYYY. MM. DD. ddd");
      let cityName = ref("");
      let feeling = ref("");
      let subWeatherData = ref([]);

      //Convert Time Unix-timestamp
      const Unix_timestamp = (dt) => {
        let date = new date(dt * 1000);
        let hour = "0" + date.getHours();
        return hour.substring(-2) + "시";
      };
      //OpenApi Call
      const fetchOpenWeather = () =>{
        const API_KEY = process.env.WEATHER_API_KEY;
        let initialLat = 36.5683;
        let initialLon = 126.9778;
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`)
          .then(res => {
            let isInitialData = res.data.current;
            let isInitialCityName = res.data.timezone;
            let isFeelLikeTemp = isInitialData.feels_like;
            let isTimeOfSunrise = isInitialData.sunrise;
            let isTimeOfSunset = isInitialData.sunset;
            let isLineOfSight = isInitialData.visibility;
            
            //데이터 가공
            let isProcessedData = [
              {name:"일출시간", value:Unix_timestamp(isTimeOfSunrise)},
              {name:"일몰시간", value:Unix_timestamp(isTimeOfSunset)},
              {name:"가시거리", value:isLineOfSight + "M"},
            ];
            //날씨데이터
            subWeatherData.value = isProcessedData;
            //도시명 설정
            cityName.value = isInitialCityName.split("/")[1];
            //날씨상태
            if(isFeelLikeTemp > 30) feeling.value = "매우 더움";
            else if(isFeelLikeTemp <=30) feeling.value = "더움";
            else if(isFeelLikeTemp <=25) feeling.value = "보통";
            else if(isFeelLikeTemp <=20) feeling.value = "선선함";
            else if(isFeelLikeTemp <=15) feeling.value = "쌀쌀함";
            else if(isFeelLikeTemp <=10) feeling.value = "추움";
            else feeling.value = "매우 추움";
          })
          .catch(error=>{
            console.log("subView");
            console.log(error);
          });
      };
      //호출
      fetchOpenWeather();
      return {
        currentTime,
        cityName,
        feeling,
        subWeatherData,
      };
    }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

.rightContainer {
  // width: 40%;
  // height: 100%;
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#cb0000, #0e1239);
  box-shadow: 5px 5px 10px gray;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: "Poppins", sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child {
          width: 241px;
          height: 33px;
          font-size: 1.35rem;
        }
        &:last-child {
          width: 160px;
          height: 19px;
          font-size: 0.9rem;
          font-weight: 100;
        }
      }
    }
  }

  #contentsBox {
    width: 100%;
    height: calc(45% - 16px);
    margin-top: 16px;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #370505;
        border-radius: 10px;
        display: flex;

        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;
          cursor: pointer;
          &.forecast {
            background-color: transparent;
            color: #a52727;
          }
          &.airquality {
            background: #ff0000;
            color: white;
          }
        }
      }
    }
    .weatherBox {
      width: 100%;
      height: 80%;

      .airCondition {
        @include center;
        width: 100%;
        height: 35%;

        p {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 500;
          font-family: "GmarketSansBold";
          color: #fff;
        }
      }
      .detail {
        width: 100%;
        height: 65%;

        .title {
          @include center;
          width: 100%;
          height: 25%;
          color: white;

          p {
            font-family: "LeferiPoint-WhiteObliqueA";
          }
        }
        .data {
          display: flex;
          width: 100%;
          height: 27.5%;
          // background-color: rgb(187, 127, 255);

          .dataName {
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;
            font-family: "LeferiPoint-WhiteObliqueA";

            p {
              &:first-child {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ffde23;
                margin-left: 50px;
              }
              &:last-child {
                margin-left: 10px;
                color: white;
                font-weight: 300;
                font-size: 0.9rem;
              }
            }
          }
          .dataValue {
            display: flex;
            align-items: center;
            justify-content: right;
            width: 50%;
            height: 100%;
            font-family: "LeferiPoint-WhiteObliqueA";

            p {
              color: white;
              font-weight: 300;
              margin-right: 50px;

              span {
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  nav {
    @include center-sb;
    width: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    i {
      color: rgb(255, 255, 255);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #799ed0;
      }
    }
  }
}
</style>