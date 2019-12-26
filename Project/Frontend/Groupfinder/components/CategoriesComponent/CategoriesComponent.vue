<template>
<b-row>
    <b-col sm="0.9">
      <b-form-checkbox v-model="allCheckbox" class="pt-2 "/>
    </b-col>
    <b-col>
      <div v-if="disabledDropdown === 'dontShow'">
        <h3>
        <b-button variant="primary" @click="checkBoxSwitch">
          {{categoryName}}
        </b-button>
        </h3>
      </div>
      <div v-else>
        <h3>
        <b-dropdown :text="categoryName" variant="primary" dropright offset="-35">
          <b-form-group class="pl-1" label="Subcategories:">
            <li v-for="(box, index) in selectedCategoriesCheckboxes" v-bind:key="index" class="pl-2">
              <b-checkbox v-model="selectedCategoriesCheckboxes[index]">{{subcategories[index]}}</b-checkbox>
            </li>
          </b-form-group>
        </b-dropdown>
        </h3>
      </div>
    </b-col>
</b-row>
</template>

<script lang="ts" src="./CategoriesComponent.ts">
</script>
