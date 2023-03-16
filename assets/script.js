Vue.component('favorite-btn',{
    template:`<div class="btn-fav" @click='getfavorite(idmovie)' ><i class='bx bxs-heart' v-if="tablefavorite.includes((idmovie).toString())"></i><i class='bx bx-heart' v-else=""></i></div>`,
    props:['tablefavorite','getfavorite','idmovie'],
})

let app = new Vue({
    el:"#app",
    data:{
        researchOn: false,
        showButtonMore: 'Voir Plus',
        listLook: 8,
        indexCarousel: 0,
        research: "",
        tableMovie:[],
        tableFavorite:[],
    },

    methods:{
        getApi: async function(){
            return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3573581ba694cfe31b4acc947e342111&language=fr`)
            .then(response => response.json())
            .then(json => {
                this.tableMovie = json.results;
                console.log(this.tableMovie);
            })   
        },

        getMoviePath(url){
            return 'https://image.tmdb.org/t/p/w300/' + url
        },

        getMoviePathBanner(url){
            return 'https://image.tmdb.org/t/p/original/' + url
        },

        removeTask: function(index) {
            this.task.splice(index, 1);
        },

        getFavorite: function(idMovie){
            string = localStorage.getItem('favorite-table')
            string2 = ''
            idMovie = String(idMovie)
            this.tableFavorite = []
            for (i of string){
                if (i == ',') {
                    this.tableFavorite.push(string2)
                    string2 = ''
                } else {
                    string2 += i
                }
            }
            this.tableFavorite.push(string2)
            this.tableFavorite = this.tableFavorite.filter((item) => item !== "")
            this.tableFavorite = this.tableFavorite.filter((item) => item !== "undefined")
            try {
                if(this.tableFavorite.includes(idMovie)){
                    this.tableFavorite = this.tableFavorite.filter((item) => item !== idMovie)
                }else{
                    this.tableFavorite.push(idMovie)
                }
                localStorage.setItem("favorite-table", this.tableFavorite)
            } catch (error) {
                console.log(error);
                this.tableFavorite.push(idMovie)
                localStorage.setItem("favorite-table", this.tableFavorite)
            }
        },
        previousCarousel: function () {
            if (this.indexCarousel +1 == 20) {
                this.indexCarousel = 0
            } else {
                this.indexCarousel += 1
                if (this.indexCarousel == 3) {
                    this.indexCarousel = 4
                }
                if (this.indexCarousel == 12) {
                    this.indexCarousel = 13
                }
            }
        },
        followingCarousel: function () {
            if (this.indexCarousel -1 == -1) {
                this.indexCarousel = 19
            } else {
                this.indexCarousel -= 1
                if (this.indexCarousel == 3) {
                    this.indexCarousel = 2
                }
                if (this.indexCarousel == 12) {
                    this.indexCarousel = 11
                }
            }
        },
        ShowMore: function() {
            if (this.listLook == 8) {
                this.listLook += 8
                this.showButtonMore= 'Voir Moins'
            } else {
                this.listLook -= 8
                this.showButtonMore= 'Voir Plus'
            }
        },
        inputResearch: function() {
            if (this.research != "") {
                this.researchOn = true
            } else {
                this.researchOn = false
            }
        },
    },
    mounted () {
        this.getApi()
        this.getFavorite()
        setInterval(() => {
            if (this.indexCarousel == 20) {
                this.indexCarousel = 0
            } else if (this.indexCarousel == -1) {
                this.indexCarousel = 19
            } else {
                this.indexCarousel += 1
                if (this.indexCarousel == 3) {
                    this.indexCarousel = 4
                }
                if (this.indexCarousel == 12) {
                    this.indexCarousel = 13
                }
            }
        }, 5000)
    }
});