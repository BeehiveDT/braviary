<template>
    <div id="home">
        <h1>{{ msg }}</h1>
        <p>
        For a guide on how to configure / customize this project,<br>
        check out the
        <a href="https://github.com/BeehiveDG/braviary" target="_blank" rel="noopener">GitHub page</a>.
        </p>
    </div>
</template>

<script>
export default {
    name: 'home',
    data(){
        return{
            msg: 'Welcome to Your Braviary App'
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>