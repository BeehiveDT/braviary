<template>
    <div id="sign-up">
        <div class="container">
            <h2>{{ signUpMessage }}</h2>
            <h2>email, password, name</h2>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="SignUpName">Name</label>
                    <input v-model="username" type="text" class="form-control" id="SignUpName" placeholder="Name">
                    <span> {{ username }} </span>
                </div>
                <div class="form-group">
                    <label for="SignUpEmail">Email</label>
                    <input v-model="email" type="email" class="form-control" id="SignUpEmail" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="SignUpPassword1">Password</label>
                    <input v-model="password1" type="password" class="form-control" id="SignUpPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="SignUpPassword2">Re-enter Password</label>
                    <input v-model="password2" type="password" class="form-control" id="SignUpPassword2" placeholder="Re-enter Password">
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
import axios from "axios";
const API="http://braviary.test/api";

export default {
    name: 'sign-up',
    data(){
        return{
            username: '',
            email: '',
            password1: '',
            password2: '',
        }
    },
    computed: {
        signUpMessage(){
            return this.$store.getters.signUpMessage;
        }
    },
    methods: {
        submit(){
            console.log(this.username);
            // axios.post(`${API}/auth/login`, {
	        //     email: this.email,
	        //     password: this.password
            // })
            // .then(response =>{
            //     // successful POST request
            //     const token = response.data.access_token;
            //     this.$store.commit('userLogIn', token);
            // })
            // .catch(error=>{
            //     // relog setup
            //     this.email = '';
            //     this.password = '';
            //     console.log("Sorry, we couldn't log you in. Please try again.")
            // })
        },
    },
    created: function () {
        console.log("UserToken")
        console.log(this.$store.state.homeMessage);
    }
}
</script>