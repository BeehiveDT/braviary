<template>
    <div id="sign-up">
        <div class="container">
            <h2>{{ signUpMessage }}</h2>
            <h2>email, password, name</h2>
            <form>
                <div class="form-group">
                    <label for="InputName">Name</label>
                    <input type="text" v-model="fullname" class="form-control" id="InputName" placeholder="Enter Name">
                    <span> {{ fullname }} </span>
                </div>
                <div class="form-group">
                    <label for="InputEmail1">Email address</label>
                    <input type="email" class="form-control" id="InputEmail1" placeholder="Enter Email">
                </div>
                <div class="form-group">
                    <label for="InputPassword1">Password</label>
                    <input type="password" class="form-control" id="InputPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="InputPassword2">Re-enter Password</label>
                    <input type="password" class="form-control" id="InputPassword2" placeholder="Re-enter Password">
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
export default {
    name: 'sign-up',
    data(){
        return{
            fullname: 'abcde'
        }
    },
    computed: {
        signUpMessage(){
            return this.$store.getters.signUpMessage;
        }
    }
}
</script>