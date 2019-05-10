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
                        <select class="form-control" id="exampleFormControlSelect1" v-model="selected">
                            <option value=10>10</option>
                            <option value=25>25</option>
                            <option value=50>50</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div class="col-10">
                        <nav class="float-right"  aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" v-bind:class="{ disabled: hasPrevious }">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo; previous {{ selected }}</span>
                                    </a>
                                </li>
                                <li class="page-item" v-bind:class="{ disabled: hasNext }">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">next {{ selected }} &raquo;</span>
                                    </a>
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
                                    <th scope="col">Update</th>
                                    <th scope="col">Token</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="9">
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
            frequency: 0,
            tolerance: 0,
            eaglePageMessage: 'Hey hey, You need to log in first.',
            selected: 10
        }
    },
    computed: {
        userNotLoggedIn(){
            return !this.$store.state.user.userLoggedIn;
        },
        eagles(){
            return this.$store.state.eagle.eagleList;
        },
        hasPrevious(){
            return this.selected == 'all';
        },
        hasNext(){
            return this.selected == 'all';
        }
    },
    methods: {
        toggleShow(){
            this.isShow = !this.isShow;
        },
        clearForm(){
            this.name = '';
            this.frequency = 0;
            this.tolerance = 0;
        },
        submit(){
            let name = this.name;
            let frequency = parseInt(this.frequency);
            let tolerance = parseInt(this.tolerance);

            this.$store.dispatch('createEagle', { 
                name,
                frequency,
                tolerance
                })
                .then(response => { 
                    // clear and close form after successful eagle creation
                    this.toggleShow();
                    this.clearForm();
                })
                .catch(error => {
                    // failed to create eagle
                })
        },
    },
    mounted: function () {
        this.$store.dispatch('eagle/retrieveEagleList')
            .then(response => { 
                // retrieve first 10 eagles' feathers

            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>
    
</style>