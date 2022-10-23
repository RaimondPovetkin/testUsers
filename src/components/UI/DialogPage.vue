<template>
  <v-dialog
      v-model="show"
      max-width="80%"
  >
    <v-card>
      <v-card-title class="text-h5">
        Контактная информация
      </v-card-title>

      <v-text-field class="px-8" :placeholder="namePlaceholder" v-model="name">
      </v-text-field>

      <v-text-field class="px-8" :placeholder="phonePlaceholder" v-model="phone">
      </v-text-field>

      <v-text-field class="px-8" :placeholder="mailPlaceholder" v-model="mail">
      </v-text-field>

      <v-card-actions>

        <div
            class="px-3 pb-5"
        >
          <v-btn
              small
              color="primary"
              @click.stop="sendContacts, show=false"
          >
            Отправить
          </v-btn>
        </div>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogNewFolder",
  props: {
    value: Boolean,
    mailPlaceholder: String,
    phonePlaceholder: String,
    namePlaceholder: String
  },
  data: () => ({
    phone: null,
    mail: null,
    name: null,
  })
  ,
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods:{
    sendContacts(){
      // отправка данных на сервер
    }
  }
}
</script>

<style scoped>
</style>