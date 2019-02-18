<template>
    <div :id="`UpdateEagle${eagle.id}`">
        <button v-on:click="toggleOpen(); getEagleViewers(eagle.id);" class="btn btn-success" >Edit</button>

        <delete-eagle :eagle="eagle"></delete-eagle>
        <transition name="slide-fade">
            <div v-if="isOpen" :id="`UpdateEagleForm-${eagle.id}`">
                <br>
                <div class="row">
                    <div class="col-6 inline-div">
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
                    <div class="col-6 inline-div">
                        <div class="card card-body viewer">
                            <form @submit.prevent="addEagleViewer(eagle.id)">
                                <div class="form-group">
                                    <label for="EagleName">Email</label>
                                    <input v-model="email"  type="email" class="form-control" id="EagleName" placeholder="Viewer Email">
                                </div>
                                <button type="submit" class="btn btn-primary">Add</button>
                            </form>
                            <!-- <eagle-viewers :eagle="eagle"></eagle-viewers> -->
                            <ul class="scrollable" id="example-1">
                                <li v-for="(viewer, index) in viewers" :key="index">
                                    {{ viewer.email }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import DeleteEagle from './DeleteEagle.vue';


export default {
    name: 'update-eagle',
    components: {
        DeleteEagle
    },
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
            tolerance: this.eagle.tolerance,
            email: '',
            viewers: []
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
            // eagle object
            let eagle = {name, frequency, tolerance}

            this.$store.dispatch('updateEagle', {
                id,
                eagle
                })
                .then(response => { 
                    // close form after updating eagle
                    this.toggleOpen();
                })
                .catch(error => {
                    // failed to create eagle
                })
            // console.log(this.name, this.frequency, this.tolerance)
        },
        addEagleViewer(id){
            // email object
            let email = {target_mail: this.email}

            this.$store.dispatch('addEagleViewer', {
                id,
                email
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getEagleViewers(id){

            this.$store.dispatch('getEagleViewers', {
                id
            })
            .then(response => {
                this.viewers = response;
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        },
    },
    // created(){

    // }
}
</script>


<style scoped>

    .viewer {
        height: 100%;
    }

    .scrollable {
        height: 50%;
        overflow: scroll;
    }
</style>