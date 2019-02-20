<template>
    <div :id="`DeleteEagle-${eagle.id}`">

        <!-- Button to Open the Modal -->
        <button ype="button" class="btn btn-danger" data-toggle="modal" :data-target="`#DeleteEagleModal-${eagle.id}`">
            <font-awesome-icon :icon="['fas', 'trash-alt']"></font-awesome-icon>
            <span>Delete</span>
        </button>

        <!-- The Modal -->
        <div class="modal fade" :id="`DeleteEagleModal-${eagle.id}`">
            <div class="modal-dialog">
                <div class="modal-content">
                
                    <!-- Modal Header -->
                    <div class="modal-header">
                    <h4 class="modal-title">Delete Confirmation</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="modal-body">
                        <!-- Photo by Andreas Barth from Pexels -->
                        <img style="width: 100%;" :src="'/img/upset_eagle.jpg'">
                        <span>Are you sure you want to delete {{ eagle.name }}?</span>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button v-on:click="deleteEagle(eagle.id)" class="btn btn-danger" data-dismiss="modal">Killing it. Goodbye ;(</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">It's Okay, maybe next time.</button>
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'delete-eagle',
    props: {
        eagle: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            name: this.eagle.name,
            frequency: this.eagle.frequency,
            tolerance: this.eagle.tolerance
        }
    },
    methods: {
        deleteEagle(id){
            this.$store.dispatch('deleteEagle', {
                id
                })
                .then(response => { 
                    // do nothing
                })
                .catch(error => {
                    // do nothing
                })
        }
    },
}
</script>

<style scoped>
    div[id^='DeleteEagle-']{
        display: inline;
    }
</style>