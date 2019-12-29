<template>
    <div id="profilewrapper" v-if="profile !== undefined">
        <span>{{ profile.name }}</span>
        <b-button variant="outline-dark" class="btn-invite" @click="invitePeople" v-if="!hasAssociatedUsers()">
            <i class="fas fa-user-plus"></i>
            Invite/find people
        </b-button>
        <div id="skills">
            <b-badge
                v-for="skill in profile.skills"
                :key="skill.name"
                variant="info"
                class="skill badge"
            >
                {{ skill.name }}
            </b-badge>
            <!--<i class="far fa-plus-square add-skill" @click="addSkill"></i>-->
        </div>
        <hr v-if="hasAssociatedUsers()">
        <div v-if="hasAssociatedUsers()" class="expandable-parent">
            <i
                v-if="!membersCollapsed"
                @click="onExpandCollapseClick()"
                v-b-toggle="collapseID"
                class="fas fa-angle-double-up expand-collapse"
            ></i>
            <i
                v-if="membersCollapsed"
                @click="onExpandCollapseClick()"
                v-b-toggle="collapseID"
                class="fas fa-angle-double-down expand-collapse"
            ></i>
            <div id="iconsOnCollapsed" v-if="membersCollapsed">
                <i
                    v-for="(applicant, index) in applicants"
                    :key="'applicantIcon-' + index"
                    class="far fa-user profile-user"
                >
                </i>
                <i
                    v-for="(member, index) in members"
                    :key="'memberIcon-' + index"
                    class="far fa-user profile-user"
                >
                </i>
                <i
                    v-for="(user, index) in invitees"
                    :key="'inviteeIcon-' + index"
                    class="far fa-user profile-user"
                >
                </i>
            </div>
            <router-link :to="'/findUsers/' + profile.project_id">
                <b-button variant="outline-dark" class="btn-invite">
                    <i class="fas fa-user-plus"></i>
                    Invite/find people
                </b-button>
            </router-link>
            <b-collapse :id="collapseID" class="mt-2">
              <ul id="users">
                    <li
                        v-for="(applicant, index) in applicants"
                        :key="'applicant-' + index"
                    >
                        <div class="col1">
                            <i class="far fa-user profile-user"></i>
                            <span>{{ applicant.user.first_name + ' ' + applicant.user.last_name }}</span>
                        </div>
                        <div class="col2">
                            <i class="far fa-comment msg" @click="goToChatPage(applicant.user.id)"></i>
                        </div>
                        <div class="col3">
                            applicant
                            <i
                                class="far fa-file-alt"
                                v-if="applicant.application.answers !== undefined"
                                @click="showApplicationAnswers(applicant.application.answers, applicant.user.first_name + ' ' + applicant.user.last_name)"
                            ></i>
                        </div>
                        <div class="col4">
                            <b-button variant="light" class="user-button decline" @click="acceptApplication(applicant.application.id)">
                                <i class="fas fa-check"></i>
                                accept
                            </b-button>
                        </div>
                        <div class="col5">
                            <b-button variant="light" class="user-button decline" @click="declineApplication(applicant.application.id)">
                                <i class="fas fa-times"></i>
                                decline
                            </b-button>
                        </div>
                    </li>
                    <li
                        v-for="(invitee, index) in invitees"
                        :key="'invitee-' + index"
                    >
                        <div class="col1">
                            <i class="far fa-user profile-user"></i>
                            <span>{{ invitee.user.first_name + ' ' + invitee.user.last_name }}</span>
                        </div>
                        <div class="col2">
                            <i class="far fa-comment msg" @click="goToChatPage(invitee.user.id)"></i>
                        </div>
                        <div class="col3">
                            invited
                        </div>
                        <div class="col4">
                        </div>
                        <div class="col5">
                            <b-button variant="light" class="user-button decline" @click="cancelInvitation(invitee.invite.id)">
                                <i class="fas fa-times"></i>
                                cancel
                            </b-button>
                        </div>
                    </li>
                    <li
                        v-for="(user, index) in members"
                        :key="'member-' + index"
                    >
                        <div class="col1">
                            <i class="far fa-user profile-user"></i>
                            <span>{{ user.first_name + ' ' + user.last_name }}</span>
                        </div>
                        <div class="col2">
                            <i class="far fa-comment msg" @click="goToChatPage(user.id)"></i>
                        </div>
                        <div class="col3">
                            member
                        </div>
                        <div class="col4">
                        </div>
                        <div class="col5">
                            <b-button variant="light" class="user-button decline" @click="removeMember(user.id)">
                                <i class="fas fa-times"></i>
                                remove
                            </b-button>
                        </div>
                    </li>
              </ul>
            </b-collapse>
        </div>
        <b-modal
            id="answers-modal"
            v-model="showAnswers"
            centered
            ok-only
            size="lg"
            :title="modalTitle"
        >
            <b-card
                v-for="(answer, index) in modalAnswers"
                :key="'modalAnswer-' + index"
                bg-variant="light"
                :header="answer.question"
                class="text-center">
                <b-card-text>{{ answer.answer }}</b-card-text>
            </b-card>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./ProjectProfileOwner.ts">
</script>

<style scoped>

#profilewrapper{
    border: 1px solid black;
    margin: 10px 0 0 0;
    padding: 8px;
}

.apply-checkbox{
    float: right;
}

.skill.badge{
    margin: 0 4px 0 4px;
    font-size: 0.9rem;
    font-weight: lighter;
}

div#skills{
    margin-top: 10px;
}

i.add-skill{
    display: inline-block;
}

hr{
    border-top-color: black;
    margin-left: -8px;
    margin-right: -8px;
    width: inherit;
}

i.expand-collapse{
    cursor: pointer;
    font-size: 1.5rem;
}

ul#users{
    list-style-type: none;
    padding: 8px 0 0 0;
}

ul#users > li{
    margin: 8px 0 8px 0;
    display: grid;
    grid-template-columns: minmax(max-content, 1fr) max-content 1fr 1fr 1fr;
}

div.col3, div.col4, div.col5{
    justify-self: end;
}

i.profile-user, i.add-skill{
    font-size: 1.5rem;
}

ul#users span{
    margin: 0 4px 0 4px;
}

ul#users div > i{
    font-size: 1.5rem;
}

i.msg{
    cursor:pointer;
    font-size: 1.5rem;
}

div#iconsOnCollapsed{
    display: inline;
}

div#iconsOnCollapsed i{
    margin-left: 8px;
}

.btn-invite{
    float: right;
    padding: 4px 8px 4px 8px;
    margin-top: -3px;
}

.btn-invite > i{
    margin-right: 4px;
}

div.expandable-parent{
    overflow: auto;
    padding: 4px;
}

i.user-row{
    font-size: 1.5rem;
}

</style>
