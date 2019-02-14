<template>
    <div :id="`UpdateEagle${eagle.id}`">
        <button v-on:click="toggleOpen" class="btn btn-success" >Toggle</button>
        <transition name="slide-fade">
            <div v-if="isOpen" :id="`UpdateEagleForm-${eagle.id}`">
                <div class="card card-body">
                    <form @submit.prevent="updateEagle(eagle.id)">
                        <div class="form-group">
                            <label for="EagleName">Name</label>
                            <input v-model="name"  type="text" class="form-control" id="EagleName" placeholder="Eagle Name">
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
        </transition>
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
            name: this.eagle.name,
            frequency: this.eagle.frequency,
            tolerance: this.eagle.tolerance
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
        updateEagle(id){
            let name = this.name;
            let frequency = parseInt(this.frequency);
            let tolerance = parseInt(this.tolerance);

            let eagle = {name, frequency, tolerance}

            this.$store.dispatch('updateEagle', {
                id,
                eagle
                })
                .then(response => { 
                    // clear and close form after successful eagle creation
                    this.toggleOpen();
                    // this.clearForm();
                })
                .catch(error => {
                    // failed to create eagle
                })
            // console.log(this.name, this.frequency, this.tolerance)
        }
    },
}
</script>


<style scoped>

</style>