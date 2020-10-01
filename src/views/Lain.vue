<template>
<div>
    <Navbar />
    <div class="container">
        <b-row class="mt-3">
            <b-col>
                <autocomplete :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
            </b-col>
            <b-col>
                <v-select :options="options"></v-select>
            </b-col>
            <b-col>
                <router-link to="/bvpagination" class="btn btn-info float-right">
                    <b-icon-eye></b-icon-eye> BVPagination
                </router-link>
            </b-col>
            <b-col>3 of 2</b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col>
                <label for="text-password">Username</label>
                <b-input type="text" v-model="username"></b-input>
            </b-col>
            <b-col>
                <label for="text-password">Password</label>
                <b-input type="password" v-model="password"></b-input>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col class="mt-3">
                <b-button variant="outline-primary" @click="login()" size="sm">Login</b-button>
            </b-col>
            <b-col class="mt-3">
                <b-button variant="outline-success" @click="show_data" size="sm"> Show Data </b-button>
            </b-col>
            <b-col class="mt-3">
                <b-button variant="outline-danger" @click="clear_token" size="sm"> Clear Token </b-button>
            </b-col>
            <b-col class="mt-3">
                <b-button variant="outline-info" @click="api_mutasi_psedia" size="sm"> Con Simfarmasi </b-button>
            </b-col>

            <b-col class="mt-3">
                <b-button variant="outline-warning" @click="api_football" size="sm"> Football </b-button>
            </b-col>

        </b-row>

        <div v-if="!isLoading">
            <div class="semipolar-spinner mt-3">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
            </div>
        </div>

        <b-row class="mt-3">
            <b-col>
                <div class="accordion" role="tablist">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                                <b-card-text>{{ text }}</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>

                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>{{ text }}</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>

                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>{{ text }}</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </b-col>
        </b-row>

        <b-row class="mt-3">

            <div v-html="`${result.username}`">
            </div>
            <b-col>
                {{result}}
                {{exp_jwt | formatDate}}

                {{mutasi}}
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Navbar from "@/components/Navbar.vue";
import Autocomplete from "@/components/Autocomplete.vue";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import axios from 'axios';

Vue.component('v-select', vSelect)

export default {
    name: 'Lain',
    components: {
        Navbar,
        Autocomplete
    },
    data() {
        return {
            options: ['daniar', 'rinaldi', 'ganteng', 'sekali', 'aja'],
            result: '',
            isLoading: false,
            exp_jwt: '',
            mutasi: [],
            username: '',
            password: '',
            text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `
        }
    },
    methods: {

        async load_data() {
            const url = 'http://localhost/ci-rest-jwt/api/auth/login';
            const formdata = new FormData();

            formdata.append("username", this.username);
            formdata.append("password", this.password);

            const token = await axios.post(url, formdata).then(res => res.data.token).catch(e => console.log(e));

            localStorage.setItem('token', token)

            if (token !== undefined) {
                this.result = `Login Success with JWT token ${token}`
            } else {
                this.result = ` Maaf Login Anda tidak terdaftar di database kami, silahkan cek kembali username dan password Anda !!!`
            }

        },
        login() {
            this.load_data()

        },
        async show_data() {
            console.log(localStorage.getItem("token"))

            const JWT_token = localStorage.getItem("token");

            const url_post = 'http://localhost/ci-rest-jwt/api/main/test';

            const instance = axios.create({
                baseURL: url_post
            });

            // Alter defaults after instance has been created
            instance.defaults.headers.common['Authorization'] = `Bearer ${JWT_token}`;

            const dat = await instance.post(this.baseURL).then(res => res.data).catch(e => console.log(e));

            this.isLoading = false;

            if (dat !== undefined) {
                setTimeout(() => {
                    this.result = dat;
                    this.exp_jwt = dat.exp;
                    this.isLoading = true;
                }, 1000);
            } else {
                this.result = `Maaf Anda Belum Login !!!`;
                this.isLoading = true;
            }

        },

        async api_mutasi_psedia() {
            console.log(`api mutasi psedia`)
            const JWT_token = localStorage.getItem("token");

            const url_post = 'http://localhost/ci-rest-jwt/api/main/psedia_mutasi';

            const instance1 = axios.create();

            // Alter defaults after instance has been created
            instance1.defaults.headers.common['Authorization'] = `Bearer ${JWT_token}`;

            const formdata = new FormData();

            formdata.append("tanggal", '2020-01-01');

            const dat = await instance1.post(url_post, formdata).then(res => res.data).catch(e => console.log(e));

            this.isLoading = false;

            if (dat !== undefined) {
                setTimeout(() => {
                    this.mutasi = dat.result;
                    this.isLoading = true;
                }, 1000);
            } else {
                this.result = `Belum Login ke akses token Anda !!!!`
            }

        },

        api_football() {
            console.log(`api football`)
            const url = `http://api.football-data.org/v2/competitions`;

            const instance1 = axios.create({
                baseURL: url
            });

            instance1.defaults.headers.common['X-Auth-Token'] = `419d0e0a749f4c1c91f2514b224f0234`;

            instance1.get(this.baseURL).then(res => {
                console.log(res)
            }).catch(e => console.log(e));

        },

        clear_token() {
            localStorage.removeItem("token");
            console.log(`token has been removed !!!`)
            this.result = `token has been removed !!!, and you must be login againt to get JWT Token`
        }

    },
    created() {

    }
}
</script>

