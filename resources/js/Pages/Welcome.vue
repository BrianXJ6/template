<script setup>
import { Head, Link } from "@inertiajs/vue3";

import Welcome from "@/Components/Welcome.vue";

defineProps({ title: String });
</script>

<template>
    <Head title="Welcome" />
    <h1>{{ title ?? "Hello World" }}</h1>
    <hr />
    <Welcome />
    <Link :href="route('home')">Welcome</Link>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, tempora
        explicabo recusandae quisquam maiores voluptatum iste sit harum
        perspiciatis consequatur omnis optio porro dolore et illum, officia
        minima atque assumenda!
    </p>
</template>
