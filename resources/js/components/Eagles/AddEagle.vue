<template>
    <div class="row" id="add-eagle">

        <div style="width: 100%" data-toggle="modal" data-target="#addNewEagle" v-on:click="toggleShow">
            <span>Add New Eagle</span>
        </div>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="isShow">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
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
                        </div>
                    </div>
                </div>
            </transition>
        </modal>
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
            tolerance: 0,
            showModal: false
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
    .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
    }

    .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    }

    .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
    margin-top: 0;
    color: #42b983;
    }

    .modal-body {
    margin: 20px 0;
    }

    .modal-default-button {
    float: right;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
    opacity: 0;
    }

    .modal-leave-active {
    opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    }
</style>