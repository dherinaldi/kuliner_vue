<template>
<div>
    <Navbar />
    <div class="container">
        <NavQuran />
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Quran
                    <strong>App</strong>
                </h2>
            </div>
        </div>

        {{ totalRows }} {{ pageCount }} {{ currentPage }}
        <div class="row mb-4">
            <div class="col-md-4 mt-4" v-for="(surah, index) in paginatedItems" :key="index">
                <CardSurah :surah=surah />

            </div>
        </div>

        <b-row>
            <b-col md="12" class="my-1">
                <b-pagination pills @change="onPageChanged" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" align="center"></b-pagination>
            </b-col>
        </b-row>

    </div>
</div>
</template>

<script>
import Vue from 'vue'

import Navbar from "@/components/Navbar.vue";
import NavQuran from "@/components/NavQuran.vue";
import CardSurah from "@/components/CardSurah.vue";

import axios from "axios";
export default {

    name: 'AppQuran',

    components: {
        Navbar,
        NavQuran,
        CardSurah

    },

    data() {

        return {

            surahs: [],

            paginatedItems: [],

            perPage: 12,

            totalRows: 0,

            currentPage: 1

        }

    },

    async created() {

        let result = await this.load_async();

        this.totalRows = result.length;

        this.paginatedItems = result

    },

    methods: {

        setSurahs(data) {

            this.surahs = data;

        },

        load() {

            axios

                .get("http://localhost:3000/quran")

                .then((response) => {

                    this.setSurahs(response.data);

                })

                .catch((error) => console.log(error));

        },

        async load_async() {

            return axios.get("http://localhost:3000/quran").then((response) => {

                return response.data;

            });

        },

        async paginate(page_size, page_number) {

            let result = await this.load_async();

            let itemsToParse = result

            this.paginatedItems = itemsToParse.slice(page_number * page_size, (page_number + 1) * page_size);

        },

        onPageChanged(page) {

            this.paginate(this.perPage, page - 1)

        }

    },

    computed: {

        pageCount() {

            let l = this.totalRows,

                s = this.perPage;

            return Math.floor(l / s);

        }

    },

    mounted() {

        this.load();

        this.paginate(this.perPage, 0)

    }

};
</script>

<style>

</style>
