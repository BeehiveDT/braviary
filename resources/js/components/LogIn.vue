<template>
    <div id="log-in">
        <div class="container">
            <div class="alert alert-warning" v-if="logInFailed">
                <span>Please try again</span>
            </div>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="logInEmail">Email</label>
                    <input v-model="email" type="email" class="form-control" id="logInEmail" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="logInPassword">Password</label>
                    <input v-model="password" type="password" class="form-control" id="logInPassword" placeholder="Password">
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
            email: '',
            password: '',
            logInFailed: false
        }
    },
    computed: {
        //
    },
    methods: {
        submit(){
            let email = this.email;
            let password = this.password; 
            this.$store.dispatch('logInSubmit', { 
                email, 
                password
                })
                .then(response => { 
                    // do nothing
                    })
                    .catch(
                    error => {
                        // console.log(`signup failed RAWR`);
                        // console.log(error.message.email);
                        this.email = '';
                        this.password = '';
                        this.logInFailed = true;
                        console.log(typeof error.data.error.message === "string")
                        console.log(error.data.error.message)
                    })
        },
    }
}
</script>