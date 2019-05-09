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
                            <span>{{ user.email }}</span>
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
            zookeeperMessage: `Hey hey, you shouldn't be here!`
        }
    },
    computed: {
        userCanZooKeep(){
            return !this.$store.state.user.userLoggedIn || !this.$store.state.user.userIsAdmin;
        },
        allUsers(){
            return this.$store.state.zookeeper.zookeeperUserList;
        }
    },
    methods: {

    },
    mounted(){
        this.$store.dispatch('zookeeper/retrieveUserList')
            .then(response => {
                // do nothing
            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>
    
</style>