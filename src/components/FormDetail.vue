<template>
  <div>
    <v-snackbar
        v-model="snackbar"
        top
        :timeout="2000"
    >
      {{ errorMessage }}
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
    <v-text-field ref="name" class="px-10 pt-10" placeholder="Фамилия" v-model="person.sername"
                  :rules="requiredRules"></v-text-field>
    <v-text-field ref="sername" class="px-10" placeholder="Имя" v-model="person.name"
                  :rules="requiredRules"></v-text-field>
    <v-text-field ref="patronymic" class="px-10" placeholder="Отчество" v-model="person.patronymic"
                  :rules="requiredRules"></v-text-field>
    <div class="px-10">
      <v-menu
          ref="menuDate"
          v-model="menuDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              ref="date"
              :rules="requiredRules"
              v-model="person.date"
              label="Дата рождения"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="person.date"
            :active-picker.sync="activePicker"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="saveDate"
        ></v-date-picker>
      </v-menu>
    </div>
    <v-text-field ref="mail" prepend-icon="mdi-at" class="px-10" placeholder="Электронная почта" v-model="person.email"
                  :rules="emailRules"></v-text-field>
    <v-text-field ref="phone" prepend-icon="mdi-phone" class="px-10" placeholder="Телефон" v-mask="'+7(###)###-##-##'"
                  v-model="person.phone" :rules="requiredRules"></v-text-field>
    <div class="img-block pt-6">
      <div align="left" class="padding-left load-field-block">
        <v-btn
            color="primary"
            class="load-field text-none"
            outlined
            hide-details
            rounded
            solo-inverted
            :loading="isSelecting"
            @click="selectFile"
        >
          Загрузить фото
        </v-btn>
        <input
            ref="uploader"
            class="d-none"
            type="file"
            @change="onFileChanged"
        >
      </div>

      <div v-if="!person.selectedFile" class="padding-left" @click="selectFile">
        <div class="img-holder">
          <v-icon>
            mdi-camera
          </v-icon>
        </div>
      </div>
      <div ref="img" class="padding-left"></div>
    </div>

    <v-divider class="mt-10"></v-divider>

    <div align="center" class="py-6">
      <v-btn
          color="primary"
          class="load-field text-none"
          dense
          hide-details
          rounded
          solo-inverted
          @click="save"
      >
        Сохранить
      </v-btn>
    </div>


  </div>
</template>

<script>

export default {
  name: "FormDetail",
  data: () => ({
    person: { // данные о пользователе
      name: null,
      sername: null,
      patronymic: null,
      date: null,
      email: null,
      phone: null,
      selectedFile: null,
    },
    errorMessage: null,// текст ошибки
    snackbar: false,// окно ошибки выключено по умолчанию
    activePicker: null,// для календаря
    menuDate: false,// для календаря
    isSelecting: false,// для прелоадера во время загрузки фото

    /*правила валидации для полей*/
    emailRules: [
      v => !!v || 'Введите e-mail',
      v => /.+@.+/.test(v) || 'Введите валидный e-mail',
    ],
    requiredRules: [
      v => !!v || 'Заполните поле',
    ],
  }),
  props: {
    user: Object, // данные  пользователя, подлежащие изменениям
    indexChangeUser: Number // флаг отвечающий за изменение/создание пользователя
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR')) // для календаря
    },
    user() {
      for (let prop in this.user) { // при изменении пользователя передаём его данные в форму
        this.person[prop] = this.user[prop]
      }
      this.setImg() // устанавливаем картинку изменяемого пользователя
    }
  },
  methods: {
    setImg(){ // отображение картинки
      this.$refs.img.innerHTML = '<img style="height: 90px" id="blah" src="#" alt="your image"/>';
      let reader = new FileReader();
      reader.onload = function () {
        document.getElementById('blah').src = reader.result;
      }
      reader.readAsDataURL(this.person.selectedFile)
    },
    save() {
      this.errorMessage = 'Заполните правильно все поля'
      for (let prop in this.person) { // проверка на заполненность
        if (!(this.person[prop])) {
          this.snackbar = true
          return
        }
      }

      if(this.indexChangeUser !== null){ // если изменяем пользователя
        this.$emit('changeItem', this.person)
      } else {// если создаём пользователя
        this.$emit('saveItem', this.person)
      }

      for (let prop in this.person) { // очистка полей при сохранении/изменении
        this.person[prop] = null
      }
      /*чистим валидацию полей*/
      this.$refs.name.reset()
      this.$refs.sername.reset()
      this.$refs.patronymic.reset()
      this.$refs.date.reset()
      this.$refs.phone.reset()
      this.$refs.mail.reset()
      this.$refs.img.innerHTML = ''; // убираем картинку
    },
    saveDate(date) { // для календаря
      this.$refs.menuDate.save(date)
    },
    selectFile() { // выбор картинки с устройства
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, {once: true})
      this.$refs.uploader.click()
    },
    onFileChanged(e) { // загрузка изображения
      this.person.selectedFile = e.target.files[0]
      let typeFile = this.person.selectedFile.name.split('.').pop()
      if (typeFile.toUpperCase() === 'JPG' || typeFile.toUpperCase() === 'PNG') {
        this.setImg()
      } else { // показываем окно ошибки
        this.errorMessage = 'Загружать можно только картинки'
        this.snackbar = true
      }
    },
  },
}
</script>

<style scoped>
.img-block {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.img-holder {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid #64a8ed;
  background-color: #bdd7f3;
}

.img-holder:hover {
  cursor: pointer;
}

.padding-left {
  padding-left: 43px;
}

@media (max-width: 700px) {
  .img-block {
    flex-direction: column;
    height: 170px;
    justify-content: space-between;
  }

  .padding-left {
    padding-left: 0px;
  }
}
</style>