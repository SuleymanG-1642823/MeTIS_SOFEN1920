<template>
  <b-modal
    id="editData"
    ref='modal'
    scrollable
    title="Change data"
    @ok='handleSubmit'
    @cancel='resetFields'
    ok-title='Save changes'
    >
      <b-form>
          <b-form-group label="First name:">
              <b-form-input v-model="first_name"/>
          </b-form-group>
          <b-form-group label="Last name:">
              <b-form-input v-model='last_name'/>
          </b-form-group>
          <b-form-group label="Email">
              <b-form-input v-model='mail'/>
          </b-form-group>
          <b-form-group label="Telephone number">
              <b-form-input v-model='tel'/>
          </b-form-group>
          <b-form-group label="Address">
              <b-form-input v-model='address'/>
          </b-form-group>
          <b-form-group label="Zip">
              <b-form-input v-model='zip'/>
          </b-form-group>
          <b-form-group label="City">
              <b-form-input v-model='city'/>
          </b-form-group>
          <b-form-group label="Website">
              <b-form-input v-model='website'/>
          </b-form-group>
          <b-form-group label="Availability">
              <b-form-radio v-model="available" name="available" :value=true>Yes, I am available for joining other projects.</b-form-radio>
              <b-form-radio v-model="available" name="not_available" :value=false>No, I am not available for joining projects.</b-form-radio>
          </b-form-group>
      </b-form>
  </b-modal>
</template>

<script lang="ts" src="./EditUserData.ts">
</script>
