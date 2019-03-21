import axios from "axios";
import { config as BraviaryConfig } from '../../config';

// initial state
const state = {
    eagleList: []
}
  
// getters
const getters = {
    
}
  
// actions
const actions = {
    // ------------------------------------------------------------------
    // Eagles
    // ------------------------------------------------------------------
    retrieveEagleList({commit, state, rootState}){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _successResponse = response.data["Success"];
                let _linkEagles = _successResponse.eagles.link_eagles;
                let _myEagles = _successResponse.eagles.my_eagles;
                let _eagleList = _linkEagles.concat(_myEagles);
                commit('updateEagleList', _eagleList);
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    },
    // ------------------------------------------------------------------
    // Eagle
    // ------------------------------------------------------------------


}
  
// mutations
const mutations = {
    updateEagleList(state, eagleList){
        eagleList.sort(function(eagle1, eagle2) {
            // Descending order
            return eagle2.id - eagle1.id;
        });
        state.eagleList = eagleList;
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  