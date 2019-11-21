<template>
    <div class="wrapper">

        <div class="row">
            <!-- Sidebar -->
            <div class="col-xl-2 col-lg-3 col-md-3 navbar navbar-expand-md py-0 px-0 mx-0 my-1">
                <div class="collapse navbar-collapse">
                <ul class="nav flex-column bg-light shadow" id="vertical-nav">
                    <li class="nav-item">
                        <a class="navbar-brand ml-3 py-2" href="#">Groupfinder</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
                </div>
            </div>

            <div class="col-xl-8 col-lg-8 col-md-8 bg-white mt-0 py-0 px-0 ml-3">
                <!-- Top bar -->
                <div class="wrapper">
                    <div class="row nav nav-pills fixed-top px-3 py-2 navbar-light bg-light shadow">
                        <a class="navbar-brand align-text-middle col-3 py-0 pr-0 mr-0" href="#">Groupfinder</a>
                        <div class="col-9">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Search</button>
                                </div>
                                <input type="search" class="form-control" placeholder="search">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div id="content" class="">
                    <h1 class="h1">Groupfinder</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./MainLayout.ts">
</script>

<style scoped>
#vertical-nav{
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding-top: 50px;
}

#content{
    padding-top: 60px;
    padding-left: 20px;
}
</style>
