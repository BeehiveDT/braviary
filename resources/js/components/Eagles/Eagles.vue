<template>
    <div id="eagle-list">
        <div class="container">
            <div v-if="userNotLoggedIn">
                <h2>{{ eaglePageMessage }}</h2>
            </div>
            <div v-else>
                <br>
                <div class="row" id="skipEagles">
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
                                    <span class="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo; previous {{ eaglesPerPage }}</span>
                                    </span>
                                </li>
                                <li class="page-item" v-bind:class="{ disabled: !hasNext }" @click="updateEaglesPageOffset(1)">
                                    <span class="page-link" aria-label="Next">
                                        <span aria-hidden="true">next {{ eaglesPerPage }} &raquo;</span>
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="row" id="ShowEagles">
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
                                    <th scope="col">Feathers</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Token</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="10">
                                        <!-- Add New Eagle -->        
                                        <add-eagle></add-eagle>
                                    </td>
                                </tr>
                                <eagle v-for="(eagle, index) in eagles" :key="index" :eagle="eagle"></eagle>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import AddEagle from './AddEagle.vue'
import Eagle from './Eagle.vue'
import { mapState } from 'vuex';

export default {
    name: 'eagle-list',
    components: {
        AddEagle,
        Eagle
    },
    data(){
        return{
            isShow: false,
            name: '',
            eaglePageMessage: 'Hey hey, You need to log in first.',
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
            'eagles': state => state.eagle.eaglesCurrent,
            'userNotLoggedIn': state => !state.user.userLoggedIn,
            'eaglesPage': state => state.eagle.eaglesPage,
        }),
        hasPrevious(){
            let _currentPage = this.$store.state.eagle.eaglesCurrentPageNum;
            return _currentPage > 0;
        },
        hasNext(){
            let _currentPage = this.$store.state.eagle.eaglesCurrentPageNum;
            let _totalPageNums = this.$store.state.eagle.totalPageNums;
            return (_currentPage+1) < _totalPageNums;
        },
    },
    methods: {
        toggleShow(){
            this.isShow = !this.isShow;
        },
        retrieveEaglesList(){
            this.$store.dispatch('eagle/retrieveEaglesList', {eaglesPerPage: this.eaglesPerPage})
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
                this.$store.dispatch('eagle/retrieveCurrent', { offset })
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
            this.$store.commit('eagle/updateEaglesListPaginated', eaglesPerPage);
            this.updateEaglesPageOffset(0);
        }
    },
    mounted: function () {
        this.retrieveEaglesList();
    }
}
</script>

<style scoped>
    
</style>