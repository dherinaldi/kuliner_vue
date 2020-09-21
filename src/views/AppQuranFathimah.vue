<template>
<div>
    <Navbar />
    <div class="container">
        <NavQuran />
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Quran
                    <strong>App Fathimah</strong>
                </h2>
            </div>
        </div>
        <b-row>
            <b-col cols="4" v-for="(surah,index) in surahs" :key="index">
                <div class="card shadow card-product">
                    <div class="card-body">
                        <h5 class="card-title"> {{ surah.asma }} ( {{ surah.nama }} )</h5>
                        <h5 class="card-title"> {{ surah.nomor }}. {{ surah.arti }} </h5>
                        <p class="card-text" v-if="!show" v-html="$options.filters.subStr(surah.keterangan)"> </p>
                        <p class="card-text" v-else v-html="surah.keterangan"> </p>
                        <p class="card-text"> {{ surah.ayat }} ayat
                            <b-button pill variant="outline-info" size="sm" @click="load_det">Read More</b-button>
                        </p>
                        <router-link :to="'/appquranfathimah/'+surah.nomor">
                            <b-button pill variant="outline-success" size="sm">Selengkapnya</b-button>
                        </router-link>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Navbar from "@/components/Navbar.vue";
import NavQuran from "@/components/NavQuran.vue";

import axios from "axios";

const link = "https://api.banghasan.com/quran/format/json/surat";

export default {
    name: 'AppQuranFathimah',
    components: {
        Navbar,
        NavQuran
    },
    data() {
        return {
            surahs: [],
            show: false

        }

    },
    async created() {
        const res = await this.load();
        this.surahs = res.data.hasil;
        console.log(this.surahs);

    },
    methods: {
        async load() {
            return axios.get(link);

        },
        load_det(e) {
            if (e.target.innerText == 'Read More') {
                e.target.innerText = 'Read Less'
                this.show = true
            } else {
                e.target.innerText = 'Read More'
                this.show = false
            }
        }
    },
    filters: {
        subStr: function (string) {
            return string.substring(0, 150) + '...';
        }

    }

};
</script>

<style>

</style>
