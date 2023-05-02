<script setup lang="ts">

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

</script>
<template>
<div class="flex flex-center column" >
      <div class="text-h6 q-ma-md">Receptie candidati</div>
      <div class="row bg-blue-grey-1" style="min-height: 100vh; width: 90%; padding: 24px;">
        <div id="parent" class="fit column justify-center items-center q-gutter-md" style="overflow: hidden;">
          
      <q-card class="no-border-radius" style="width:90%">
      <div class="row q-gutter-md q-pa-md" >
         <q-input class="col " label="Nume prenume" style="min-width:200px;"/>
         <q-input  class="col " label="CNP / echivalent" style="min-width:200px;"/>
         <q-input class="col " label="Categoria" style="min-width:200px;"/>
         <q-input class="col " label="Angajator" style="min-width:200px;"/>
      </div>
      </q-card>
    
      <q-card class="no-border-radius" style="width:90%">
        <div class="row q-gutter-md q-pa-md" >
         <q-input class="col " label="SEX" style="min-width:200px;"/>
         <q-input  class="col " label="Varsta" style="min-width:200px;"/>
         <q-input class="col " label="Studii" style="min-width:200px;"/>
         <q-input class="col " label="Data prezentare" style="min-width:200px;"/>
      </div>
      </q-card>
    
      <q-card class="border-radius q-mb-xl">
        <q-card-section>
            <div class="row q-gutter-md q-pa-xs" >
                <q-btn color="primary" icon="mail" label="ADAUGA!" />
                <q-btn color="primary" icon="mail" label="Reset" />
             </div>
        </q-card-section>
      </q-card>
   
      <q-card class=" q-mt-xl no-border-radius">
        <div class="q-pa-md">
                <q-table
                title="Treats"
                :rows="rows"
                :columns="columns"
                row-key="name"
                />
        </div>
      </q-card>
  
        </div>
      </div>
    </div>
   
</template>