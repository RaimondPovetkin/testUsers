<template>
  <v-app id="inspire">
    <v-snackbar
        v-model="snackbar"
        top
        :timeout="2000"
    >
      Неправильно введён пароль или email
      <template>
        <v-btn
            color="blue"
            text
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-container fill-height fluid>
      <v-row justify="space-around" align="center">
        <v-col
            cols="12"
            md="4"
        >
          <v-sheet
              elevation="10"
              class="mx-auto pa-10"
              rounded
          >
            <v-text-field
                v-model="email"
                placeholder="Логин(admin)"
                required
            >
            </v-text-field>
            <v-text-field
                type="password"
                v-model="password"
                placeholder="Пароль(admin)"
            >
            </v-text-field>

            <v-btn
                block
                color="primary"
                class="mt-4"
                @click="loginClick"
            >
              Войти
            </v-btn>

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "LoginPage",
  data: () => ({
    snackbar: false, // окно ошибки выключено по умолчанию
    password: '',
    email: '',
  }),
  methods: {
    loginClick() {
      if (this.password === 'admin' && this.email === 'admin'){
        this.$router.push('home') // переходим на главную
      } else {
        this.snackbar = true // вывести ошибку
      }
    },
  },
}
</script>

<style scoped>
a {
  color: #8d8176;
  text-decoration: none !important;
  border: none !important;
}
</style>