<template>
<div>
    <Navbar />
    <div class="container">
        <NavQuran />
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Jadwal
                    <strong>Sholat</strong>
                </h2>
            </div>
        </div>
        <b-row>
            <b-col>
                <v-select :options="options" @input="setSelected"></v-select>
            </b-col>
        </b-row>
        <b-row>
            <b-col v-show="show">
                <b-card :title="nama_kota">
                    <b-card-text v-for="(jadwal, index) in jadwals" :key="index">
                        {{index}} : {{jadwal}}
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>

        <div class="row mt-4">
            <div class="col">
                <h2>
                    Exchange
                    <strong>Rate</strong>
                </h2>
            </div>
        </div>

        <b-row>
            <b-col cols="3">
                <b-form-input v-model.number="nilai1" placeholder="Enter Nilai Currency" @keyup="setNilai1($event)"></b-form-input>
            </b-col>
            <b-col cols="3">
                <b-form-input v-model="nilai1_curr" @keypress="setNilai1_curr($event)"></b-form-input>
            </b-col>
        </b-row>

        <b-row>

            <div class=" col-md-3 mb-3">
                <label>Rates</label>
                <select class="custom-select" @change="changenilai($event)" v-model="selected">
                    <option value="-">Pilih</option>
                    <option v-for="(rate, index) in rates" :key="index" :value="rate.code">{{rate.label}}</option>

                </select>
            </div>

        </b-row>
        {{nilai1}} {{nilai1_curr}} equals {{nilai_rate}} {{rate_sign}}

    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Navbar from "@/components/Navbar.vue";
import NavQuran from "@/components/NavQuran.vue";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import axios from "axios"

Vue.component('v-select', vSelect)

const url = "https://api.banghasan.com/sholat/format/json/kota";
const url_rate = "https://api.exchangeratesapi.io/latest";

export default {
    name: "JadwalSholat",
    components: {
        Navbar,
        NavQuran
    },
    data() {
        return {
            options: [],
            jadwals: [],
            nama_kota: '',
            show: false,

            //convert rates
            rates: [],
            nilai1: 0,
            nilai1_curr: 'USD',
            selected: [],
            nilai_rate: 0,
            rate_sign: ''

        }
    },
    methods: {
        async getJadwal(code, tanggal) {
            const url = `https://api.banghasan.com/sholat/format/json/jadwal/kota/${code}/tanggal/${tanggal}`;
            const resp = await axios.get(url).then(res => res.data.jadwal.data)
            return resp;

        },
        async setSelected(value) {
            const date = new Date().toISOString().slice(0, 10);
            const resp = await this.getJadwal(value.code, date);
            this.jadwals = resp;
            this.nama_kota = value.label;
            this.show = true
        },
        async load_rate(link, currency) {
            const res = await axios.get(`${link}?base=${currency}`).then((res) => res)
            return res;

        },
        changenilai(event) {
            const val = this.val_split(event.target.value).val1
            this.rate_sign = this.val_split(event.target.value).val
            this.nilai_rate = this.nilai1 * val;
        },
        setNilai1(event) {
            const val_sel = this.val_split(this.selected).val1
            const val = event.target.value
            this.rate_sign = this.val_split(this.selected).val
            this.nilai_rate = val * val_sel;

        },
        async setNilai1_curr(event) {
            const respon = await this.load_rate(url_rate, event.target.value);
            const rates = respon.data.rates;
            this.rates = Object.keys(rates).map((key, index) => ({
                'label': `${key} ${rates[key]}`,
                'code': `${key}|${rates[key]}`
            }));

        },
        val_split(value) {
            const val = (value).split('|')[0];
            const val1 = (value).split('|')[1];
            return {
                val,
                val1
            };
        }
    },

    async created() {
        axios.get(url).then(res => {
            this.options = res.data.kota.map((result, index) => ({
                'label': result.nama,
                'code': result.id
            }))
        })

        const respon = await this.load_rate(url_rate, this.nilai1_curr);
        const rates = respon.data.rates;

        this.rates = Object.keys(rates).map((key, index) => ({
            'label': `${key} ${rates[key]}`,
            'code': `${key}|${rates[key]}`
        }));

    }

}
</script>
