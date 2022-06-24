<template>
  <div>
    <form class="form">
      <input class="form__input" :class="{'form__input_active':error}" v-model="id" type="text" placeholder="Введите id"/>
      <div class="form__error"><span v-show="error">id сайта должен содержать 24 символа</span></div>
      <button class="form__btn"  @click.prevent="auth">Войти</button>
    </form>
  </div>
</template>
<script>

export default {
  name: "FormComp",
  data() {
    return {
      id: '',
      error: false
    }
  },
  methods: {
    auth(){
      const id = this.id
      if(id.length == 24){
        this.$store.dispatch('auth')
        .then(() => {
          this.$router.push('/analytics')
        })
        this.id = ''
      } else{
        this.error = true
      }
    }
  },
  updated() {
    if(this.id.length == 24){
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  &__input{
    border-radius: 4px;
    border: 1px solid #696969;
    padding: 3px 10px;
    outline: none;

    &_active{
    border: 1px solid #FF0000;
    }
  }

  &__error{
    margin-top: 3px;
    height: 12px;
    font-size: 10px;
    color: #FF0000;
  }

  &__btn{
    margin-top: 5px;
    border: none;
    background-color: #696969;
    color: #FFFFFF;
    border-radius: 4px;
    padding: 5px 30px;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
