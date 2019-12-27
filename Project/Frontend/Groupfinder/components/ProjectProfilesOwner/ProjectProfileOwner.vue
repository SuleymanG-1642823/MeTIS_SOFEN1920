<template>
    <div id="profilewrapper" v-if="profile !== undefined">
        <span>{{ profile.name }}</span>
        <div id="skills">
            <b-badge
                v-for="skill in profile.skills"
                :key="skill.name"
                variant="info"
                class="skill badge"
            >
                {{ skill.name }}
            </b-badge>
            <i class="far fa-plus-square add-skill" @click="addSkill"></i>
        </div>
        <hr v-if="hasAssociatedUsers()">
        <div v-if="hasAssociatedUsers()">
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
                    <div class="col1">
                        <i class="far fa-user profile-member"></i>
                        <span>{{ member.first_name + ' ' + member.last_name }}</span>
                    </div>
                    <div class="col2">
                        <i class="far fa-comment msg" @click="goToChatPage(member.id)"></i>
                    </div>
                    <div class="col3">
                        Member
                    </div>
                    <div class="col4">
                    </div>
                    <div class="col5">
                        <b-button variant="light" class="user-button decline">
                            <i class="fas fa-times"></i>
                            Remove
                        </b-button>
                    </div>
                  </li>
              </ul>
            </b-collapse>
        </div>
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

ul#members{
    list-style-type: none;
    padding: 0;
}

ul#members > li{
    margin: 8px 0 8px 0;
    display: grid;
    grid-template-columns: minmax(max-content, 1fr) max-content 1fr 1fr 1fr;
}

div.col3, div.col4, div.col5{
    justify-self: end;
}

i.profile-member, i.add-skill{
    font-size: 1.5rem;
}

ul#members span{
    margin: 0 4px 0 4px;
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

</style>
