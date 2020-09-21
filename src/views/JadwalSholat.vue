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
                {{jadwals}}
            </b-col>
        </b-row>
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

export default {
    name: "JadwalSholat",
    components: {
        Navbar,
        NavQuran
    },
    data() {
        return {
            options: [],
            jadwals: []
        }
    },
    methods: {
        setSelected(value) {
            const url = `https://api.banghasan.com/sholat/format/json/jadwal/kota/${value.code}/tanggal/2020-09-21`;
            axios.get(url).then(res => {
                this.jadwals = res.data.jadwal.data
            })
            //console.log(`${value.code} ${value.label}`)
        }
    },

    created() {
        axios.get(url).then(res => {
            this.options = res.data.kota.map((result, index) => ({
                'label': result.nama,
                'code': result.id
            }))

        })

    }

}
</script>
