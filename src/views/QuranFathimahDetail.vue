<template>
<div>
    <Navbar />
    <div class="container">
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Quran
                    <strong>App Fathimah</strong>
                </h2>
            </div>
        </div>
        <b-row>
            <b-col>
                <b-card :title="surah_judul" :sub-title="surah.arti">
                    <b-card-text v-if="!show" v-html="this.$options.filters.subStr(surah.keterangan)">
                    </b-card-text>
                    <b-card-text v-else v-html="surah.keterangan">
                    </b-card-text>

                    <a href="#" class="card-link" @click="load_det">Read More</a>

                    <router-link :to="'/appquranfathimah/'">
                        <b-button pill variant="outline-info" size="sm">Kembali</b-button>
                    </router-link>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="my-2">
            <b-col cols="1">
                Start
            </b-col>
            <b-col cols="4">
                <b-form-input v-model.number="mulai" placeholder="Ketikkan mulai"></b-form-input>
            </b-col>
            <b-col cols="1">
                End
            </b-col>
            <b-col cols="4">
                <b-form-input v-model.number="akhir" placeholder="Ketikkan akhir"></b-form-input>
            </b-col>
            <b-col cols="2">
                <b-button pill variant="outline-success" size="sm" @click="toggle_ayat($event,surah_id, mulai, akhir)">Lihat Ayat</b-button>
            </b-col>
        </b-row>

        {{show_ayat}}
        <b-row v-if="!show_ayat"> hidden
        </b-row>

        <b-row v-else class="my-2">
            <b-col>
                <b-card :title="ayat.ayat" v-for="(ayat,index) in ayats.ayat.data.ar" :key="index">
                    <b-card-text align="right" v-html="ayat.teks">
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>

    </div>
</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from 'axios';

//https://api.banghasan.com/quran/format/json/surat/1/ayat/1-5
export default {
    name: 'QuranFathimahDetail',
    components: {
        Navbar
    },
    data() {
        return {
            url: 'https://api.banghasan.com/quran/format/json/surat/' + this.$route.params.surah,
            surah: {},
            surah_id: '',
            surah_judul: '',
            show: false,
            show_ayat: false,
            ayats: [],
            mulai: 1,
            akhir: 5
        }
    },
    methods: {
        setSurah(data) {
            this.surah = data;
            this.surah_id = this.$route.params.surah;
        },
        setAyat(data) {
            this.ayats = data
            console.log(data);
            console.log(Object.entries(data));
        },
        load() {
            axios
                .get(this.url)
                .then((response) => {
                    const hasil = response.data.hasil[0]
                    this.setSurah(hasil)
                    console.log(hasil.nama)
                    this.surah_judul = `${hasil.nomor}. ${hasil.asma} (${hasil.nama})`
                })
                .catch((error) => console.log(error));
        },
        load_ayat(surah, start, end) {
            axios
                .get('https://api.banghasan.com/quran/format/json/surat/' + surah + '/ayat/' + start + '-' + end + '')
                .then((response) => {
                    this.setAyat(response.data)
                })
                .catch((error) => console.log(error));

        },
        load_det(e) {
            if (e.target.innerText == 'Read More') {
                e.target.innerText = 'Read Less'
                this.show = true
            } else {
                e.target.innerText = 'Read More'
                this.show = false
            }
        },
        toggle_ayat(e, surah) {
            console.log(surah)
            if (this.show_ayat == true) {
                this.show_ayat = false
            } else {
                this.show_ayat = true
                this.load_ayat(surah, this.mulai, this.akhir)
            }
        }

    },
    mounted() {
        this.load();
        this.load_ayat(this.$route.params.surah, this.mulai, this.akhir)
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
