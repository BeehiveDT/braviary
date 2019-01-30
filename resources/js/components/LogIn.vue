<template>
    <div id="log-in">
        <div class="container">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="logInEmail">Email</label>
                    <input :value="email" type="email" class="form-control" id="logInEmail" placeholder="Email" @input="updateEmail">
                </div>
                <div class="form-group">
                    <label for="logInPassword">Password</label>
                    <input :value="password" type="password" class="form-control" id="logInPassword" placeholder="Password" @input="updatePassword">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'logIn',
    data(){
        return {
            // email: '',
            // password: '',
        }
    },
    computed: {
        email(){
            return this.$store.state.email;
        },
        password(){
            return this.$store.state.password;
        }
    },
    methods: {
        // listen to email changes and update state.email in store.js
        updateEmail(input) {
            this.$store.commit('updateEmail', input.target.value);
        },
        updatePassword(input) {
            this.$store.commit('updatePassword', input.target.value);
        },
        submit(){
            let email = this.email;
            let password = this.password; 
            this.$store.dispatch('logInSubmit', { 
                email, 
                password
                });
        },
    }
}
</script>