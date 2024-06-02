import {  createSlice } from "@reduxjs/toolkit";

const init = {
    tost:{
        display:false,
        mas: "done the task",
        icon: "done",
        color:"bg-red-400",
        time:""
    },
    track:{
        status: false,
        userdata: null,
    },
    phoneid:{
        ids:""
    },
    password:{
        visual:false
    },
    updatetodolist:{
        runer:false
    },
    voiceis:{
        pekosa:"Microsoft David - English (United States)",
        speakingnow:false,
        menubar:false
    },
    sharecompo:{
        display:false,
        updater: true
    }
}

export const Ultraslice = createSlice({
    name:'nodddne',
    initialState: init,
    reducers:{
        storelogin(state, action){
            state.track.status = true,
            state.track.userdata = action.payload
        },
        storelogout(state){
            state.track.status = false,
            state.track.userdata = null
        },

        setphoneid(state, action){
            state.phoneid.ids = action.payload
        },

        showtost(state, action){
            state.tost.display = true
            state.tost.mas = action.payload.mass
            state.tost.icon = action.payload.icon
            state.tost.color = action.payload.bg
            state.tost.time = action.payload.time
        },
        delettost(state){
            state.tost.display = false
        },

        setvisualtartus(state, action){
            state.password.visual = action.payload
        },

        updatelistto(state){
            state.updatetodolist.runer = !state.updatetodolist.runer
        },

        changevoice(state, action){
            state.voiceis.pekosa = action.payload
        },
        updatespeaking(state,action){
            state.voiceis.speakingnow = action.payload
        },
        menuopener(state, action){
            if (action.payload) {
                state.voiceis.menubar = action.payload
            }else{
                state.voiceis.menubar = !state.voiceis.menubar
            }
        },

        changeshare(state, action){
            state.sharecompo.display = action.payload
        },
        updatebycreateone(state){
            state.sharecompo.updater = !state.sharecompo.updater
        }

    }
})

export const {
    storelogin, 
    storelogout, 
    showtost, 
    delettost, 
    setphoneid, 
    setvisualtartus,
    updatelistto,
    changevoice,
    updatespeaking,
    menuopener,
    changeshare,
    updatebycreateone
} = Ultraslice.actions

export default Ultraslice.reducer