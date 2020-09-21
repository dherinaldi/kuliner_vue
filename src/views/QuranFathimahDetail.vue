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
                Mulai
            </b-col>
            <b-col cols="4">
                <b-form-input v-model.number="mulai" placeholder="Ketikkan mulai"></b-form-input>
            </b-col>
            <b-col cols="1">
                Akhir
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
                <b-card v-for="(ayat,id) in ayat_dat" :key="id">
                    <b-card-text align="right" v-html="ayat.ar_teks" v-onhover>
                    </b-card-text>
                    <b-card-text align="left" v-html="ayat.idt_teks">
                    </b-card-text>
                    <b-card-text align="left">{{ayat.ayat}}. {{ayat.id_teks}}
                    </b-card-text>
                </b-card>

            </b-col>
        </b-row>

    </div>
</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavQuran from "@/components/NavQuran.vue";
import axios from 'axios';

//https://api.banghasan.com/quran/format/json/surat/1/ayat/1-5
export default {
    name: 'QuranFathimahDetail',
    components: {
        Navbar,
        NavQuran
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
            akhir: 5,
            ayat_dat: []
        }
    },
    methods: {
        setSurah(data) {
            this.surah = data;
            this.surah_id = this.$route.params.surah;
        },
        setAyat(data) {
            this.ayats = data;

        },
        setAyatDet(data) {
            const ayat_ar = data.ar;
            const ayat_id = data.id;
            const ayat_idt = data.idt;

            const ar_teks = ayat_ar.map((res, index) => ({
                //const id_teks = JSON.parse(JSON.stringify(ayat_id[index].teks))
                id: index,
                ayat: ayat_id[index].ayat,
                ar_teks: res.teks,
                id_teks: ayat_id[index].teks,
                idt_teks: ayat_idt[index].teks

            }));

            this.ayat_dat = ar_teks;
            console.log(this.ayat_dat)

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
                    this.setAyat(response.data);
                    this.setAyatDet(response.data.ayat.data);
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
            if (this.show_ayat == true) {
                this.show_ayat = false
                e.target.innerText = "Lihat Ayat"
            } else {
                this.show_ayat = true
                this.load_ayat(surah, this.mulai, this.akhir)
                e.target.innerText = "Tutup Ayat"
            }
        }

    },
    directives: {
        onhover: {
            bind(el, binding) {
                el.onmouseover = function () {
                    el.style.fontSize = "30px";
                };
                el.onmouseout = function () {
                    el.style.fontSize = "15px";
                };
            }
        }
    },
    mounted() {
        this.load();
        this.load_ayat(this.$route.params.surah, this.mulai, this.akhir)
    },
    filters: {
        subStr: function (string) {
            return string.substr(0, 150) + '...';
        }

    }
};
</script>

<style>

</style>
