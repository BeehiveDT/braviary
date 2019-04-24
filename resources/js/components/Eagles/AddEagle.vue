<template>
    <div class="row" id="add-eagle">

        <div style="width: 100%" data-toggle="modal" data-target="#addNewEagle" v-on:click="toggleShow">
            <span>Add New Eagle</span>
        </div>

        <!-- Add Eagle Modal -->
        <div class="modal" id="addNewEagle" v-bind:class="{show: isShow}">
            <div class="modal-dialog">
                <div class="modal-content">
                    isShow: {{isShow}}
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Modal Heading</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <form @submit.prevent="submit">
                        <div class="form-group">
                            <label for="EagleName">Name</label>
                            <input v-model="name" type="text" class="form-control" id="EagleName" placeholder="Eagle Name">
                        </div>
                        <div class="form-group">
                            <label for="EagleFrequency">Frequency</label>
                            <input v-model="frequency" type="number" class="form-control" id="EagleFrequency" placeholder="Frequency" min="0">
                        </div>
                        <div class="form-group">
                            <label for="EagleTolerance">Tolerance</label>
                            <input v-model="tolerance" type="number" class="form-control" id="EagleTolerance" placeholder="Tolerance" min="0">
                        </div>
                        <button type="submit" class="btn btn-primary round-button">
                            <font-awesome-icon :icon="['fas', 'paper-plane']"></font-awesome-icon>
                            <span>Send</span>
                        </button>
                    </form>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div>

        <!-- <div v-bind:class="{show: isShow}" class="collapse" id="addNewEagle">
            <div class="card card-body">
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <label for="EagleName">Name</label>
                        <input v-model="name" type="text" class="form-control" id="EagleName" placeholder="Eagle Name">
                    </div>
                    <div class="form-group">
                        <label for="EagleFrequency">Frequency</label>
                        <input v-model="frequency" type="number" class="form-control" id="EagleFrequency" placeholder="Frequency" min="0">
                    </div>
                    <div class="form-group">
                        <label for="EagleTolerance">Tolerance</label>
                        <input v-model="tolerance" type="number" class="form-control" id="EagleTolerance" placeholder="Tolerance" min="0">
                    </div>
                    <button type="submit" class="btn btn-primary round-button">
                        <font-awesome-icon :icon="['fas', 'paper-plane']"></font-awesome-icon>
                        <span>Send</span>
                    </button>
                </form>
            </div>
        </div> -->

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

            this.$store.dispatch('eagle/createEagle', { 
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

<style scoped>
    /* #addNewEagle {
        width: 100%;
        margin-top: 15px;
    } */
    #AddEagleButton {
        widows: 100%;
        height: 100%;
    }
</style>