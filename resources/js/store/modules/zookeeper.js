import axios from "axios";
import { config as BraviaryConfig } from '../../config';

// initial state
const state = {
    zookeeperUsersList: [],
    zookeeperEaglesList: [],
    eaglesPerPage: '10',
    eaglesListPaginated: [],
    eaglesCurrent: [],
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
    retrieveEaglesList({commit, dispatch, rootState}, payload){	
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Zookeeper_Eagle_List');

            let _eaglesPerPage = payload.eaglesPerPage;
            axios.get(_url, _authorizedHeader)
            .then(response => {
                // 抓老鷹
                let _zookeeperEaglesList = response.data;
                let _payload = {
                    zookeeperEaglesList: _zookeeperEaglesList,
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

                resolve(_zookeeperEaglesList);
            })	
            .catch((error) => {
                
                reject(error);	
            });	              
        })
    },
    retrieveCurrent({commit, rootState}, payload){
        return new Promise((resolve, reject) => {
            let _page = state.eaglesCurrentPageNum + payload.offset

            let _ids = [];
            let _next = state.eaglesListPaginated[_page];
            _next.forEach(e => _ids.push(e.id));
            _ids = _ids.toString();

            // get eagles feathers
            let _params = {eagles: _ids};
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token, _params);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagles_Feathers');

            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _object = response.data;
                for (let _id in _object){
                    if(_object.hasOwnProperty(_id)){
                        let _eagle = state.eaglesListPaginated[_page].find(eagle => eagle.id === parseInt(_id));
                        _eagle.lastTenFeathers = _object[_id];
                    }
                }
                commit('updateEaglesCurrent', payload.offset);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
        })
    },
    // ------------------------------------------------------------------
    // Users
    // ------------------------------------------------------------------
    retrieveUsersList({commit, rootState, state}){	
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Zookeeper_User_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {	
                let _zookeeperUsersList = response.data;
                commit('updateUsersList', _zookeeperUsersList);
                resolve(_zookeeperUsersList);
            })	
            .catch((error) => {	
                reject(error);	
            });	              
        })
    },
}
  
// mutations
const mutations = {
    // ------------------------------------------------------------------
    // Users
    // ------------------------------------------------------------------
    updateUsersList(state, zookeeperUsersList){
        state.zookeeperUsersList = zookeeperUsersList;
    },
    // ------------------------------------------------------------------
    // Eagles
    // ------------------------------------------------------------------
    updateEaglesList(state, payload){
        let _zookeeperEaglesList = payload.zookeeperEaglesList;
        _zookeeperEaglesList.sort(function(eagle1, eagle2) {
            // Descending order
            return eagle2.id - eagle1.id;
        });
        state.zookeeperEaglesList = _zookeeperEaglesList;
    },
    updateEaglesCurrent(state, offset){
        state.eaglesCurrentPageNum += offset;
        state.eaglesCurrent = state.eaglesListPaginated[state.eaglesCurrentPageNum];
    },
    // Eagles page pagination
    // updateEaglesPageOffset(state, offset){
    //     state.eaglesCurrentPageNum += offset;
    //     state.eaglesCurrent = state.eaglesListPaginated[state.eaglesCurrentPageNum];
    // },
    updateEaglesListPaginated(state, eaglesPerPage){
        // set current to first page
        state.eaglesCurrentPageNum = 0;
        // set eagles per page
        state.eaglesPerPage = eaglesPerPage;
        // empty eagles paginated 2d array
        state.eaglesListPaginated = [];
        // clone eagles
        let _eaglesList = state.zookeeperEaglesList.slice();

        if(eaglesPerPage == 'all'){
            state.eaglesListPaginated = _eaglesList;
            state.totalPageNums = 1;
        }else{
            while(_eaglesList.length) state.eaglesListPaginated.push(_eaglesList.splice(0, eaglesPerPage));
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
  