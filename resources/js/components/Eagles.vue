<template>
    <div id="eagles">
        <div class="container">
            <div v-if="userNotLoggedIn">
                <h2>{{ eaglePageMessage }}</h2>
            </div>
            <div v-else>
                <!-- Add New Eagle -->
                <p>
                    <button v-on:click="toggleShow" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#addNewEagle" aria-expanded="false" aria-controls="collapseExample">
                        Add New Eagle
                    </button>
                </p>
                <div v-bind:class="{show: isShow}" class="collapse" id="addNewEagle">
                    <div class="card card-body">
                        <form @submit.prevent="submit">
                            <div class="form-group">
                                <label for="EagleName">Name</label>
                                <input v-model="name" type="text" class="form-control" id="EagleName" placeholder="Eagle Name">
                            </div>
                            <div class="form-group">
                                <label for="EagleFrequency">Frequency</label>
                                <input v-model="frequency" type="number" class="form-control" id="EagleFrequency" placeholder="Frequency">
                            </div>
                            <div class="form-group">
                                <label for="EagleTolerance">Tolerance</label>
                                <input v-model="tolerance" type="number" class="form-control" id="EagleTolerance" placeholder="Tolerance">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

                <div id="ShowEagles">
                    <div v-for="(item, index) in eagles" :key="index">
                        <div>
                            <span>{{item.id}}</span>
                            |
                            <span>{{item.name}}</span>
                            |
                            <button class="btn btn-success" v-on:click="updateEagle(item.id)">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'eagles',
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
        updateEagle(id){
            console.log(id)
        }
    },
}
</script>