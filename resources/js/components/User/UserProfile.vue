<template>
    <div class="container" id="log-in">
        <div class="mx-auto col-lg-6 offset-lg-3 col-md-12">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="userName">User Name</label>
                    <input v-model="userName" @input="checkForm()" type="text" class="form-control" id="logInPassword" placeholder="Password">
                </div>
                <div class="alert alert-warning" v-if="errorResponse.name.failed">
                    <span> {{ errorResponse.name.errorMessage }} </span>
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
                </div>
                <div class="alert alert-warning" v-if="!areMatched">
                    <span> Passwords must be the same </span>
                </div>

                <button type="submit" class="btn btn-primary" :disabled="disableSubmit">Update</button>
                <!-- use button below to test error message display -->
                <!-- <button type="submit" class="btn btn-primary">Update</button> -->
            </form>
        </div>
    </div>
</template>

<script>
const errorResponse = {
                'name': {
                    failed: false,
                    errorMessage: ''
                },
                'password': {
                    failed: false,
                    errorMessage: ''
                }
            }

export default {
    name: 'logIn',
    data(){
        return {
            userName: this.$store.state.userName,
            password1: '',
            password2: '',
            invalidPassword: false, // password doesn't meet requirement
            disableSubmit: true,
            areMatched: true,
            errorResponse
        }
    },
    computed: {
    },
    methods: {
        submit(){
            let name = this.userName;
            let password = this.password1;

            this.$store.dispatch('updateUser', {
                name,
                password
            })
            .then(response => {
                // clear password fields
                this.password1 = '';
                this.password2 = '';
            })
            .catch(error => {
                // set error response message
                let properties = ['name', 'password'];
                
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
            if(this.checkPasswords() && this.checkName()){
                this.disableSubmit = false;
            }else{
                this.disableSubmit = true;
            }
        }
    }
}
</script>

<style scoped>
    #log-in {
        height: 80vh;
        padding-top: 20vh;
    }
</style>