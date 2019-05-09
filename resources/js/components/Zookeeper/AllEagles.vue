<template>
    <div id="all-eagles">
        <div class="container">
            <div v-if="userCanZooKeep">
                <h2>{{ zookeeperMessage }}</h2>
            </div>
            <div v-else>
                <div class="row" id="ZooKeepEagleList">
                    <div class="col-lg-12 col-md-12 mb-4">
                        <!-- Eagles Table -->
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Frequency</th>
                                    <th scope="col">Tolerance</th>
                                    <th scope="col">Fluffiness</th>
                                    <th scope="col">Last Feather</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Token</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Add New Eagle -->        
                                <!-- <tr>
                                    <td colspan="9">
                                        <add-eagle></add-eagle>
                                    </td>
                                </tr> -->
                                <eagle v-for="(eagle, index) in allEagles" :key="index" :eagle="eagle"></eagle>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Eagle from '../Eagles/Eagle.vue'

export default {
    name: 'all-eagles',
    components: {
        Eagle
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
        allEagles(){
            return this.$store.state.zookeeper.zookeeperEagleList;
        }
    },
    methods: {

    },
    mounted(){
        this.$store.dispatch('zookeeper/retrieveEagleList')
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