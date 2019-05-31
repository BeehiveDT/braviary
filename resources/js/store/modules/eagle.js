import axios from "axios";
import { config as BraviaryConfig } from '../../config';

// initial state
const state = {
    eaglesList: [],
    eaglesPerPage: '10',
    eaglesListPaginated: [],
    eaglesCurrent: [],
    eagleIDs: [],
    eaglesCurrentPageNum: 0,
    totalPageNums: 1
}
  
// getters
const getters = {
    
}
  
// actions
const actions = {
    // ------------------------------------------------------------------
    // Eagles
    // ------------------------------------------------------------------
    retrieveEaglesList({ commit, dispatch, rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagles_List');

            let _eaglesPerPage = payload.eaglesPerPage;
            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _successResponse = response.data;

                // 抓老鷹
                let _myEagles = _successResponse.eagles.my_eagles;
                _myEagles.forEach(eagle => { eagle.view_only = false });
                let _linkEagles = _successResponse.eagles.link_eagles;
                _linkEagles.forEach(eagle => { eagle.view_only = true });
                let _eaglesList = _myEagles.concat(_linkEagles);
                
                let _payload = {
                    eaglesList: _eaglesList,
                    eaglesPerPage: _eaglesPerPage
                }

                commit('updateEaglesList', _payload);
                commit('updateEaglesListPaginated', _eaglesPerPage);
                dispatch('retrieveCurrent', { offset: 0})
                .then(response => {
                    // do nothing
                })
                .catch(error => {
                    // do nothing
                })
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    },
    retrieveCurrent({commit, rootState}, payload){
        return new Promise((resolve, reject) => {
            // get list of ids
            let _ids = [];
            let _next = state.eaglesListPaginated[state.eaglesCurrentPageNum+payload.offset];
            _next.forEach(e => _ids.push(e.id));
            _ids = _ids.toString();

            // set up axios get request
            let _params = {eagles: _ids};
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token, _params);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagles_Feathers');

            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _object = response.data
                for (let _id in _object) {
                    if (_object.hasOwnProperty(_id)) {
                      // Do things here
                      let _eagle = state.eaglesListPaginated[state.eaglesCurrentPageNum+payload.offset].find(eagle => eagle.id === parseInt(_id));
                      _eagle.lastTenFeathers = _object[_id];
                    }
                }
                commit('updateEaglesCurrent', payload.offset);
                resolve(response)
            })
            .catch(error=>{
                reject(error)
            })
        })
        
    },
    // ------------------------------------------------------------------
    // Eagle
    // ------------------------------------------------------------------
    createEagle({ dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Create_Eagle');
            
            axios.post(_url, payload, _authorizedHeader)
            .then(response=> {
                // // success
                dispatch('retrieveEaglesList', {eaglesPerPage: state.eaglesPerPage})
                // this.dispatch('zookeeper/retrieveEaglesList', {eaglesPerPage: this.eaglesPerPage});
                resolve(response);
            })
            .catch(error=>{
                // // creation failed
                reject(error);
            })
        })
    },
    updateEagle({dispatch, rootState}, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Update_Eagle', payload);
            let _eagle = payload.eagle;

           // POST request to update eagle
           axios.post(_url, _eagle, _authorizedHeader)
           .then(response=> {
                dispatch('retrieveEaglesList', {eaglesPerPage: state.eaglesPerPage})
               this.dispatch('zookeeper/retrieveEaglesList', {eaglesPerPage: state.eaglesPerPage});
               resolve(response);
           })
           .catch(error=>{
               reject(error);
           })
        })
    },
    deleteEagle({ dispatch, rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Delete_Eagle', payload);

            axios.delete(_url, _authorizedHeader)
            .then(response=> {
                // success
                dispatch('retrieveEaglesList', {eaglesPerPage: state.eaglesPerPage});
                this.dispatch('zookeeper/retrieveEaglesList', {eaglesPerPage: state.eaglesPerPage});
                resolve(response);
            })
            .catch(error=>{
                reject(error);
            })
        })
    },
    retrieveFeathers({rootState}, payload){
        return new Promise((resolve, reject) => {

            let _payload = {
                id: payload.id
            }
            let _params = {
                limit: payload.limit,
                skip: payload.skip
            }
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token, _params);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_Feathers', _payload);

            axios.get(_url, _authorizedHeader)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })

        })
    },
    // ------------------------------------------------------------------
    // Eagle Viewer
    // ------------------------------------------------------------------
    addEagleViewer({ rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Add_Eagle_Viewer', payload);
            let _email = payload.email;

            axios.post(_url, _email, _authorizedHeader)
            .then(response => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    },
    getEagleViewers({ rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_Viewers', payload);

            axios.get(_url, _authorizedHeader)
            .then(response => {
                let emails = response.data
                resolve(emails)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
        })
    },
    deleteEagleViewer({ rootState}, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Delete_Eagle_Viewer', payload);

            axios.post(_url, payload.body, _authorizedHeader)
            .then(response => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        })
    },    

}
  
// mutations
const mutations = {
    updateEaglesList(state, payload){
        let _eaglesList = payload.eaglesList;
        _eaglesList.sort(function(eagle1, eagle2) {
            // Descending order
            return eagle2.id - eagle1.id;
        });
        state.eaglesList = _eaglesList;
    },
    // Eagles page pagination
    updateEaglesCurrent(state, offset){
        state.eaglesCurrentPageNum += offset;
        state.eaglesCurrent = state.eaglesListPaginated[state.eaglesCurrentPageNum];
    },
    updateEaglesListPaginated(state, eaglesPerPage){
        // set current to first page
        state.eaglesCurrentPageNum = 0;
        // set eagles per page
        state.eaglesPerPage = eaglesPerPage;
        // empty eagles paginated 2d array
        state.eaglesListPaginated = [];
        // clone eagles
        let _eaglesList = state.eaglesList.slice();

        if(eaglesPerPage == 'all'){
            state.eaglesListPaginated = _eaglesList;
            state.totalPageNums = 1;
        }else{
            while(_eaglesList.length) state.eaglesListPaginated.push(_eaglesList.splice(0,eaglesPerPage));
            state.totalPageNums = state.eaglesListPaginated.length;
        }
    },
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  