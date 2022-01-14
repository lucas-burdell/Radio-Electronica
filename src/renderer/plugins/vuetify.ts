import Vue from 'vue'
import Vuetify, { UserVuetifyPreset } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts: Partial<UserVuetifyPreset> = {
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#4F628E',
                secondary: '#294F6D',
                accent: '#777',
                error: '#E7403B',
                warning: '#FC9307',
                info: '#04AFC5',
                success: '#4DA852',
                border: '#e7e7e7',
                offwhite: '#f5f5f5',
                gray: '#717171',
                text: '#2a2a2a'
            }
        }
    }
}

export const vuetify = new Vuetify(opts);
export default vuetify;