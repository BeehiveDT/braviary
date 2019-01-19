<template>
    <div id="home">
        <div class="container">
            <h2>{{ homeMessage }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    computed: {
        homeMessage(){
            return this.$store.getters.homeMessage;
        }
    }
}
</script>