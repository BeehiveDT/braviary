<template>
    <div id="eagles">
        <div class="container">
            <div v-if="userNotLoggedIn">
                <h2>{{ eaglePageMessage }}</h2>
            </div>
            <div v-else>
                <!-- Add New Eagle -->
                <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#addNewEagle" aria-expanded="false" aria-controls="collapseExample">
                        Add New Eagle
                    </button>
                </p>
                <div class="collapse" id="addNewEagle">
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
                    <div v-for="(item, index) in eagles" :key="index" >
                        {{item.id}}
                        |
                        {{item.name}}
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
                    // clear form after successful eagle creation
                    this.clearForm();
                })
                .catch(error => {
                    // failed to create eagle
                })
        },
    },
}
</script>