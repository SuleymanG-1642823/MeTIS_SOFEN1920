<template>
    <div style="overflow: auto;">
        <table class="preferences_table">
            <tr>
                <th>Category name</th>
                <th>Prefer</th>
                <th>Dislike</th>
                <th>No preference</th>
            </tr>
            <tr v-for="main_category in categoriesWithoutSubcategories" :key="main_category.name">
                <td>{{ main_category.name }}</td>
                <td><input type="radio" :name="main_category.name" :checked="main_category.categories[0].preference === true" :value=true @change="editPreference(main_category.name, main_category.categories[0].id, true)"/></td>
                <td><input type="radio" :name="main_category.name" :checked="main_category.categories[0].preference === false" :value=false @change="editPreference(main_category.name, main_category.categories[0].id, false)"/></td>
                <td><input type="radio" :name="main_category.name" :checked="main_category.categories[0].preference === null" :value=null @change="editPreference(main_category.name, main_category.categories[0].id, null)"/></td>
            </tr>
            <tr v-for="category in categoriesWithSubcategories" :key="category.id">
                <td>{{category.main_category_name}}: {{ category.subcategory }}</td>
                <td><input type="radio" :name="category.subcategory" :checked="category.preference === true" :value=true @change="editPreference(category.main_category_name, category.id, true)"/></td>
                <td><input type="radio" :name="category.subcategory" :checked="category.preference === false" :value=false @change="editPreference(category.main_category_name, category.id, false)"/></td>
                <td><input type="radio" :name="category.subcategory" :checked="category.preference === null" :value=null @change="editPreference(category.main_category_name, category.id, null)"/></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts" src="./EditPreferences.ts">
</script>

<style scoped>
    .preferences_table{
        width: 100%;
        min-width: 300px;
    }
    .preferences_table td, .preferences_table th{
        padding: 5px;
        height: 50px;
        vertical-align: middle;
        border-top: 1px solid #ced4da8f;
    }
    .preferences_table th{
        border-top: 1px solid #ced4da;
        border-bottom: 2px solid #ced4da;
    }
</style>
