<template>
<div>
    <Navbar />
    <b-container class="bv-example-row">
        <NavQuran />
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Movie / Film
                    <strong>App</strong>
                </h2>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col">
                <div class="input-group mb-3">

                    <input v-model="search" type="text" class="form-control" placeholder="Cari Movie / Film Kesukaan Anda.." aria-label="Cari" aria-describedby="basic-addon1" @keyup="searchMovie" />

                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <b-icon-search></b-icon-search>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <b-row>
            <b-col cols="6" class="bv-example-row mb-3" v-for="(film,index) in films" :key="index">
                <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img :src="film.Poster!=='N/A'?film.Poster:'https://picsum.photos/540/400/?image=41'" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body :title="film.Title">
                                <b-card-text>
                                    Year : {{film.Year}}
                                </b-card-text>
                                <b-card-text>
                                    Type : {{film.Type}}
                                </b-card-text>
                                <router-link :to="'/appmovie/'+film.imdbID">
                                    <b-button pill variant="outline-success" size="sm">Selengkapnya</b-button>
                                </router-link>
                            </b-card-body>
                        </b-col>
                    </b-row>
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

const url = `http://www.omdbapi.com/`;

export default {
    name: "AppMovie",
    components: {
        Navbar,
        NavQuran
    },
    data() {
        return {
            films: [],
            url: '',
            search: ''

        }
    },
    methods: {
        set_url(url, search, apikey) {
            const res_url = `${url}?s=${search}&r=json&apikey=${apikey}`;
            return res_url;

        },
        async load_data(url) {
            const url_s = this.set_url(url, 'dora', 'a066c6ba')
            const data = await axios.get(url_s).then(res => res.data);
            return data;
        },
        searchMovie() {
            const apikey = 'a066c6ba'
            const res_url = `${url}?s=${this.search}&r=json&apikey=${apikey}`

            axios.get(res_url).then(res => {
                this.films = res.data.Search;
            }).catch(e => console.log(e))

        }

    },
    async created() {
        const data = await this.load_data(url);
        this.films = data.Search
    }

}
</script>