<style>
.semipolar-spinner,
.semipolar-spinner * {
    box-sizing: border-box;
}

.semipolar-spinner {
    height: 65px;
    width: 65px;
    position: relative;
}

.semipolar-spinner .ring {
    border-radius: 50%;
    position: absolute;
    border: calc(65px * 0.05) solid transparent;
    border-top-color: #ff1d99;
    border-left-color: #ff1d5e;
    animation: semipolar-spinner-animation 2s infinite;
}

.semipolar-spinner .ring:nth-child(1) {
    height: calc(65px - 65px * 0.2 * 0);
    width: calc(65px - 65px * 0.2 * 0);
    top: calc(65px * 0.1 * 0);
    left: calc(65px * 0.1 * 0);
    animation-delay: calc(2000ms * 0.1 * 4);
    z-index: 5;
}

.semipolar-spinner .ring:nth-child(2) {
    height: calc(65px - 65px * 0.2 * 1);
    width: calc(65px - 65px * 0.2 * 1);
    top: calc(65px * 0.1 * 1);
    left: calc(65px * 0.1 * 1);
    animation-delay: calc(2000ms * 0.1 * 3);
    z-index: 4;
}

.semipolar-spinner .ring:nth-child(3) {
    height: calc(65px - 65px * 0.2 * 2);
    width: calc(65px - 65px * 0.2 * 2);
    top: calc(65px * 0.1 * 2);
    left: calc(65px * 0.1 * 2);
    animation-delay: calc(2000ms * 0.1 * 2);
    z-index: 3;
}

.semipolar-spinner .ring:nth-child(4) {
    height: calc(65px - 65px * 0.2 * 3);
    width: calc(65px - 65px * 0.2 * 3);
    top: calc(65px * 0.1 * 3);
    left: calc(65px * 0.1 * 3);
    animation-delay: calc(2000ms * 0.1 * 1);
    z-index: 2;
}

.semipolar-spinner .ring:nth-child(5) {
    height: calc(65px - 65px * 0.2 * 4);
    width: calc(65px - 65px * 0.2 * 4);
    top: calc(65px * 0.1 * 4);
    left: calc(65px * 0.1 * 4);
    animation-delay: calc(2000ms * 0.1 * 0);
    z-index: 1;
}

@keyframes semipolar-spinner-animation {
    50% {
        transform: rotate(360deg) scale(0.7);
    }
}
</style>
