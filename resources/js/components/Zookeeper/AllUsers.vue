<template>
    <div id="all-users">
        <div class="container">
            <div v-if="userCanZooKeep">
                <h2>{{ zookeeperMessage }}</h2>
            </div>
            <div v-else>
                <div class="row" id="AllEagles">
                    <ul class="col-12" v-for="(user, index) in allUsers" :key="index">
                        <li>
                            <span>{{ user.name }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'all-users',
    components: {

    },
    data(){
        return{
            allUsers: [],
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
        this.$store.dispatch('retrieveAllUsers')
            .then(response => {
                console.log(response);
                this.allUsers = response;
            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>
    
</style>