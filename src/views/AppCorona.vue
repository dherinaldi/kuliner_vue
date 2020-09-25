<template>
<div>
    <Navbar />
    <b-container class="bv-example-row">
        <NavQuran />
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Corona
                    <strong>App</strong>
                    (source {{url_source}})
                </h2>
            </div>
        </div>
        <b-row>
            <b-col cols="3" class="bv-example-row mb-3">
                Global Konfirm : {{ confirmed_global | toCurrency }}
            </b-col>
            <b-col cols="3" class="bv-example-row mb-3">
                Global Meninggal : {{ deaths_global | toCurrency }}
            </b-col>
            <b-col cols="3" class="bv-example-row mb-3">
                Global Sembuh : {{ recovered_global | toCurrency }}
            </b-col>
            <b-col cols="3" class="bv-example-row mb-3">
                Global Active : {{ active_global | toCurrency }}
            </b-col>
        </b-row>
        <b-row>

            <b-col cols="3" class="bv-example-row mb-3" v-for="(global,index) in globals" :key="index">
                <b-card :title="global.Country_Region">
                    <b-card-text>
                        <h5>Konfirm {{$options.filters.toCurrency(global.Confirmed)}}</h5>
                        <b-progress :value="(global.Confirmed/confirmed_global) * 100" show-value :precision="2" class="mb-3" variant="warning"></b-progress>
                        <h5>Meninggal {{global.Deaths | toCurrency}}</h5>
                        <b-progress :value="(global.Deaths/deaths_global) * 100 " show-value :precision="2" class="mb-3" variant="danger"></b-progress>
                        <h5>Sembuh {{global.Recovered }} </h5>
                        <b-progress :value="(global.Recovered/recovered_global) *100" show-value :precision="2" class="mb-3" variant="success"></b-progress>
                        <h5>Active {{global.Active | toCurrency }} </h5>
                        <b-progress :value="(global.Active/active_global) * 100 " show-value :precision="2" class="mb-3" variant="info"></b-progress>
                        Last_Update: {{global.Last_Update | formatDate}}

                    </b-card-text>
                    <router-link to="#">
                        <b-button pill variant="outline-success" size="sm">Detail</b-button>
                    </router-link>

                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavQuran from "@/components/NavQuran.vue";

import axios from "axios";

const url = `https://corona.coollabs.work/`;

export default {
    name: 'AppCorona',
    components: {
        Navbar,
        NavQuran
    },
    data() {
        return {
            globals: [],
            confirmed_global: 0,
            deaths_global: 0,
            recovered_global: 0,
            active_global: 0,
            url_source: ''

        }

    },
    methods: {
        async load_data_global(url) {
            const res = await axios.get(`${url}/global`);
            return res;
        }
    },
    filters: {
        toCurrency(value) {
            return `${value.toLocaleString()}`
        }
    },
    async created() {
        axios.get(`${url}/global`).then(res => {
            this.globals = res.data

        }).catch(e => console.log(e));

        const res = await this.load_data_global(url).catch(e => console.log(e));

        this.confirmed_global = res.data.reduce((acc, val) => acc + val.Confirmed, 0)
        this.deaths_global = res.data.reduce((acc, val) => acc + val.Deaths, 0)
        this.recovered_global = res.data.reduce((acc, val) => acc + val.Recovered, 0)
        this.active_global = res.data.reduce((acc, val) => acc + val.Active, 0)
        this.url_source = url

    }
}
</script>
