<template>
  <v-list color="transparent">
    <div class="pa-3 mb-8">
      Список пользователей:
    </div>

    <div class="item" v-for="(i,index) in users" :key="i.name">
      <div class="name-block">
        {{ i.sername }} {{ i.name }} {{ i.patronymic }}
      </div>
      <div>
        <v-icon class="pointer" @click="selectItem(index)">
          mdi-rename-box
        </v-icon>
        <v-icon class="pointer" @click="deleteItem(index)">
          mdi-delete
        </v-icon>
      </div>
    </div>

    <v-divider class="my-2"></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-btn
            outlined
            color="error"
            @click="logout"
        >
          Выйти
        </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>

export default {
  name: "MenuContainer",
  props: {
    users: Array
  },
  methods:{
    selectItem(index){ // выбор пользователя для редактирования
      this.$emit('selectItem', index)
    },
    logout(){// выход
      this.$router.push('/')
    },
    deleteItem(index){// удаление пользователя
      this.$emit('deleteItem', index)
    }
  },
}
</script>

<style scoped>
.name-block{
  max-width: 120px;
  max-height: 23px;
  overflow: hidden;
}
.pointer{
  cursor: pointer;
}
.item{
  background-color: #b7d2f3;
  margin: 7px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}
</style>