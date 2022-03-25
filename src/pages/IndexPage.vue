<template>
  <q-page class="row items-center justify-evenly">
    <q-spinner-hearts
      size="40%"
      color="pink"
      v-if="!data || data.length === 0"
    />
    <template v-if="data && data.length > 0">
      <q-list>
        <q-item>
          Net positivity: {{ pctFormatter.format(netPositivity()) }}
        </q-item>
        <q-item>
          Net daily rate: {{ rateFormatter.format(netDailyRate()) }}
        </q-item>
        <q-item v-for="di in dataInputs" :key="di.city">
          {{ di.city }}
          {{
            pctFormatter.format(fetch(di.city, selectedDate, Metric.POSITIVITY))
          }}
          {{
            rateFormatter.format(
              fetch(di.city, selectedDate, Metric.DAILY_RATE)
            )
          }}
          <q-slider
            v-model="di.weight"
            :min="0"
            :max="100"
            label
            label-always
          />
          Contribution:
          {{ pctFormatter.format(positivityContribution(di)) }}
          {{ rateFormatter.format(dailyRateContribution(di)) }}
          <q-toggle v-model="di.active">Active</q-toggle>
          <q-btn @click="removeDataInput(di)">Remove</q-btn>
        </q-item>
        <q-item>
          <q-select
            rounded
            outlined
            v-model="selectedCity"
            label="Add City"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="cityOptions"
            @filter="citiesFilter"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn
            @click="() => newDataInput(selectedCity)"
            :disable="!(selectedCity && cityList.has(selectedCity))"
          >
            Add
          </q-btn>
        </q-item>
        <q-item>
          <q-select
            rounded
            outlined
            v-model="selectedDate"
            label="Report Date"
            :options="dates()"
          />
        </q-item>
      </q-list>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { DataInput, DataRecord } from 'src/components/models';
import { reactive, ref, watch } from 'vue';

const pctFormatter = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  style: 'percent',
});

const rateFormatter = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
});

const props = defineProps<{
  data: DataRecord[];
  cityList: Set<string>;
  dateList: Set<string>;
}>();

// City Selection
const cityOptions = ref(cities());
const selectedCity = ref('');

function cities(): string[] {
  return Array.from(props.cityList.values()).sort();
}

function dates(): string[] {
  return Array.from(props.dateList.values()).sort().reverse();
}

function citiesFilter(val: string, update: (fn: () => void) => void) {
  update(() => {
    const text = val.toLowerCase();
    cityOptions.value = cities().filter(
      (v) => v.toLowerCase().indexOf(text) > -1
    );
  });
}

// Date Selection
const selectedDate = ref('');

watch(props.dateList, () => {
  selectedDate.value = dates()[0];
});

// Data Inputs
const dataInputs = reactive<DataInput[]>([]);

function newDataInput(city: string) {
  if (!city || !props.cityList.has(city)) {
    console.log(`Invalid city: ${city}.`);
    return;
  }
  if (dataInputs.find((di) => di.city === city) !== undefined) {
    console.log(`Cravenly refusing to add another ${city}.`);
    return;
  }
  dataInputs.push({ city: city, weight: 50, active: true });
}

function removeDataInput(di: DataInput) {
  let index = -1;
  while ((index = dataInputs.findIndex((x) => x.city === di.city)) > -1) {
    dataInputs.splice(index, 1);
  }
}

// Computations

enum Metric {
  POSITIVITY,
  DAILY_RATE,
}

function totalWeight(): number {
  return dataInputs
    .filter((di) => di.active)
    .map((di) => di.weight)
    .reduce((acc, w) => acc + w, 0);
}

function fetch(city: string, date: string, metric: Metric) {
  const record = props.data.find(
    (v) => v.city === city && v.report_date === date
  );
  if (!record) {
    throw `Unable to find record for ${city} and report date ${date}`;
  }
  switch (metric) {
    case Metric.DAILY_RATE:
      return record.daily_rate;
    case Metric.POSITIVITY:
      return record.pct_positivity;
  }
}

function netPositivity() {
  return dataInputs.map(positivityContribution).reduce((acc, w) => acc + w, 0);
}

function positivityContribution(di: DataInput) {
  if (!di.active) return 0;
  return (
    (fetch(di.city, selectedDate.value, Metric.POSITIVITY) * di.weight) /
    totalWeight()
  );
}

function dailyRateContribution(di: DataInput) {
  if (!di.active) return 0;
  return (
    (fetch(di.city, selectedDate.value, Metric.DAILY_RATE) * di.weight) /
    totalWeight()
  );
}

function netDailyRate() {
  return dataInputs.map(dailyRateContribution).reduce((acc, w) => acc + w, 0);
}
</script>
