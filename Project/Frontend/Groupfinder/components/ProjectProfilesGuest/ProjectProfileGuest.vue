<template>
    <div id="profilewrapper" v-if="profile !== undefined">
        <span>{{ profile.name }}</span>
        <b-form-checkbox
            class="apply-checkbox"
            @change="checkedUnChecked"
        ></b-form-checkbox>
        <div id="skills">
            <b-badge
                v-for="skill in profile.skills"
                :key="skill.name"
                variant="info"
                class="skill badge"
            >
                {{ skill.name }}
            </b-badge>
        </div>
        <hr v-if="members.length > 0">
        <div v-if="members.length > 0">
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
                    v-for="(member, index) in members"
                    :key="index"
                    class="far fa-user profile-member"
                >
                </i>
            </div>
            <b-collapse :id="collapseID" class="mt-2">
              <ul id="members">
                  <li
                    v-for="(member, index) in members"
                    :key="index"
                  >
                    <i class="far fa-user profile-member"></i>
                    <span>{{ member.first_name + ' ' + member.last_name }}</span>
                    <i class="far fa-comment msg" @click="goToChatPage(member.id)"></i>
                  </li>
              </ul>
            </b-collapse>
        </div>
    </div>
</template>

<script lang="ts" src="./ProjectProfileGuest.ts">
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

ul#members{
    list-style-type: none;
    padding: 0;
}

ul#members > li{
    margin: 8px 0 8px 0
}

i.profile-member{
    font-size: 1.5rem;
}

ul#members span{
    margin: 0 4px 0 4px;;
}

i.msg{
    cursor:pointer;
}

div#iconsOnCollapsed{
    display: inline;
}

div#iconsOnCollapsed i{
    margin-left: 8px;
}

</style>
