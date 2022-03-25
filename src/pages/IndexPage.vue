<template>
  <q-page class="row items-center justify-evenly">
    <q-spinner-hearts
      size="40%"
      color="pink"
      v-if="!data || data.length === 0"
    />
    <template v-if="data && data.length > 0">
      <div class="column justify-evenly" style="width: 100%">
        <data-config-renderer
          v-for="(dc, index) in dataConfigs"
          :key="dc.name"
          :selected-date="selectedDate"
          :positivity-thresholds="positivityThresholds"
          :daily-rate-thresholds="dailyRateThresholds"
          :data="data"
          :city-list="cityList"
          v-model="dataConfigs[index]"
        >
          <template v-slot:footer>
            <q-btn color="warning" outline @click="() => deleteConfig(index)">
              Delete Config
            </q-btn>
          </template>
        </data-config-renderer>
        <data-config-renderer
          :selected-date="selectedDate"
          :positivity-thresholds="positivityThresholds"
          :daily-rate-thresholds="dailyRateThresholds"
          :data="data"
          :city-list="cityList"
          v-model="newDataConfig"
        >
          <template v-slot:footer>
            <div class="row justify-center">
              <q-btn
                color="secondary"
                outline
                class="q-ma-xs"
                @click="newConfig"
                :disable="
                  !newDataConfig.name || !newDataConfig.dataInputs.length
                "
              >
                {{
                  !newDataConfig.name
                    ? 'Set a name'
                    : !newDataConfig.dataInputs.length
                    ? 'Add a city'
                    : `Save "${newDataConfig.name}"`
                }}
              </q-btn>
            </div>
          </template>
        </data-config-renderer>

        <div class="row q-ma-sm justify-center">
          <q-select
            rounded
            outlined
            v-model="selectedDate"
            label="Report Date"
            :options="dates()"
          />
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { DataRecord, Thresholds, DataConfig } from 'src/components/models';
import DataConfigRenderer from 'src/components/DataConfigRenderer.vue';

import { reactive, ref, watch, onMounted } from 'vue';

const props = defineProps<{
  data: DataRecord[];
  cityList: Set<string>;
  dateList: Set<string>;
  positivityThresholds: Thresholds;
  dailyRateThresholds: Thresholds;
}>();

onMounted(() => {
  loadConfigs();
});

function dates(): string[] {
  return Array.from(props.dateList.values()).sort().reverse();
}

// Date Selection
const selectedDate = ref('');

watch(props.dateList, () => {
  selectedDate.value = dates()[0];
});

// Data Configs
const dataConfigs = reactive<DataConfig[]>([]);
const newDataConfig = reactive<DataConfig>({ name: '', dataInputs: [] });

function newConfig() {
  if (!newDataConfig.name) return;
  const existing = dataConfigs.find((dc) => dc.name === newDataConfig.name);
  if (existing) {
    existing.dataInputs = JSON.parse(JSON.stringify(newDataConfig.dataInputs));
  } else {
    dataConfigs.push(JSON.parse(JSON.stringify(newDataConfig)));
  }
  newDataConfig.name = '';
  newDataConfig.dataInputs = [];
}

function deleteConfig(index: number) {
  dataConfigs.splice(index, 1);
}

// save/load data
const CONFIGS_LOCAL_KEY = 'dataConfigs';

watch(dataConfigs, (newConfigs) => {
  localStorage.setItem(CONFIGS_LOCAL_KEY, JSON.stringify(newConfigs));
});

function loadConfigs() {
  const data = localStorage.getItem(CONFIGS_LOCAL_KEY);
  if (data) {
    Object.assign(dataConfigs, JSON.parse(data));
  }
}
</script>
