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

        <q-toolbar-title> Covid Colors </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Put Some Stuff Here </q-item-label>
        <q-item><q-toggle v-model="darkMode" label="Dark Mode" /></q-item>
        <q-item-label header>Positivity Thresholds</q-item-label>
        <q-item>
          <q-input outlined v-model.number="positivityThresholds.red">
            <template v-slot:append><q-chip>Red Positivity</q-chip></template>
          </q-input>
        </q-item>
        <q-item>
          <q-input outlined v-model.number="positivityThresholds.orange">
            <template v-slot:append
              ><q-chip>Orange Positivity</q-chip></template
            >
          </q-input>
        </q-item>
        <q-item>
          <q-input outlined v-model.number="positivityThresholds.yellow">
            <template v-slot:append
              ><q-chip>Yellow Positivity</q-chip></template
            >
          </q-input>
        </q-item>
        <q-item>
          <q-input outlined v-model.number="dailyRateThresholds.red">
            <template v-slot:append><q-chip>Red Case Rate</q-chip></template>
          </q-input>
        </q-item>
        <q-item>
          <q-input outlined v-model.number="dailyRateThresholds.orange">
            <template v-slot:append><q-chip>Orange Case Rate</q-chip></template>
          </q-input>
        </q-item>
        <q-item>
          <q-input outlined v-model.number="dailyRateThresholds.yellow">
            <template v-slot:append><q-chip>Yellow Case Rate</q-chip></template>
          </q-input>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view
        :data="data"
        :cityList="cityList"
        :dateList="dateList"
        :positivityThresholds="positivityThresholds"
        :dailyRateThresholds="dailyRateThresholds"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import Papa from 'papaparse';
import {
  Colors,
  DataRecord,
  parseRow,
  Thresholds,
} from 'src/components/models';

const $q = useQuasar();
const leftDrawerOpen = ref(false);
const data = ref<DataRecord[]>([]);
const cityList = reactive<Set<string>>(new Set());
const dateList = reactive<Set<string>>(new Set());

const positivityThresholds = reactive<Thresholds>({
  [Colors.RED]: 0.1,
  [Colors.ORANGE]: 0.08,
  [Colors.YELLOW]: 0.05,
});
const dailyRateThresholds = reactive<Thresholds>({
  [Colors.RED]: 100,
  [Colors.ORANGE]: 50,
  [Colors.YELLOW]: 10,
});

onMounted(() => {
  fetchData();
  initDarkMode();
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

//// Fetch data from apps script ////
async function fetchData() {
  try {
    let datacache: DataRecord[] = [];
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyYeA7expaigWucUn38xQABP_WnYNIREbuVm-343HtyfZcsIzNmlQA7FjR2tnGVDtfKUw/exec'
    );
    const text = await response.text();
    Papa.parse(text, {
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
