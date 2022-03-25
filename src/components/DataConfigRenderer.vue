<template>
  <q-card class="q-ma-md" bordered style="width=100%">
    <q-list>
      <q-item class="justify-center">
        <q-chip
          :color="quasarColor(worstClass(netPositivity(), netDailyRate()))"
          size="xl"
        >
          {{ props.modelValue.name || '[unnamed config]' }}
          <q-popup-edit
            auto-save
            title="New Name"
            :model-value="props.modelValue.name"
            @update:model-value="updateName"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
          /></q-popup-edit>
        </q-chip>
      </q-item>
      <q-item class="justify-center">
        <q-chip :color="quasarColor(positivityClass(netPositivity()))">
          Net positivity: {{ pctFormatter.format(netPositivity()) }}
        </q-chip>
        <q-chip :color="quasarColor(dailyRateClass(netDailyRate()))">
          Net daily rate: {{ rateFormatter.format(netDailyRate()) }}
        </q-chip>
      </q-item>
      <q-item
        v-for="(di, index) in props.modelValue.dataInputs"
        :key="di.city"
        class="row justify-center"
      >
        <div class="column">
          <q-chip
            :color="
              quasarColor(worstClass(getPositivity(di), getDailyRate(di)))
            "
          >
            {{ di.city }}
          </q-chip>
          <q-chip :color="quasarColor(positivityClass(getPositivity(di)))">
            Positivity:
            {{ pctFormatter.format(getPositivity(di)) }}
          </q-chip>
          <q-chip :color="quasarColor(dailyRateClass(getDailyRate(di)))">
            Daily Rate:
            {{ rateFormatter.format(getDailyRate(di)) }}
          </q-chip>
        </div>
        <div class="column">
          <q-slider
            :model-value="di.weight"
            @update:model-value="(v) => updateWeight(v, index)"
            :min="0"
            :max="100"
            label
            label-always
          />
          Contribution:
          {{ pctFormatter.format(positivityContribution(di)) }}
          {{ rateFormatter.format(dailyRateContribution(di)) }}
        </div>
        <div class="column">
          <q-toggle
            :model-value="di.active"
            @update:model-value="(v) => updateActive(v, index)"
          >
            Active
          </q-toggle>
          <q-btn @click="removeDataInput(di)" color="primary" rounded outline>
            Remove
          </q-btn>
        </div>
      </q-item>
      <q-item class="row justify-center">
        <div class="row items-center q-mx-md">
          <q-select
            dense
            outlined
            v-model="selectedCity"
            label="Add City"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="cityOptions"
            @filter="citiesFilter"
            @update:model-value="
              (v) => {
                newDataInput(v);
                selectedCity = '';
              }
            "
            class="q-px-sm"
            autocomplete="new-password"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="row items-center q-mx-md" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Colors,
  DataConfig,
  DataInput,
  DataRecord,
  quasarColor,
  Thresholds,
} from './models';

const emit = defineEmits(['update:modelValue']);

const pctFormatter = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  style: 'percent',
});

const rateFormatter = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
});

const props = defineProps<{
  selectedDate: string;
  modelValue: DataConfig;
  positivityThresholds: Thresholds;
  dailyRateThresholds: Thresholds;
  data: DataRecord[];
  cityList: Set<string>;
}>();

// City Selection
const cityOptions = ref(cities());
const selectedCity = ref('');

function cities(): string[] {
  return Array.from(props.cityList.values()).sort();
}

function citiesFilter(val: string, update: (fn: () => void) => void) {
  update(() => {
    const text = val.toLowerCase();
    cityOptions.value = cities().filter(
      (v) => v.toLowerCase().indexOf(text) > -1
    );
  });
}

// Modify data input values
function updateName(value: string) {
  if (!value) return;
  const newValue = props.modelValue;
  newValue.name = value;
  emit('update:modelValue', newValue);
}
function updateActive(value: boolean, index: number) {
  const newValue = props.modelValue;
  newValue.dataInputs[index].active = value;
  emit('update:modelValue', newValue);
}

function updateWeight(value: number | null, index: number) {
  if (value === null) {
    return;
  }
  const newValue = props.modelValue;
  newValue.dataInputs[index].weight = value;
  emit('update:modelValue', newValue);
}

// Add/remove data input
function newDataInput(city: string) {
  if (!city || !props.cityList.has(city)) {
    console.log(`Invalid city: ${city}.`);
    return;
  }
  if (
    props.modelValue.dataInputs.find((di) => di.city === city) !== undefined
  ) {
    console.log(`Cravenly refusing to add another ${city}.`);
    return;
  }
  const newValue = props.modelValue;
  newValue.dataInputs.push({ city: city, weight: 50, active: true });
  emit('update:modelValue', newValue);
}

function removeDataInput(di: DataInput) {
  let index = -1;
  const newValue = props.modelValue;
  while (
    (index = newValue.dataInputs.findIndex((x) => x.city === di.city)) > -1
  ) {
    newValue.dataInputs.splice(index, 1);
  }
  emit('update:modelValue', newValue);
}

// Computations

enum Metric {
  POSITIVITY,
  DAILY_RATE,
}

function totalWeight(): number {
  return props.modelValue.dataInputs
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

function getPositivity(di: DataInput) {
  return fetch(di.city, props.selectedDate, Metric.POSITIVITY);
}
function getDailyRate(di: DataInput) {
  return fetch(di.city, props.selectedDate, Metric.DAILY_RATE);
}

function netPositivity() {
  return props.modelValue.dataInputs
    .map(positivityContribution)
    .reduce((acc, w) => acc + w, 0);
}

function positivityContribution(di: DataInput) {
  if (!di.active) return 0;
  return (
    (fetch(di.city, props.selectedDate, Metric.POSITIVITY) * di.weight) /
    totalWeight()
  );
}

function dailyRateContribution(di: DataInput) {
  if (!di.active) return 0;
  return (
    (fetch(di.city, props.selectedDate, Metric.DAILY_RATE) * di.weight) /
    totalWeight()
  );
}

function netDailyRate() {
  return props.modelValue.dataInputs
    .map(dailyRateContribution)
    .reduce((acc, w) => acc + w, 0);
}

function positivityClass(positivity: number): Colors {
  if (positivity >= props.positivityThresholds.red) return Colors.RED;
  if (positivity >= props.positivityThresholds.orange) return Colors.ORANGE;
  if (positivity >= props.positivityThresholds.yellow) return Colors.YELLOW;
  return Colors.BLUE;
}

function dailyRateClass(dailyRate: number): Colors {
  if (dailyRate >= props.dailyRateThresholds.red) return Colors.RED;
  if (dailyRate >= props.dailyRateThresholds.orange) return Colors.ORANGE;
  if (dailyRate >= props.dailyRateThresholds.yellow) return Colors.YELLOW;
  return Colors.BLUE;
}

function worstClass(positivity: number, dailyRate: number): Colors {
  const pClass = positivityClass(positivity);
  const rClass = dailyRateClass(dailyRate);
  if (pClass == Colors.RED || rClass == Colors.RED) return Colors.RED;
  if (pClass == Colors.ORANGE || rClass == Colors.ORANGE) return Colors.ORANGE;
  if (pClass == Colors.YELLOW || rClass == Colors.YELLOW) return Colors.YELLOW;
  return Colors.BLUE;
}
</script>
