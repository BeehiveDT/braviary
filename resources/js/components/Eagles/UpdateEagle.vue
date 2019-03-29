<template>
    <div class="inline-div" :id="`UpdateEagle${eagle.id}`">
        
        <button v-on:click="toggleOpen(); getEagleViewers(eagle.id);" class="btn btn-success round-button" >
            <font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon>
        </button>

        <transition name="slide-fade">
            <div v-if="isOpen" :id="`UpdateEagleForm-${eagle.id}`">
                <br>
                <div class="row row-eq-height">

                    <!-- update eagle -->
                    <div class="col-lg-12 col-md-6 col-12 inline-div">
                        <div class="card card-body">
                            <form @submit.prevent="updateEagle(eagle.id)">
                                <div class="form-group">
                                    <label for="EagleName">Name</label>
                                    <input v-model="name"  type="text" class="form-control" id="EagleName" placeholder="Eagle Name">
                                </div>
                                <div class="form-group">
                                    <label for="EagleFrequency">Frequency</label>
                                    <input v-model="frequency" type="number" class="form-control" id="EagleFrequency" placeholder="Frequency" min="0">
                                </div>
                                <div class="form-group">
                                    <label for="EagleTolerance">Tolerance</label>
                                    <input v-model="tolerance" type="number" class="form-control" id="EagleTolerance" placeholder="Tolerance" min="0">
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>

                    <!-- eagle viewers -->
                    <div class="col-lg-12 col-md-6 col-12 add-delete-viewers">
                        <div class="card card-body viewer">
                            <form @submit.prevent="addEagleViewer(eagle.id)">
                                <div class="input-group mb-3">
                                    <input v-model="email" type="email" class="form-control" id="ViewerEmail" placeholder="Add Viewer by Email" aria-describedby="add-viewer" aria-label="Add viewer to eagle">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary input-group-text" id="add-viewer" type="submit" >
                                            <font-awesome-icon :icon="['fas', 'paper-plane']"></font-awesome-icon>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div class="scrollable" id="example-1">
                                <div v-for="(viewer, index) in viewers" :key="index">
                                    <font-awesome-icon v-on:click="deleteViewerConfirmation(viewer)" class="red" :icon="['far', 'times-circle']" data-toggle="modal" data-target="#deleteViewerConfirmation"></font-awesome-icon>
                                    <span>{{ viewer.email }}</span>
                                </div>
                            </div>

                            <!-- The Modal -->
                            <div class="modal fade" id="deleteViewerConfirmation">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        
                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <span>Are you sure you want to delete {{viewerName}} with email: {{ viewerEmail }}?</span>
                                        </div>
                                        
                                        <!-- Modal footer -->
                                        <div class="modal-footer">
                                            <button type="button" v-on:click="deleteViewer(viewerEmail)" class="btn btn-danger" data-dismiss="modal">Yes</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                                        </div>
                                        
                                    </div>
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

export default {
    name: 'update-eagle',
    components: {
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
            viewerName: '',
            viewerEmail: '',
            viewers: []
        }
    },
    computed: {

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

            this.$store.dispatch('eagle/updateEagle', {
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
        },
        addEagleViewer(id){
            // email object
            let email = {target_mail: this.email}

            this.$store.dispatch('eagle/addEagleViewer', {
                id,
                email
            })
            .then(response => {
                this.getEagleViewers(id);
            })
            .catch(error => {
                // do nothing
            })
        },
        getEagleViewers(id){
            this.$store.dispatch('eagle/getEagleViewers', {
                id
            })
            .then(response => {
                this.viewers = response;
            })
            .catch(error => {
                // do nothing
            })
        },
        deleteViewerConfirmation(viewer){
            this.viewerName = viewer.name;
            this.viewerEmail = viewer.email;
        },
        deleteViewer(email){
            
            let body = {target_mail: email}
            let id = this.eagle.id;

            this.$store.dispatch('deleteEagleViewer', { 
                    id,
                    body
                })
                .then(response => {
                    this.getEagleViewers(id);
                })
                .catch(error => {
                    // do nothing
                })
        }
    }
}
</script>


<style scoped>

    .add-delete-viewers {
        display: flex;
    }

    .scrollable {
        /* height: 200px; */
        overflow-y: auto;
    }

</style>