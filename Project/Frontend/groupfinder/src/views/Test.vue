<template>
    <div>
        <h1>Full list</h1>
        <hr>
        <p v-for="object in test">{{ object.name }}</p>

        <h1>Filtered list with lodash </h1>
        <hr>
        <p v-for="object in filteredTest">{{ object.name }}</p>

    </div>
</template>

<script>
    export default {
        computed: {
            filteredTest() {
                return this.$_.filter(this.test, o => {
                    return o.name !== 'first'
                });
            }
        },
        data() {
            return {
                test: [
                    {
                        name: 'first'
                    },
                    {
                        name: 'second'
                    },
                    {
                        name: 'third'
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>
