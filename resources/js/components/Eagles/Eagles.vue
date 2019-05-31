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
                    <div class="col-1">
                        <button @click="retrieveEaglesList()" class="btn btn-dark" >
                            <font-awesome-icon :icon="['fas', 'redo-alt']"></font-awesome-icon>
                        </button>
                    </div>
                    <div class="col-9">
                        <nav class="float-right"  aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" v-bind:class="{ disabled: !hasPrevious }" @click="updateEaglesPageOffset(-1)">
                                    <a class="page-link btn-pagination" v-bind:class="{ 'text-info': hasPrevious }">&laquo; previous</a>
                                </li>
                                <li class="page-item" v-bind:class="{ disabled: true }">
                                    <span class="page-link">
                                        <span aria-hidden="true"> page {{ current+1 }} / {{ total }}</span>
                                    </span>
                                </li>
                                <li class="page-item" v-bind:class="{ disabled: !hasNext }" @click="updateEaglesPageOffset(1)">
                                    <a class="page-link btn-pagination" v-bind:class="{ 'text-info': hasNext }">next &raquo;</a>
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
                                    <th scope="col">
                                        <span>ID</span>
                                    </th>
                                    <th scope="col">
                                        <span>Name</span>
                                    </th>
                                    <th scope="col">
                                        <span v-tooltip.bottom="'Minute(s)/Feather'">Frequency</span>
                                    </th>
                                    <th scope="col">
                                        <span v-tooltip.bottom="'Max Tardiness = <br> Freq. x Tolerance'">Tolerance</span>
                                    </th>
                                    <th scope="col">
                                        <span v-tooltip.bottom="'Latest On Time Feathers % <br> Red Bar: Latest feathers includes at least one that exceeds specified tolerance'">Fluffiness</span>
                                    </th>
                                    <th scope="col">
                                        <span>Last Feather</span>
                                    </th>
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
        <br>
    </div>
</template>

<script>

import AddEagle from './AddEagle.vue';
import Eagle from './Eagle.vue';
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
            'current': state => state.eagle.eaglesCurrentPageNum,
            'total': state => state.eagle.totalPageNums
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

.btn-pagination{
    cursor: pointer;
}
</style>