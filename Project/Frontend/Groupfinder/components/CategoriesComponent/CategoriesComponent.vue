<template>
<b-row>
    <b-col>
      <b-form-checkbox>
        <b-dropdown dropright text="Category">
          <b-form-group
            id="input-category-id"
            label="Category"
            label-for="input-category"
          >
            <b-form-select
              id="input-category"
              v-model="selectedCategory"
              :options="categories_input"
              required
            >
            </b-form-select>
          </b-form-group>
        </b-dropdown>
      </b-form-checkbox>
    </b-col>
</b-row>
</template>

<script lang="ts" src="./CategoriesComponent.ts">
</script>
