<template>
    <div id="all-eagles">
        <div class="container">
            <div v-if="userCanZooKeep">
                <h2>{{ zookeeperMessage }}</h2>
            </div>
            <div v-else>
                <br>
                <div class="row" id="skipZookeepEagles">
                    <div class="form-group col-2">
                        <select class="form-control" id="exampleFormControlSelect1" v-model="eaglesPerPage">
                            <option value=10>10</option>
                            <option value=25>25</option>
                            <option value=50>50</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div class="col-10">
                        <nav class="float-right"  aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" v-bind:class="{ disabled: !hasPrevious }" @click="updateEaglesPageOffset(-1)">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo; previous</span>
                                    </a>
                                </li>
                                <li class="page-item" v-bind:class="{ disabled: true }">
                                    <span class="page-link">
                                        <span aria-hidden="true"> page {{ current+1 }} / {{ total }}</span>
                                    </span>
                                </li>
                                <li class="page-item" v-bind:class="{ disabled: !hasNext }" @click="updateEaglesPageOffset(1)">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">next &raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
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
                                    <!-- <th scope="col">Token</th> -->
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
                                <eagle v-for="(eagle, index) in eagles" :key="index" :eagle="eagle"></eagle>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import Eagle from './Eagle.vue';
import { mapState } from 'vuex';

export default {
    name: 'all-eagles',
    components: {
        Eagle
    },
    data(){
        return{
            zookeeperMessage: `Hey hey, you shouldn't be here!`,
            eaglesPerPage: '10',
        }
    },
    watch: {
        eaglesPerPage: function(value) {
            this.updateEaglesListPaginated(value);
        }
    },
    computed: {
        ...mapState({
            'eagles': state => state.zookeeper.eaglesCurrent,
            'current': state => state.zookeeper.eaglesCurrentPageNum,
            'total': state => state.zookeeper.totalPageNums
        }),
        userCanZooKeep(){
            return !this.$store.state.user.userLoggedIn || !this.$store.state.user.userIsAdmin;
        },
        hasPrevious(){
            let _currentPage = this.$store.state.zookeeper.eaglesCurrentPageNum;
            return _currentPage > 0;
        },
        hasNext(){
            let _currentPage = this.$store.state.zookeeper.eaglesCurrentPageNum;
            let _totalPageNums = this.$store.state.zookeeper.totalPageNums;
            return (_currentPage+1) < _totalPageNums;
        },
    
    },
    methods: {
        retrieveEaglesList(){
            this.$store.dispatch('zookeeper/retrieveEaglesList', {eaglesPerPage: this.eaglesPerPage})
                .then(response => {
                    // do nothing
                })
                .catch(error => {
                    // do nothing
                })
        },
        // 改頁數
        updateEaglesPageOffset(offset){
            if((this.hasPrevious && offset == -1) || (this.hasNext && offset == 1) || (offset == 0)){
                this.$store.dispatch('zookeeper/retrieveCurrent', { offset })
                .then(response => {
                    // do nothing
                })
                .catch(error => {
                    // do nothing
                })
            }
        },
        // 改筆數
        updateEaglesListPaginated(eaglesPerPage){
            this.$store.commit('zookeeper/updateEaglesListPaginated', eaglesPerPage);
            this.updateEaglesPageOffset(0);
        }
    },
    mounted(){
        this.retrieveEaglesList();
    }
}
</script>

<style scoped>
    
</style>