<template>
    <div class="inline-div" :id="`FeatherList-${eagle.id}`">
        
        <!-- Button to Open the Modal -->
        <button type="button" class="btn btn-secondary round-button" data-toggle="modal" :data-target="`#FeatherListModal-${eagle.id}`" @click="retrieveFeathers(0)">
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
                        <div class="row">
                            <nav class="mx-auto"  aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item" v-bind:class="{ disabled: !hasPrevious }"  @click="retrieveFeathers(-10)">
                                        <span class="page-link" aria-label="Previous">
                                            <span aria-hidden="true">&laquo; previous 10</span>
                                        </span>
                                    </li>
                                    <li class="page-item"  v-bind:class="{ disabled: !hasNext }"  @click="retrieveFeathers(10)">
                                        <span class="page-link" aria-label="Next">
                                            <span aria-hidden="true">next 10 &raquo;</span>
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Content</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody v-for="(feather, index) in feathers" :key="index">
                                <tr>
                                    <td>{{ feather.spot }}</td>
                                    <td>{{ getLocalTime(feather.created_at)}}</td>
                                </tr>
                            </tbody>
                        </table>
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
            feathers: [],
            skip: 0,
            hasNext: false,
        }
    },
    computed: {
        hasPrevious(){
            return this.skip > 0;
        }
    },
    methods: {
        getLocalTime(feather){
            let _lastFeatherUTC = this.$moment.utc(feather);
            let _lastFeatherLocal = this.$moment(_lastFeatherUTC).local().format('YYYY-MM-DD hh:mm:ss a');
            return _lastFeatherLocal
        },
        retrieveFeathers(skip=0){

            if(skip == 0){
                this.skip = 0;
            }else if((this.hasPrevious && skip == -10) || (this.hasNext && skip == 10)){
                this.skip += skip;
            }

            let _payload = {
                id: this.eagle.id,
                limit: 10,
                skip: this.skip
            }
            this.$store.dispatch('eagle/retrieveFeathers', _payload)
            .then(response => {
                this.feathers = response;
                (response.length<10 ? this.hasNext = false : this.hasNext = true);
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