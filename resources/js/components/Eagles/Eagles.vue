<template>
    <div id="eagles">
        <div class="container">
            <div v-if="userNotLoggedIn">
                <h2>{{ eaglePageMessage }}</h2>
            </div>
            <div v-else>
                <!-- Add New Eagle -->        
                <add-eagle class="mb-4"></add-eagle>

                <button v-on:click="refreshEagles" class="btn btn-dark round-button" type="button">
                    <font-awesome-icon :icon="['fas', 'redo']"></font-awesome-icon>
                    <span>Refresh</span>
                </button>

                <div class="row" id="ShowEagles">
                    <div class="eagle-card card col-lg-6 col-md-12 mb-4" v-for="(eagle, index) in eagles" :key="index">
                        <div class="card-body">
                            <div class="card-text">
                                <eagle :eagle="eagle"></eagle>
                            </div>
                        </div>
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
    name: 'eagles',
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
            eaglePageMessage: 'Hey hey, You need to log-in first.'
        }
    },
    computed: {
        userNotLoggedIn(){
            return !this.$store.state.userLoggedIn;
        },
        eagles(){
            console.log('going to rerender eagles');
            return this.$store.state.eagles;
        }
    },
    methods: {
        toggleShow(){
            this.isShow = !this.isShow;
            console.log(this.isShow);
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
        refreshEagles(){
            // this.$forceUpdate();
        }
    },
}
</script>

<style scoped>
    
</style>