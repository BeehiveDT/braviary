<template>
    <div class="container" id="log-in">
        <div class="alert alert-warning" v-if="logInFailed">
            <span>Please try again</span>
        </div>
        <div class="mx-auto col-lg-6 offset-lg-3 col-md-12">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="logInEmail">Email</label>
                    <input v-model="email" type="email" class="form-control" id="logInEmail" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="logInPassword">Password</label>
                    <input v-model="password" type="password" class="form-control" id="logInPassword" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Log In</button>
                <div class="inline-div float-right">
                    <a href="/sign-up">Sign Up</a>
                    |
                    <a href="">Forgot Password?</a>
                </div>
                <!-- <href type="button" class="btn btn-primary">Forgot Password?</button> -->
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
            this.$store.dispatch('user/logInUser', { 
                email, 
                password
                })
                .then(response => { 
                    // do nothing
                    })
                    .catch(
                    error => {
                        this.email = '';
                        this.password = '';
                        this.logInFailed = true;
                    })
        },
    }
}
</script>

<style scoped>
    #log-in {
        height: 80vh;
        padding-top: 20vh;
    }
</style>