<template>
  <div id="wrapper">
    <div id="filler">
      <span>
        This website allows you to pitch programming projects and participate in projects of others.
      </span>
      <br>
      <span>
        Do you have ideas for programmng project, but lack the necessary manpower or knowledge on the subject? Then this platform will help you realise those projects!
      </span>
      <br>
      <span>
        Make an account now for free and start sharing project pitches and participate in programming projects of others.
      </span>
    </div><!-- END FILLER -->
    <SignupForm id="form"/>
    </div><!--- END WRAPPER -->
</template>

<script>
import SignupForm from '~/components/SignupForm/SignupForm'
export default {
  components: { SignupForm }
}
</script>

<style scoped>
#wrapper {
  width: 100%;
}
#filler{
  min-width: 240px;
  margin: auto;
}
#filler span {
  display: inline-block;
  padding: 10px 0;
}
#form{
  width: 100%;
}
</style>
