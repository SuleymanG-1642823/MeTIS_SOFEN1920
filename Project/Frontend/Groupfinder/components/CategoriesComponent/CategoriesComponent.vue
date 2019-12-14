<template>
<b-row>
    <b-col sm="0.9">
      <b-form-checkbox @change="makeAllChecked" />
    </b-col>
    <b-col>
        <b-dropdown variant="primary" dropright text="Category">
          <b-form-group label="Subcategories">
          <!--
          <b-form-checkbox-group v-model="selectedCategories" stacked>
            <b-form-checkbox v-for="(subcategory, index) in categories_input" v-bind:key="index" :value="subcategory" :state="myComputedState">
              {{subcategory}}
            </b-form-checkbox>
          </b-form-checkbox-group>
          -->
            <li v-for="(box, index) in selectedCategoriesCheckboxes" v-bind:key="index">
              <b-checkbox v-model="selectedCategoriesCheckboxes[index]" @input="toggle(index)">{{categories_input[index]}}</b-checkbox>
            </li>
          </b-form-group>
        </b-dropdown>
      <b-button @click="testValue">test</b-button>
    </b-col>
</b-row>
</template>

<script lang="ts" src="./CategoriesComponent.ts">
</script>
