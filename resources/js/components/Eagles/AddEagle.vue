<template>
    <div class="row" id="add-eagle">
        <p>
            <button v-on:click="toggleShow" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#addNewEagle" aria-expanded="false" aria-controls="collapseExample">
                Add New Eagle
            </button>
        </p>
        <div v-bind:class="{show: isShow}" class="col-12 mb-3" id="addNewEagle">
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
                    <button type="submit" class="btn btn-primary round-button">
                        <font-awesome-icon :icon="['fas', 'paper-plane']"></font-awesome-icon>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add-eagle',
    data(){
        return{
            isShow: false,
            name: '',
            frequency: 0,
            tolerance: 0
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
        }
    },
}
</script>