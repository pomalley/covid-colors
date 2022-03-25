<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Put Some Stuff Here </q-item-label>
        <q-item><q-toggle v-model="darkMode" label="Dark Mode" /></q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :data="data" :cityList="cityList" :dateList="dateList" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import Papa from 'papaparse';
import { DataRecord, parseRow } from 'src/components/models';

const $q = useQuasar();
const leftDrawerOpen = ref(false);
const data = ref<DataRecord[]>([]);
const cityList = reactive<Set<string>>(new Set());
const dateList = reactive<Set<string>>(new Set());

onMounted(() => {
  initGapiScript();
  initDarkMode();
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

//// Init Google API and fetch data ////

function initGapiScript() {
  var gapiscript = document.createElement('script');
  gapiscript.setAttribute('src', 'https://apis.google.com/js/api.js');
  gapiscript.onload = () => gapiScriptLoaded();
  document.head.appendChild(gapiscript);
}

function gapiScriptLoaded() {
  gapi.load('client', fetchData);
}

async function fetchData() {
  try {
    await gapi.client.init({
      apiKey: 'AIzaSyCRy2YrjIUcQ-5dhqihPy3vmK28oBcCSvU',
    });
    const response = await gapi.client.request({
      path: 'https://www.googleapis.com/drive/v2/files/1g58SzR76C9GJorvw1MZlJXtTulgjRESP?alt=media',
    });
    let datacache: DataRecord[] = [];
    Papa.parse(response.body, {
      header: true,
      step: function (results /*, parser*/) {
        try {
          datacache.push(parseRow(results.data as Record<string, string>));
          const record = datacache[datacache.length - 1];
          dateList.add(record.report_date);
          cityList.add(record.city);
          data.value = data.value.reverse();
        } catch (e) {
          // console.error(e);
        }
      },
    });
    data.value = datacache;
  } catch (e) {
    console.error(e);
  }
}

//// Dark Mode ////
const darkMode = ref(false);

function initDarkMode() {
  darkMode.value = Boolean(localStorage.darkMode);
}

watch(darkMode, (newDarkMode: boolean) => {
  $q.dark.set(newDarkMode);
  localStorage.darkMode = Boolean(newDarkMode);
});
</script>
