import {
      GET_ADS, GET_ADS_VIP, ERROR, CURSOR, LOADER
} from "./types";
import axios from "axios";

export const getAds = (cursor) => dispatch => {
      let api = 'https://ru.turbo.az/api/v1/autos'
      if (cursor) {
            api += `?cursor=${cursor}`
      }
      console.log(api)
      axios.get(api, {
            headers: {
                  Accept: 'application/json'
            }
      })
          .then(data => {
                console.log(data.data.ads[data.data.ads.length - 1].cursor)
                dispatch({type: GET_ADS, payload: data.data.ads})
                dispatch({type: GET_ADS_VIP, payload: data.data.vips})
                dispatch({type: CURSOR, payload: data.data.ads[data.data.ads.length - 1].cursor})
                dispatch({type: LOADER, payload: false})
                dispatch({type: ERROR, payload: ''})
          })
          .catch(
              error => {
                    console.log(error)
                    dispatch({type: LOADER, payload: false})
                    dispatch({type: ERROR, payload: error.message || 'Unexpected Error!!!'})
              }
          )
};
