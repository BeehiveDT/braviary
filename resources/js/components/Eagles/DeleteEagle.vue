<template>
    <div :id="`DeleteEagle-${eagle.id}`">
        <button v-on:click="deleteEagle(eagle.id)" class="btn btn-danger">Delete</button>
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