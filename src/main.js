import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap";

import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";

const app = createApp(App);
app.component("base-card", BaseCard);

app.mount("#app");
