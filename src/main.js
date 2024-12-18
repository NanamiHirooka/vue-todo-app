import { createApp } from 'vue'
import App from './App.vue'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
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
          transparent: colors.shades.transparent,
          muted: colors.grey.lighten5,
          bgcolor: '#03A9F4'
        }
      },
    },
  },
  defaults: { 
  },
});

createApp(App).use(vuetify).mount('#app')
