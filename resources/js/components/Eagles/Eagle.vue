<template>
    <div :id="`Eagle-${eagle.id}`">             
        <span>{{eagle.id}}</span>
        |
        <span>{{eagle.name}}</span>
        <br>
        <span>Frequency: {{eagle.frequency}}</span>
        <br>
        <span>Tolerance: {{eagle.tolerance}}</span>
        <br>
        <span>Job Token: {{eagle.job_token}}</span>
        <br>
        <span>Last Feather: {{ lastFeather }}</span>
        

        <div>
            <button v-clipboard="copyEagleJobToken" class="btn btn-primary round-button">
                <font-awesome-icon :icon="['fas', 'clipboard']"></font-awesome-icon>
                <!-- <span>Copy</span> -->
            </button>
            <delete-eagle :eagle="eagle"></delete-eagle>
            <update-eagle :eagle="eagle"></update-eagle>
        </div>
    </div>
</template>

<script>
import UpdateEagle from './UpdateEagle.vue';
import DeleteEagle from './DeleteEagle.vue';


export default {
    name: 'eagle',
    components: {
        UpdateEagle,
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
            name: this.eagle.name,
            frequency: this.eagle.frequency,
            tolerance: this.eagle.tolerance,
            lastFeather: ''
        }
    },
    methods: {
        // num is the number of feathres to retrieve
        // num = 1 retrieves last feather
        copyEagleJobToken() {
            return this.eagle.job_token;
        }
    },
    mounted(){
        this.$store.dispatch('eagle/retrieveEagleFeathers', { 
            limit: 1,
            id: this.eagle.id
            })
            .then(response => {
                if (response.feathers[0]){
                    this.lastFeather = response.feathers[0]
                }else{
                    this.lastFeather = "None Found"
                }
            })
            .catch(error => {
                // do nothing
            })
    }
}
</script>

<style scoped>

</style>