<template>
    <div id="sign-up">
        <div class="container">
            <h2>{{ signUpMessage }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sign-up',
    computed: {
        signUpMessage(){
            return this.$store.getters.signUpMessage;
        }
    }
}
</script>