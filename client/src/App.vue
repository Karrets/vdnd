<script lang="ts">
import { defineComponent } from 'vue';
import EdgeComponent from '@/components/EdgeComponent.vue';
import ChatBox from '@/components/ChatBox.vue';
import {
  IButton,
  IForm,
  IFormError,
  IFormGroup,
  IFormLabel,
  IInput,
  IModal,
  useForm
} from '@inkline/inkline';

export default defineComponent({
  username: 'App',
  components: {
    ChatBox,
    EdgeComponent,
    IModal,
    IButton,
    IInput,
    IForm,
    IFormLabel,
    IFormGroup,
    IFormError
  },

  data() {
    return {
      username: '',
      nameModalVisible: false,
      form: useForm<{
        username: string;
      }>({
        username: { validators: [{ name: 'required' }] }
      })
    };
  },

  methods: {
    async nameSubmit() {
      await this.form.validate();

      if (this.form.schema.valid) {
        this.nameModalVisible = false;
        this.username = this.form.schema.username.value;
      }
    }
  },

  watch: {
    username(newName) {
      localStorage.setItem('username', newName);
    }
  },

  mounted() {
    let lsName = localStorage.getItem('username');
    if (lsName) {
      this.username = lsName;
      this.nameModalVisible = false;
    } else {
      this.nameModalVisible = true;
    }
  }
});
</script>

<template>
  <i-modal
    v-model="nameModalVisible"
    size="lg"
    :dismissible="false"
    :hideOnClickOutside="false">
    <template #header><h3>Who are you?</h3></template>
    <i-form v-model="form.schema">
      <i-form-group>
        <i-input name="username">
          <template #prefix>
            <i-form-label>Name:</i-form-label>
          </template>
        </i-input>
        <i-form-error for="username" :visible="['invalid']" />
      </i-form-group>
      <i-form-group>
        <i-button
          type="button"
          class="_float:right"
          color="primary"
          @click="nameSubmit">
          Enter the Dungeon...
        </i-button>
      </i-form-group>
    </i-form>
  </i-modal>

  <edge-component edge="top">
    <header>
      <nav>
        <img src="@/assets/logo.svg" alt="" />
        <router-link to="/">Home</router-link>
      </nav>
    </header>
  </edge-component>

  <edge-component edge="right">
    <chat-box :username="username"></chat-box>
  </edge-component>

  <router-view />
</template>

<style scoped></style>
