<script setup>
import { ref } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";

defineProps({
    title: String,
});
</script>

<template>
    <div>
        <Head :title="title" />
        <h1>{{ title }}</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sed
            natus quisquam dolores adipisci temporibus vel ducimus, quidem
            impedit aut atque quos aliquid nostrum corrupti nisi consectetur
            asperiores? Perferendis, aut?
        </p>
    </div>
</template>
