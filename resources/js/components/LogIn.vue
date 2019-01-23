<template>
    <div id="log-in">
        <div class="container">
            <h2>{{ logInMessage }}</h2>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="LogInEmail1">Email</label>
                    <input v-model="email" type="email" class="form-control" id="LogInEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="LogInPassword">Password</label>
                    <input v-model="password" type="password" class="form-control" id="LogInPassword" placeholder="Password">
                </div>
                <!-- <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Show Password</label>
                </div> -->
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"
const API="http://braviary.test/api";

export default {
    name: 'logIn',
    data(){
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        logInMessage(){
            return this.$store.getters.logInMessage;
        }
    },
    methods: {
        submit(){
            axios.post(`${API}/auth/login`, {
	            email: this.email,
	            password: this.password
            })
            .then(response =>{
                // successful POST request
                const token = response.data.access_token;
                this.$store.commit('userLogIn', token);
            })
            .catch(error=>{
                // relog setup
                this.email = '';
                this.password = '';
                console.log("Sorry, we couldn't log you in. Please try again.")
            })
        },
    }
}
</script>