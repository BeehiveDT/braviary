<template>
    <div class="inline-div" :id="`FeatherList-${eagle.id}`">
        <!-- Button to Open the Modal -->
        <button type="button" class="btn btn-secondary round-button" data-toggle="modal" :data-target="`#FeatherListModal-${eagle.id}`" @click="retrieveFeathers()">
            <font-awesome-icon :icon="['fas', 'list']"></font-awesome-icon>
            <!-- <span>Delete</span> -->
        </button>

        <!-- The Modal -->
        <div class="modal fade" :id="`FeatherListModal-${eagle.id}`">
            <div class="modal-dialog">
                <div class="modal-content">
                
                    <!-- Modal Header -->
                    <div class="modal-header">
                    <h4 class="modal-title">Feathers List</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div v-for="(feather, index) in feathers" :key="index">
                            <li>{{ feather.created_at }}</li>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'feather-list',
    props: {
        eagle: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            feathers: []
        }
    },
    methods: {
        retrieveFeathers(){
            let _payload = {
                id: this.eagle.id,
                limit: 10,
                skip: 0
            }
            this.$store.dispatch('eagle/retrieveFeathers', _payload)
            .then(response => {
                this.feathers = response
            })
            .catch(error => {
                // do nothing
            })
        }
    },
}
</script>

<style scoped>

</style>