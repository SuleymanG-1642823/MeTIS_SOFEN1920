<template>
    <div id="wrapper" v-if="!dontShowAgain">
        <b-modal
            id="confirmation-modal"
            v-model="show"
            centered
            size="lg"
            :title="mTitle"
            ref
        >
            {{ mMessage }}
            <template v-slot:modal-footer>
                <div class="w-100 div-decline">
                    <b-form-checkbox v-model="mDontShowAgain">
                        Don't ask for confirmation again.
                    </b-form-checkbox>
                    <b-button
                        variant="secondary"
                        class="float-right cancel-decline"
                        @click="decline()"
                    >
                        {{ mNoText }}
                    </b-button>
                    <b-button
                        variant="danger"
                        class="float-right decline"
                        @click="accept()"
                    >
                        {{ mYesText }}
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./ConfirmationModal.ts">
</script>

<style scoped>

#wrapper{
    display: none;
}

div.div-decline .decline{
    margin-right: 16px;
}

</style>
