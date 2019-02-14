<template>
    <div :id="`UpdateEagle${eagle.id}`">
        <p>
            <button v-on:click="toggleOpen" class="btn btn-success" type="button" data-toggle="collapse" :data-target="`#UpdateEagleForm-${eagle.id}`" aria-expanded="false" aria-controls="collapseExample">
                {{eagle.name}}
            </button>
        </p>
        <div v-bind:class="{show: isOpen}" class="collapse" :id="`UpdateEagleForm-${eagle.id}`">
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
    </div>
</template>

<script>
export default {
    name: 'update-eagle',
    props: {
        eagle: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            isOpen: false,
            name: eagle.name,
            frequency: 0,
            tolerance: 0
        }
    },
    methods: {
        toggleOpen(){
            this.isOpen = !this.isOpen;
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