<template>
    <div id="eagle-list">
        <div class="container">
            <div v-if="userNotLoggedIn">
                <h2>{{ eaglePageMessage }}</h2>
            </div>
            <div v-else>
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
            eaglePageMessage: 'Hey hey, You need to log in first.'
        }
    },
    computed: {
        userNotLoggedIn(){
            return !this.$store.state.user.userLoggedIn;
        },
        eagles(){
            return this.$store.state.eagle.eagleList;
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