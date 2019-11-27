<template>
    <div class="wrapper">

        <div class="row">
            <!-- Sidebar -->
            <div class="col-xl-2 col-lg-3 col-md-3 navbar navbar-expand-md py-0 px-0 mx-0 my-1">
                <div class="collapse navbar-collapse">
                    <div class="nav flex-column pt-5 bg-light shadow" id="vertical-nav">
                        <!-- Sidebar when logged in -->
                        <Sidebar/>
                        <!-- TODO Sidebar when not logged in comes here -->
                    </div>
                </div>
            </div>

            <div class="col-xl-8 col-lg-8 col-md-8 bg-white mt-0 py-0 px-0 ml-3">
                <!-- Top bar -->
                <div class="wrapper">
                    <div class="row nav nav-pills fixed-top px-3 py-2 navbar-light bg-light shadow">
                        <nuxt-link to="/" class="navbar-brand align-text-middle col-3 py-0 pr-0 mr-0" href="#">Groupfinder</nuxt-link>
                        <div class="col-9">
                            <!--<div class="input-group">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Search</button>
                                </div>
                                <input type="search" class="form-control" placeholder="search">
                            </div>-->
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div id="content" class="">
                    <!-- Content components go here -->
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./default.ts">
</script>

<style scoped>
#vertical-nav{
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding-top: 20px;
}

#content{
    padding-top: 60px;
    padding-left: 20px;
}
</style>
