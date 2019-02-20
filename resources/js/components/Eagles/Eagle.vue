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
        <update-eagle :eagle="eagle"></update-eagle>
    </div>
</template>

<script>
import UpdateEagle from './UpdateEagle.vue'
export default {
    name: 'eagle',
    components: {
        UpdateEagle
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

    },
    mounted(){
        // retrieve last feather
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.$store.state.userToken
            },
            params: {
                'limit': 1
            }
        }
        
        axios.get(`${window.location.origin + '/api'}/eagles/${this.eagle.id}/feathers`, config)
        .then(response => {
            let feathersArr = response.data['Success']['feathers']
            if (feathersArr[0]){
                this.lastFeather = feathersArr[0]
            }else{
                this.lastFeather = "None Found"
            }
        })
        .catch((error) => {
        });
    }
}
</script>

<style scoped>

</style>