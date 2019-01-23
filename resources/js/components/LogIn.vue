<template>
    <div id="log-in">
        <div class="container">
            <h2>{{ logInMessage }}</h2>
            <h2>email, password</h2>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="LogInEmail1">Email</label>
                    <input v-model="email" type="email" class="form-control" id="LogInEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="LogInPassword">Password</label>
                    <input v-model="password" type="password" class="form-control" id="LogInPassword" placeholder="Password">
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Show Password</label>
                </div>
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
            email: 'abc',
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
	            email: "xxx@beehivedt.com",
	            password: "1q2w#E$R"
            })
            .then(response=>{
                console.log(response);
            })
        },
    }
}
</script>