import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';
import api from '@/helpers/Api';
import axios from 'axios';

@Component({
    components: {
    }
})
export default class SocialMedia extends Vue {
    // PROPS
    @Prop({required: true}) readonly social_media_prop: any[]|null;
    @Prop({type: Function, required: true}) readonly set_links: Function;

    // DATA
    private links: any[] = [
        {prefix: "https://facebook.com/", suffix: "", state: false},
        {prefix: "https://twitter.com/", suffix: "", state: false},
        {prefix: "https://linkedin.com/", suffix: "", state: false},
        {prefix: "https://github.com/", suffix: "", state: false},
    ]

    // LIFECYCLE HOOKS
    private mounted(){
        if (this.social_media_prop){
            this.links = this.social_media_prop;
        }
    }
    // METHODS
    /**
     * This method will be called when a user fills in a url.
     * This method will call a parent's component to update its state.
     */
    onSuffixChange(): void {
        this.set_links(this.links);
    }

    /**
     * This method will be called when a user toggles the select box
     * and remove user's url input if the checkbox was being unchecked.
     * @param prefix the prefix for which the select box is toggled.
     */
    onSelectChange(prefix: string): void {
        for (let i = 0; i < this.links.length; i++){
            if (this.links[i].prefix.localeCompare(prefix) == 0){
                if (! this.links[i].state){
                    this.links[i].suffix = "";
                    this.set_links(this.links);
                }
            }
        }
    }
}