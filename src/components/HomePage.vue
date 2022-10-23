<template>
  <v-app id="inspire">
    <dialog-page
        v-model="dialogPage"
        :mailPlaceholder="mailPlaceholder"
        :phonePlaceholder="phonePlaceholder"
        :namePlaceholder="namePlaceholder"
    ></dialog-page>

    <v-navigation-drawer
        v-if="screenWidth<700"
        v-model="leftDrawer"
        app
    >
      <v-container>
        <menu-container
            :users="users"
            @deleteItem="deleteItem($event)"
            @selectItem="selectItem($event)"
        ></menu-container>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="white"
        flat
    >
      <div v-if="screenWidth<700">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click="leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </div>
      </div>
      <v-container class="py-0 fill-height" v-else>
        <v-avatar
            color="#1976D2"
            class="mr-10"
            size="32"
        >
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <div align="left" class="pt-2 load-field-block">
          <v-btn
              outlined
              color="primary"
              class="mr-8 load-field text-none"
              dense
              rounded
              solo-inverted
              @click="createModalPage()"
          >
            Контактная информация
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3" v-if="screenWidth>700">
            <v-sheet rounded="lg">
              <menu-container
                  :users="users"
                  @deleteItem="deleteItem($event)"
                  @selectItem="selectItem($event)"
              ></menu-container>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
                rounded="lg"
            >
              <form-detail
                  @saveItem="saveItem($event)"
                  @changeItem="changeItem($event)"
                  :user="user"
                  :indexChangeUser="indexChangeUser"
              >
              </form-detail>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MenuContainer from "@/components/MenuContainer";
import DialogPage from "@/components/UI/DialogPage";
import FormDetail from "@/components/FormDetail";

export default {
  name: "HomePage",
  components: {FormDetail, DialogPage, MenuContainer},
  data: () => ({
    users: [], // список всех созданных пользователей
    user: null, // текущий пользователь
    mailPlaceholder: '',
    phonePlaceholder: '',
    namePlaceholder: '',
    dialogPage: false,
    leftDrawer: null, // левая панель в мобильной версии
    screenWidth: null, // ширина экрана
    indexChangeUser: null // индекс изменяемого пользователя
  }),
  methods: {
    saveItem(e) {// сохранение в массив нового пользователя
      let user = {}
      for (let prop in e) {
        user[prop] = e[prop]
      }
      this.users.push(user)
    },
    changeItem(e) { //изменение выбранного пользователя
      let user = {}
      for (let prop in e) {
        user[prop]=e[prop]
      }
      this.users[this.indexChangeUser] = user
      this.indexChangeUser = null
    },
    createModalPage() { // отрисовка модального окна (контактная информация)
      this.mailPlaceholder = 'Почта'
      this.phonePlaceholder = 'Телефон'
      this.namePlaceholder = 'Имя'
      this.dialogPage = true
    },
    deleteItem(index) { // удаление выбранного пользователя
      this.users.splice(index, 1)
    },
    selectItem(index) { // выбор пользователя для редактиравания
      this.user = this.users[index]
      this.indexChangeUser = index
    },
    onResize() {
      this.screenWidth = window.innerWidth
    },
  },
  mounted() { // смотрим за шириной экрана для адаптивности
    this.screenWidth = window.screen.width
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>
<style>
</style>