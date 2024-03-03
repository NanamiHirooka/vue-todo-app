import { createApp } from 'vue'
import App from './App.vue'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken2,
          danger: colors.red.darken2,
        }
      },
    },
  },
  defaults: { 
    VBtn: {
      rounded: true,
      variant: "flat",
    },
  },
});

createApp(App).use(vuetify).mount('#app')
