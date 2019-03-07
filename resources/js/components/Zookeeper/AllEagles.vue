<template>
    <div id="eagles">
        <div class="container">
            <div v-if="userCanZooKeep">
                <h2>{{ zookeeperMessage }}</h2>
            </div>
            <div v-else>
                <span>HI</span>
                <div class="row" id="AllEagles">
                    <div v-for="(eagle, index) in allEagles" :key="index">
                        <div>{{eagle.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'all-eagles',
    components: {

    },
    data(){
        return{
            allEagles: [],
            zookeeperMessage: `Hey hey, you shouldn't be here!`
        }
    },
    computed: {
        userCanZooKeep(){
            console.log(this.$store.state.is_admin)
            return !this.$store.state.userLoggedIn || !this.$store.state.is_admin;
        }
    },
    methods: {

    },
    mounted(){
        this.$store.dispatch('retrieveAllEagles')
            .then(response => {
                this.allEagles = response;
                console.log(this.allEagles)
            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>
    
</style>