<template>
    <div id="log-in">
        <div class="container">
            <h2>{{ logInMessage }}</h2>
            <h2>email, password</h2>
            <form>
                <div class="form-group">
                    <label for="InputEmail1">Email address</label>
                    <input type="email" class="form-control" id="InputEmail1" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="InputPassword">Password</label>
                    <input type="password" class="form-control" id="InputPassword" placeholder="Password">
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
    name: 'logIn',
    computed: {
        logInMessage(){
            return this.$store.getters.logInMessage;
        }
    }
}
</script>