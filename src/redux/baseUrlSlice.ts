import { createSlice } from "@reduxjs/toolkit";
import { isPropEmpty } from "../shared/utilfunctions";
import axios from "axios";

function getActiveUrlFromLs(){
    return localStorage.getItem('activeBaseUrl');
}

function getOriginalUrlFromLs(){
    return localStorage.getItem('originalBaseUrl');
}

function setActiveUrlFromLs(url:string){
    return localStorage.setItem('activeBaseUrl', url);
}

function setOriginalUrlFromLs(url:string){
    return localStorage.setItem('originalBaseUrl', url);
}


let activeBaseUrl = getActiveUrlFromLs();
let originalBaseUrl = getOriginalUrlFromLs();
const {REACT_APP_API_URL} = process.env;
let envDefaultBaseUrl = new URL(REACT_APP_API_URL as string);
console.log(process.env.REACT_APP_API_URL, envDefaultBaseUrl)
const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL as string,
});

function getInitialState(){
    console.log('called')
    if(isPropEmpty(activeBaseUrl) && !isPropEmpty(originalBaseUrl)){
        activeBaseUrl = originalBaseUrl;
        setActiveUrlFromLs(activeBaseUrl as string);
        
    }else if(isPropEmpty(activeBaseUrl) && isPropEmpty(originalBaseUrl)){
        activeBaseUrl = originalBaseUrl = envDefaultBaseUrl?.href;
        setActiveUrlFromLs(activeBaseUrl as string);
        setOriginalUrlFromLs(originalBaseUrl as string);
    }

    return {baseUrl: activeBaseUrl};
}

const baseUrlSlice = createSlice({
    name: 'baseUrl',
    initialState: getInitialState(),
    reducers: {
        changeBaseUrl: (state, action)=>{
            state.baseUrl = action.payload
            activeBaseUrl = action.payload
            setActiveUrlFromLs(action.payload)
            axiosInstance.defaults.baseURL = activeBaseUrl as string;
        }
    }
})

export const { changeBaseUrl } = baseUrlSlice.actions;
export {axiosInstance};
export default baseUrlSlice.reducer