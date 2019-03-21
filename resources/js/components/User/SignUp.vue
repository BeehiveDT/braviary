<template>
    <!-- <div id="sign-up"> -->
        <div class="container" id="sign-up">
            <div class="mx-auto col-lg-6 offset-lg-3 col-md-12">
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <label for="SignUpName">Name</label>
                        <input v-model="userName" @input="checkForm()" type="text" class="form-control" id="SignUpName" placeholder="Name">
                    </div>
                    <div class="alert alert-warning" v-if="errorResponse.name.failed">
                        <span> {{ errorResponse.name.errorMessage }} </span>
                    </div>
                    <div class="form-group">
                        <label for="SignUpEmail">Email</label>
                        <input v-model="email" @input="checkForm()" type="email" class="form-control" id="SignUpEmail" placeholder="Email">
                    </div>
                    <div class="alert alert-warning" v-if="errorResponse.email.failed">
                        <span> {{ errorResponse.email.errorMessage }} </span>
                    </div>
                    <div class="form-group">
                        <label for="SignUpPassword1" >Password</label>
                        <input v-model="password1" @input="checkPassword()" type="password" class="form-control" id="SignUpPassword1" placeholder="Password">
                    </div>
                    <div class="alert alert-warning" v-if="errorResponse.password.failed">
                        <span> {{ errorResponse.password.errorMessage }} </span>
                    </div>
                    <div class="alert alert-warning" v-if="invalidPassword">
                        <span> {{ passwordCheck }} </span>
                    </div>
                    <div class="form-group">
                        <label for="SignUpPassword2">Re-enter Password</label>
                        <input v-model="password2" @input="checkForm()" type="password" class="form-control" id="SignUpPassword2" placeholder="Re-enter Password">
                        <!-- <input v-model="password2" type="password" class="form-control" id="SignUpPassword2" placeholder="Re-enter Password"> -->
                    </div>
                    <div class="alert alert-warning" v-if="!areMatched">
                        <span> Passwords must be the same </span>
                    </div>
                    <!-- <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Show Password</label>
                    </div> -->
                    <button type="submit" class="btn btn-primary" :disabled="disableSubmit">Submit</button>
                </form>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import axios from "axios";
const API="http://braviary.test/api";
const errorResponse = {
                'name': {
                    failed: false,
                    errorMessage: ''
                },
                'email': {
                    failed: false,
                    errorMessage: ''
                },
                'password': {
                    failed: false,
                    errorMessage: ''
                }
            }

export default {
    name: 'sign-up',
    data(){
        return{
            userName: '',
            email: '',
            password1: '',
            password2: '',
            errorResponse,          // from API
            invalidPassword: false, // password doesn't meet requirement
            passwordCheck: '',          // 
            areMatched: true,
            disableSubmit: true
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

            this.$store.dispatch('user/signUpSubmit', { 
                email, 
                password,
                name
                })
                .then(response => { 
                    // do nothing
                })
                .catch(error => {
                    let properties = ['email', 'name', 'password']
                    
                    for(let property of properties){
                        if (error.hasOwnProperty(property)){
                            let current = this.errorResponse[property]
                            current.failed = true;
                            current.errorMessage = error[property][0];
                        }
                    }
                })
        },
        checkNoneEmptyString(str){
            return !(str === '')
        },
        checkName(){ 
            return this.checkNoneEmptyString(this.name)
        },
        checkEmail(){
            return this.checkNoneEmptyString(this.email)
        },
        checkPassword(){

            this.invalidPassword = false;

            let password = this.password1;

            let lowerCaseLetters = /[a-z]/g;
            let upperCaseLetters = /[A-Z]/g;
            let numbers = /[0-9]/g;

            if (password.length < 7) {
                this.invalidPassword = true;
                this.passwordCheck = "Need at least six characters"
            } else if (!password.match(upperCaseLetters)) {
                this.invalidPassword = true;
                this.passwordCheck = "Need at least one uppercase letter"
            } else if (!password.match(lowerCaseLetters)) {
                this.invalidPassword = true;
                this.passwordCheck = "Need at least one lowercase  letter"
            } else if (!password.match(numbers)) {
                this.invalidPassword = true;
                this.passwordCheck = "Need at least one number"
            }

            if (this.password2.length > 0) {
                this.checkPasswords();
            }

        },
        checkPasswords(){
            if(this.checkNoneEmptyString(this.password1) && this.checkNoneEmptyString(this.password2)){
                this.areMatched = (this.password1 === this.password2);
                return this.areMatched;
            }else{
                return false
            }
        },
        checkForm(){
            if(this.checkPasswords() && this.checkName() && this.checkEmail()){
                this.disableSubmit = false;
            }else{
                this.disableSubmit = true;
            }
        }
    },
    // created: function () {
    //     console.log("UserToken")
    //     console.log(this.$store.state.homeMessage);
    // }
}
</script>

<style scoped>
    #sign-up {
        height: 90vh;
        padding-top: 10vh;
    }
</style>