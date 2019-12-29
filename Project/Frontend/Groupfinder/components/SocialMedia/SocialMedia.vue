<template>
    <b-form-group label="Social media links:">
            <b-form-checkbox
                v-for="entry in links"
                :key="entry.prefix"
                v-model="entry.state"
                :value=true
                :unchecked-value=false
                @input="onSelectChange(entry.prefix)">
                {{ entry.prefix }}
                <b-form-input v-model="entry.suffix" :plaintext=!entry.state @input="onSuffixChange()"/>
            </b-form-checkbox>
    </b-form-group>
</template>

<script lang="ts" src="./SocialMedia.ts">
</script>

<style scoped>
</style>
