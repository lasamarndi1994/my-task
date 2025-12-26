/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myTaskTheme',
    themes: {
      myTaskTheme: {
        dark: false,
        colors: {
          'background': '#FFFFFF',
          'surface': '#FFFFFF',
          'primary': '#0052CC',
          'secondary': '#42526E',
          'error': '#FF5630',
          'info': '#42526E',
          'success': '#36B37E',
          'warning': '#FFAB00',
          'surface-variant': '#F4F5F7',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      style: 'text-transform: none; letter-spacing: normal;',
    },
    VCard: {
      elevation: 0,
      border: true,
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
    },
    VTooltip: {
      contentClass: 'bg-black text-caption',
    },
  },
})
