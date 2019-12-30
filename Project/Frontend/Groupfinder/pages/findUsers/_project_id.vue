<template>
    <div id="root-div">
        <strong id="error-project" v-if="project === null">
            The requested project could not be found.
        </strong>
        <div id="wrapper" v-if="project !== null">
            <h1 class="title invite">Invite users for project: {{ project.name }}</h1>
            <div class="invite" v-if="showInvites">
                <div class="sent-invites">
                    <div class="profile-invites" v-for="profile in project.profiles" :key="profile.id">
                        <h1>{{ profile.name }}</h1>
                        <strong class="no-invites" v-if="profileInvites[profile.id].length === 0">
                            There are no invites sent for this profile
                        </strong>
                        <b-list-group>
                            <b-list-group-item
                                v-for="(userInvite, index) in profileInvites[profile.id]"
                                :key="index"
                            >
                                {{ userInvite.user.first_name + ' ' + userInvite.user.last_name }}
                                <b-button
                                    size="sm"
                                    variant="outline-danger btn-cancel float-right"
                                    @click="cancelInvitation(userInvite.invite.id)"
                                >
                                    Cancel
                                </b-button>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
                <div class="invite-form">
                    <b-form-select v-model="selectedOption" :options="selectionOptions"></b-form-select>
                    <b-button variant="outline-dark btn-profile">Invite</b-button>
                </div>
            </div>
            <h1 class="title recommended">Recommended users</h1>
            <RecommendedUsers :projectID="project.id" />
        </div>
    </div>
</template>

<script lang="ts" src="./findUsers.ts">

</script>

<style scoped>

div#wrapper{
    width: 100%;
    height: 100%;
}

strong#error-project{
    font-size: 1.4rem;
    color: red;
    display: block;
    width: 100%;
    text-align: center;
}

strong.no-invites{
    color: rgba(0, 0, 0, 0.5);
}

h1.title{
    margin: 24px 0 16px 0;
}

div.invite{
    margin-bottom: 16px;
}

div.invite > div{
    padding: 8px;
}

div.sent-invites{
    border: 2px solid rgba(0, 0, 0, 0.2);
}

div.invite-form{
    display: grid;
    grid-template-columns: 1fr minmax(max-content, 10%);
    border-left: solid;
    border-right: solid;
    border-bottom: solid;
    border-color: rgba(0, 0, 0, 0.2);
    border-width: 2px;
    grid-column-gap: 8px;
}

div.profile-invites h1{
    font-size: 1.4rem;
    margin-top: 16px;
}

</style>
