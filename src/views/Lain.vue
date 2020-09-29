<template>
<div>
    <Navbar />
    <div class="container">
        <b-row>
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

        <b-row>
            <b-col>
                <b-button variant="outline-primary" @click="login()" size="sm">Login</b-button>
                <b-button variant="outline-success" @click="show_data" size="sm"> Show Data </b-button>
                <b-button variant="outline-danger" @click="clear_token" size="sm"> Clear Token </b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                {{result}}
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
            result: ''
        }
    },
    methods: {

        async load_data() {
            const url = 'http://localhost/ci-rest-jwt/api/auth/login';
            const formdata = new FormData();

            formdata.append("username", "dodi");
            formdata.append("password", "dodi123");

            const token = await axios.post(url, formdata).then(res => res.data.token).catch(e => console.log(e));

            localStorage.setItem('token', token)

            this.result = `Login Success with JWT token ${token}`

        },
        login() {
            tr
            this.load_data()

        },
        async show_data() {
            console.log(localStorage.getItem("token"))

            const JWT_token = localStorage.getItem("token");

            const url_post = 'http://localhost/ci-rest-jwt/api/main/test';
            axios.defaults.headers.common["Authorization"] = `Bearer ${JWT_token}`;

            const dat = await axios.post(url_post).then(res => res.data).catch(e => console.log(e));

            this.result = dat;

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

</style>
