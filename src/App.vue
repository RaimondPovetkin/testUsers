<template>
  <div>
    <router-view>
      <login-page></login-page>
    </router-view>
  </div>
</template>

<script>
import LoginPage from "@/components/auth/LoginPage";

export default {
  components: {LoginPage},
}
</script>