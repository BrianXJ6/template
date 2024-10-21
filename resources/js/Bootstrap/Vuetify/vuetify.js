import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";

/**
 * Styles
 */
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";

export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "fa",
        aliases,
        sets: { fa },
    },
});
