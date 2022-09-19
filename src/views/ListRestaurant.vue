<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">ค้นหาร้านอาหาร</label>
                    <input type="text" class="form-control"  placeholder="กรุณาพิมพ์ keyword" v-model="keyword" @change="search">
                </div>
                <div class="menu">
                    <div class="card shadowCard" style="width: 14rem;" v-for="(restaurant,index) in listRestaurant" :key="index">
                        <div v-if="restaurant.photos">
                            <div v-for="(photo,index) in restaurant.photos" :key="index">
                                <img :src="urlPhoto+photo.photo_reference+apiKey"  class="card-img-top" alt="...">
                            </div>
                        </div>
                        <div v-else>
                            <img :src="urlNoPhoto" class="card-img-top" alt="...">
                        </div>
                        
                        <div class="card-body">
                            <h5 class="card-title">{{ restaurant.name }}</h5>
                            <div class="review">
                                <div class="rating bg-warning" v-if="restaurant.rating > 0">
                                    <b-icon-star-fill style="color:#fff;font-size:12px"/>
                                    <span>{{ restaurant.rating }}</span>
                                </div>
                                <div class="rating bg-warning" v-else>
                                    <b-icon-star-fill style="color:#fff;font-size:12px"/>
                                    <span>-</span>
                                </div>
                                <div class="point" v-if="restaurant.user_ratings_total > 0" ><p>{{ restaurant.user_ratings_total }} รีวิว</p></div>
                                <div class="point" v-else ><p>- รีวิว</p></div>
                            </div>
                            <a :href="urlLocation+restaurant.place_id" target="_blank" class="btn btn-success btn-sm"><b-icon-pin-map-fill style="margin:5px"/>ตำแหน่ง</a>
                        </div>
                    </div>
                    <div v-if="listRestaurant == 0">
                        <!-- ไม่พบร้านอาหารที่คุณค้นหา -->
                        <div class="text-center d-flex justify-content-between">
                            <div class="spinner-grow text-success" role="status">
                                <span class="sr-only"></span>
                            </div>
                            <div class="spinner-grow text-danger" role="status">
                                <span class="sr-only"></span>
                            </div>
                            <div class="spinner-grow text-warning" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            listRestaurant: [], // ตัวแปรเก็บรายการร้านอาหาร
            keyword: 'บางซื่อ', // ตัวแปรในการค้าหา
            urlFetchData: 'https://restaurant-service-api-google.herokuapp.com/listRestaurant', // ลิ้งในการดึง api 
            urlPhoto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=', // ลิ้งในการแสดงรูป โดยใช้ photo reference
            apiKey: '&key=AIzaSyAad3yPhxIlvCiiLN7SUjjuymXUCohTGEs', // api key ของ google map
            urlNoPhoto: 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg', //รูปภาพแสดงตอนรูปในapi ไม่มี
            urlLocation:'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' // ลิ้งไปที่ตำแหน่ง โดยใช้ placeid
        }
    },
    methods:{
        // เช็คค่าในปุ่มค้นหา 
        search(event) {
            const data = {
                keyword: event.target.value
            }
            axios
            .post(this.urlFetchData,data)
            .then(res => (this.listRestaurant = res.data.results,console.log(res.data)))
        }
    },
    mounted () {
        setTimeout(() => {
            axios
            .post(this.urlFetchData,{keyword: this.keyword})
            .then(res => (this.listRestaurant = res.data.results,console.log(res.data)))
        }, 1500);
        
    }
}
</script>

<style>
.menu {
    position: relative;
    display: flex;
    justify-content: center;
    flex-flow: wrap;
}
.shadowCard {
    margin: 8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.shadowCard:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.card-img-top {
    width: 100%;
    height: 165px;
}
h5 {
    padding-top: 5px;
    font-size: 16px !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    height: auto;
    color: black;
    font-weight: 600;
}
.rating {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22%;
    margin: 5px 0;
    padding: 2px 5px;
    border-radius: 10px;
    right: 10px;
    top: 10px;
    
}
.rating span {
    font-size: 12px;
    color: #fff;
    margin-left: 5px;
}
.review {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.point p{
    margin: 0 8px;
    font-size: 14px;
    color: #656d74;
}

</style>