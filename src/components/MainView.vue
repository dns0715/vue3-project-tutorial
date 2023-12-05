@<template>
  <div class="leftContainer">
    <div id="cityNameBox">
        <div class="cityName">
            <p>A</p>
            <p>B</p>
        </div>
    </div>
    <div id="contentBox">
        <div class="buttonBox">
            <div class="buttonBackground">
                <button class="forecast">forecast</button>
                <button class="airquality">airquality</button>
            </div>
        </div>
        <div class="weatherBox">
            <div class="weatherDegree">
                <p>10&deg;</p>
            </div>
            <div class="weatherIcon">
                <img src="@/assets/43.png" alt="MainLogo"/>
            </div>
            <div class="weatherData">
                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>

    </div>
    <div id="todayWeather">
        <div class="textBox">
            <p>시간대별 날씨 정보</p>
            <p>이번주 날씨 보기</p>
        </div>
        <div class="timelyWeatherBox">
            <div class="timelyWeather">
                <div class="icon">
                    <img src="@/assets/29.png" alt=""/>
                </div>
                <div class="data">
                    <p class="time"></p>
                    <p class="currentDegree">32&deg;</p>
                    <div>
                        <img src="@/assets/drop.png" alt="">
                        <p>15%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav>
        <i class="fas fa-home"></i>
        <i class="fas fa-search-location"></i>
        <i class="fas fa-chart-line"></i>
        <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.leftContainer{
    width: 324px;
    height: 700px;
    border-radius: 50px;
    background: linear-gradient(#16455f, #0e1239);
    box-shadow: 5px 5px 10px gray;
}
</style>