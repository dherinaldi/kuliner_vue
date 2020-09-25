<template>
<b-row>
    <b-col>
        <router-link to="/appquran">
            <b-button variant="outline-primary">
                <b-icon icon="book" aria-hidden="true"></b-icon> App Quran 1
            </b-button>
        </router-link>
    </b-col>
    <b-col>
        <router-link to="/appquranfathimah">
            <b-button variant="outline-success">
                <b-icon icon="book" aria-hidden="true"></b-icon> Q-Fathimah
            </b-button>
        </router-link>
    </b-col>
    <b-col>
        <router-link to="/jadwalsholat">
            <b-button variant="outline-warning">
                <b-icon icon="book" aria-hidden="true"></b-icon> Jadwal Sholat
            </b-button>
        </router-link>
    </b-col>
    <b-col>
        <router-link to="/appmovie">
            <b-button variant="outline-info">
                <b-icon icon="film" aria-hidden="true"></b-icon> Apps Movie
            </b-button>
        </router-link>
    </b-col>
    <b-col>
        <router-link to="/appcorona">
            <b-button variant="outline-success">
                <b-icon icon="file-medical" aria-hidden="true"></b-icon> Apps Corona
            </b-button>
        </router-link>
    </b-col>
</b-row>
</template>

<script>
export default {
    name: 'NavQuran'

}
</script>
