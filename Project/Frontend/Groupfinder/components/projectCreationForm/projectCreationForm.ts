import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

@ Component({
    components: {profileForm}
})
export default class projectCreationForm extends Vue {
    data(){
        return{
            form: {
                projectName: "",
                pitch: "",
                category: null
            },
            categories: [{text:"Select One", value: null}, "Website", "Native Application", "Smartphone Application"],
        }
    }
    components: {
        'profileFormComponent': profileForm
    }
}

