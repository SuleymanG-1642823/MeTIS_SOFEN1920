import {Vue, Component, Prop} from 'vue-property-decorator'
import UserMatch from '../../types/matching/userMatch'
import Profile from '../../types/profile'
import axios from 'axios'
import api from '@/helpers/Api'
import Skill from '~/types/skill'
import User from '~/types/user'
import Invite, { INVITE_STATUS } from '~/types/invite'

/*
    This component is created for displaying a user that is recommended to a project's profile. 
*/
@Component
export default class RecommendedUserCard extends Vue{
    mNumfullStars: number = 0;
    mHalfStar: boolean = false;
    mNumEmptyStars: number = 5;
    mMaxStars: number = 5;
    mUserSkill: Skill[] = [];
    mUser: User|null = null;
    mInviteSent: boolean = false;

    @Prop(Object) userMatch: UserMatch
    @Prop(Object) profile: Profile

    created(){
        // calculate how many of what stars to show for rating
        // rating is matchingPercentage represente with stars
        this.mNumfullStars = this.fullStars();
        this.mHalfStar = this.halfStar();
        this.mNumEmptyStars = this.emptyStars();

        if (this.mHalfStar === true && this.mNumEmptyStars >= 1){
            this.mNumEmptyStars--;
        }

        return new Promise<void>(async resolve => {
            try {
                // get skills
                this.mUserSkill = await this.getUserSkills();
    
                /* 
                    User object is partial (only contains some of the  user information because
                    the matching algorithm only processes and returns the necessary information
                    like project, profile and user id's but not trivial information like user
                    city and zip code). Request whole user object.
                */
                this.mUser = await this.getUserObj();
            } catch (err) {
                console.log(`Error while requesting information for RecommendedUserCard with user id: ${this.userMatch.user.id}: ${err.response.data}`)
            }
            
        });
    }

    fullStars(){
        return Math.floor(this.userMatch.matchingPercentage * (this.mMaxStars/100));
    }

    halfStar(){
        let remainderFullstars = this.userMatch.matchingPercentage * (this.mMaxStars/100) - this.fullStars();
        if (remainderFullstars >= 0.5){
            return true;
        }
        else{
            return false;
        }
    }

    emptyStars(){
        return this.mMaxStars - Math.floor(this.userMatch.matchingPercentage * (this.mMaxStars/100));
    }

    getUserSkills(){
        return new Promise<Skill[]>(async (resolve: any, reject: any) => {
            try {
                // Get all skills of user
                let url = api(`users_skills/${this.userMatch.user.id}`)
                const response = await this.$axios.get(url)
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting user skills for user ${this.userMatch.user.id}: ${err.response.data}`)
                reject();
            }
        });
    }

    getUserObj(){
        return new Promise<User>(async (resolve: any, reject: any) => {
            try {
                // Get all skills of user
                let url = api(`users/${this.userMatch.user.id}`)
                const response = await this.$axios.get(url)
                resolve(response.data.user);
            } catch (err) {
                console.log(`Error while requesting user object for user ${this.userMatch.user.id}: ${err.response.data}`)
                reject();
            }
        });
    }

    /**
     * TODO: insert <router-link> in the vue file to the chat page with the correct id.
     */
    goToChatPage(chatPartnerID: number){
        alert('TODO: go to chatpage')
    }

    /**
     * Invites user: create and send a new invite to backend.
     * @param userID: id of user to invite.
     */
    inviteUser(userID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try {
                // the if check must happen, es-lint is complaining that number|null is not assignable to number
                if (this.userMatch.user.id !== null){
                    // Create an invite
                    let newInvite: Invite = {
                        id: null,
                        sender_id: this.$store.state.auth.user.id,
                        receiver_id: this.userMatch.user.id, 
                        profile_id: this.profile.id,
                        status: INVITE_STATUS.PENDING,
                        sent_count: 0,
                        max_count: 0,
                        last_sent_at: ''
                    }
    
                    // send post request for registering invite
                    let url = api(`invites/`)
                    await this.$axios.post(url, {invite: newInvite});

                    // successfully sent invitation, set member for invitation sent
                    this.mInviteSent = true;
                    resolve();
                }
                else{
                    throw Error('User id in usermatch is null');
                }
            } catch (err) {
                console.log(`Error while sending invitation for user ${this.userMatch.user.id}: ${err.response.data}`)
                reject();
            }
        });
    }

}
