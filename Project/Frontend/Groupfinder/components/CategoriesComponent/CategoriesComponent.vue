<template>
<b-row>
    <b-col sm="0.9">
      <b-form-checkbox v-model="allCheckbox"/>
    </b-col>
    <b-col>
      <div v-if="disabledDropdown === 'dontShow'">
        <h3>
        <b-badge variant="primary">
          {{categoryName}}
        </b-badge>
        </h3>
      </div>
      <div v-else>
        <h3>
        <b-dropdown variant="primary" dropright :text="categoryName">
          <b-form-group label="Subcategories">
          <!--
          <b-form-checkbox-group v-model="selectedCategories" stacked>
            <b-form-checkbox v-for="(subcategory, index) in categories_input" v-bind:key="index" :value="subcategory" :state="myComputedState">
              {{subcategory}}
            </b-form-checkbox>
          </b-form-checkbox-group>
          -->
            <li v-for="(box, index) in selectedCategoriesCheckboxes" v-bind:key="index">
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
