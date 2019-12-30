<template>
  <b-modal
    id="editData"
    ref='modal'
    scrollable
    title="Change data"
    @ok='handleSubmit'
    :ok-disabled=!submit_permitted
    @cancel='resetFields'
    ok-title='Save changes'
    size="lg"
    >
      <b-form>
          <b-form-group label="First name:">
                <b-form-input v-model="first_name" :state=valid_first_name aria-describedby="first_name_feedback"/>
                <b-form-invalid-feedback id="first_name_feedback">This field must be a valid name.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Last name:">
              <b-form-input v-model='last_name' :state=valid_last_name aria-describedby="last_name_feedback"/>
                <b-form-invalid-feedback id="last_name_feedback">This field must be a valid name.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Email:">
                <b-form-input v-model='mail' type="email" :state=valid_mail aria-describedby="email_feedback"/>
                <b-form-invalid-feedback id="email_feedback">This field must be a valid email.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Telephone number:">
              <b-form-input v-model='tel' type="tel" :state=valid_tel aria-describedby="tel_feedback"/>
              <b-form-invalid-feedback id="tel_feedback">This field must be a valid telephone number.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Address:">
              <b-form-input v-model='address' :state=valid_address aria-describedby="address_feedback"/>
              <b-form-invalid-feedback id="address_feedback">This field must be a valid address.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Zip:">
              <b-form-input v-model='zip' :state=valid_zip aria-describedby="zip_feedback"/>
              <b-form-invalid-feedback id="zip_feedback">This field must be a valid zip.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="City:">
              <b-form-input v-model='city' :state=valid_city aria-describedby="city_feedback"/>
              <b-form-invalid-feedback id="zip_feedback">This field must be a valid city.</b-form-invalid-feedback>
          </b-form-group>
          <SocialMedia :social_media_prop=links :set_links=setLinks />
          <b-form-group label="Website:">
              <b-form-input v-model='website' type="url" :state=valid_website aria-describedby="web_feedback"/>
              <b-form-invalid-feedback id="web_feedback">This field must be a valid URL.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Availability:">
              <b-form-radio v-model="available" name="available" :value=true>Yes, I am available for joining other projects.</b-form-radio>
              <b-form-radio v-model="available" name="not_available" :value=false>No, I am not available for joining projects.</b-form-radio>
          </b-form-group>
      </b-form>
  </b-modal>
</template>

<script lang="ts" src="./EditUserData.ts">
</script>
