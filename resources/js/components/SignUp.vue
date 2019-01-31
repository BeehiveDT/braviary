<template>
    <div id="sign-up">
        <div class="container">
            <div class="alert alert-warning" v-if="signUpFailed">
                <span>Please try again</span>
            </div>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="SignUpName">Name</label>
                    <input v-model="userName" type="text" class="form-control" id="SignUpName" placeholder="Name">
                    <span> {{ userName }} </span>
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
            userName: '',
            email: '',
            password1: '',
            password2: '',
            signUpFailed: false
        }
    },
    computed: {
        signUpMessage(){
            return this.$store.getters.signUpMessage;
        }
    },
    methods: {
        submit(){
            let email = this.email;
            let password = this.password1;
            let name = this.userName;

            this.$store.dispatch('signUpSubmit', { 
                email, 
                password,
                name
                })
                .then(response => { 
                    // do nothing
                    })
                    .catch(
                    error => {
                        // console.log(`signup failed RAWR`);
                        // console.log(error.message.email);
                        this.signUpFailed = true;
                    })
        },
    },
    // created: function () {
    //     console.log("UserToken")
    //     console.log(this.$store.state.homeMessage);
    // }
}
</script>