<template>
  <div id="layout">
    <HeaderLayout />
    <main id="main">
      <router-view />
    </main>
    <footer id="footer">
      <h1 class="footerText">@Footer</h1>
    </footer>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout.vue";

export default {
  name: "LayuotApp",
  components: {
    HeaderLayout,
  },
};
</script>

<style scoped>
#footer {
  background-color: rgb(35, 36, 31);
  color: aliceblue;
  min-height: 50px;
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
}
</style>
