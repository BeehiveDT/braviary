<template>
    <div :id="`UpdateEagle${eagle.id}`">
        
        <button v-clipboard="copyEagleJobToken" class="btn btn-primary round-button">
            <font-awesome-icon :icon="['fas', 'clipboard']"></font-awesome-icon>
            <!-- <span>Copy</span> -->
        </button>
        <button v-on:click="toggleOpen(); getEagleViewers(eagle.id);" class="btn btn-success round-button" >
            <font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon>
            <!-- <span>Edit</span> -->
        </button>

        <delete-eagle :eagle="eagle"></delete-eagle>
        <transition name="slide-fade">
            <div v-if="isOpen" :id="`UpdateEagleForm-${eagle.id}`">
                <br>
                <div class="row .row-eq-height">
                    <div class="col-lg-12 col-md-6 col-12 inline-div">
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
                    <div class="col-lg-12 col-md-6 col-12 add-delete-viewers">
                        <div class="card card-body viewer">
                            <form @submit.prevent="addEagleViewer(eagle.id)">
                                <!-- <div class="form-group">
                                    <label for="EagleName">Email</label>
                                    <input v-model="email"  type="email" class="form-control" id="EagleName" placeholder="Viewer Email">
                                </div>
                                <button type="submit" class="btn btn-primary">Add</button> -->
                                <div class="input-group mb-3">
                                    <input v-model="email" type="email" class="form-control" id="ViewerEmail" placeholder="Add Viewer by Email" aria-describedby="add-viewer" aria-label="Add viewer to eagle">
                                    <div class="input-group-append">
                                        <button v-on:click="addEagleViewer(eagle.id)" class="btn btn-primary input-group-text" id="add-viewer" type="submit" >
                                            <font-awesome-icon :icon="['fas', 'paper-plane']"></font-awesome-icon>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <!-- <eagle-viewers :eagle="eagle"></eagle-viewers> -->
                            <div class="scrollable" id="example-1">
                                <div v-for="(viewer, index) in viewers" :key="index">
                                    <font-awesome-icon class="red" :icon="['far', 'times-circle']"></font-awesome-icon>
                                    <!-- <button class="btn btn-outline-danger delete-viewer" type="button">x</button> -->
                                    <span>{{ viewer.email }}</span>
                                </div>
                            </div>
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
            job_token: this.eagle.job_token,
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
            })
            .catch(error => {
                // do nothing
            })
        },
        copyEagleJobToken() {

            return this.job_token;

        }
    },
    // created(){

    // }
}
</script>


<style scoped>

    .add-delete-viewers {
        display: flex;
    }

    .scrollable {
        overflow-y: auto;
    }

</style>