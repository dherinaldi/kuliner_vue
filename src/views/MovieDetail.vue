<template>
<div>
    <Navbar />
    <b-container class="bv-example-row">
        <NavQuran />
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Movie / Film
                    <strong>Detail</strong>
                </h2>

                <div class="mt-4">
                    <h4>{{movies.Title}}</h4>
                    <b-card :img-src="movies.Poster" img-alt="Card image" img-left class="mb-3">
                        <b-card-text>
                            Some quick example text to build on the card and make up the bulk of the card's content.<br>
                            Year : {{movies.Year}} ({{movies.Rated}}) - {{movies.Released}}<br>
                            Genre : {{movies.Genre}}<br>
                            Actors : {{movies.Actors}}<br>
                            Plot : {{movies.Plot}} <br>
                            Lang : {{movies.Language}} Country: {{movies.Country}}<br>
                            Awards : {{movies.Awards}}<br>
                            Ratings :{{movies.Ratings[0].Value}} ({{movies.Ratings[0].Source}}) <br>
                            Type : {{movies.Type}} <br>
                            Total Seasons : {{movies.totalSeasons}}

                        </b-card-text>

                    </b-card>

                </div>
            </div>
        </div>
    </b-container>
</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NavQuran from "@/components/NavQuran.vue";
import axios from 'axios';
//http://www.omdbapi.com/?i=tt0499549&r=json&apikey=a066c6ba

export default {
    name: 'MovieDetail',
    components: {
        Navbar,
        NavQuran
    },
    data() {
        return {
            movies: []
        }

    },
    created() {
        axios.get(`http://www.omdbapi.com/?i=${this.$route.params.id}&r=json&apikey=a066c6ba`).then(res => {
            this.movies = res.data;
            console.log(res.data)
        })

    }
}
</script>
