// Load Component Page
import Home from './components/Home.vue';
import LogIn from './components/User/LogIn.vue';
import SignUp from './components/User/SignUp.vue';
import Eagles from './components/Eagles/Eagles.vue';
import UserProfile from './components/User/UserProfile.vue';
import AllEagles from './components/Zookeeper/AllEagles.vue';
import AllUsers from './components/Zookeeper/AllUsers.vue';

// Assign Page to paths
export const routes = [
    {
        path:'/',
        component: Home
    },
    {
        path:'/sign-up',
        name:'Sign Up',
        component: SignUp
    },
    {
        path: '/log-in',
        component: LogIn
    },
    {
        path: '/eagles',
        component: Eagles
    },
    {
        path: '/me',
        component: UserProfile
    },
    {
        path: '/zookeeper/eagles',
        component: AllEagles
    },
    {
        path: '/zookeeper/users',
        component: AllUsers
    }
];