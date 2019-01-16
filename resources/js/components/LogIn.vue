<template>
    <div id="log-in">
        <div class="container">
            <h2>{{ logInMessage }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'logIn',
    computed: {
        logInMessage(){
            return this.$store.getters.logInMessage;
        }
    }
}
</script>