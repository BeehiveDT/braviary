<template>
    <div id="all-eagles">
        <div class="container">
            <div v-if="userCanZooKeep">
                <h2>{{ zookeeperMessage }}</h2>
            </div>
            <div v-else>
                <div class="row" id="AllEagles">
                    <ul class="col-12" v-for="(eagle, index) in allEagles" :key="index">
                        <li>
                            <span>{{ eagle.name }}</span>
                        </li>
                    </ul>
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
            return !this.$store.state.userLoggedIn || !this.$store.state.is_admin;
        }
    },
    methods: {

    },
    mounted(){
        this.$store.dispatch('retrieveAllEagles')
            .then(response => {
                this.allEagles = response;
            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>
    
</style>