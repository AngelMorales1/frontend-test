<template>
  <div class="about">
    <div class="text">
      <span>FAST MONEY</span>
      <h1>Currency converter</h1>
      <p>
        Convert popular currencies from around the world with updated exchange rates using our
        calculator.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="converter">
      <div class="currency">
        <div class="currency-list">
          <label for="divisa-origen">FROM</label>
          <select v-if="currencies.length > 0" v-model="formValues.from" name="from" id="from">
            <option v-for="currency in currencies" :value="currency" :key="currency">
              {{ currency }}
            </option>
          </select>
          <p v-else>Loading currencies...</p>
        </div>
        <input
          type="text"
          name="amount"
          id="amount"
          placeholder="Enter here"
          v-model="formValues.amount"
        />
      </div>
      <button type="submit" :disabled="loading">
        <img src="../assets/convertIcon.png" />
      </button>
      <div class="currency">
        <div class="currency-list">
          <label for="to">TO</label>
          <select v-if="currencies.length > 0" v-model="formValues.to" :placeholder="currencies[0]">
            <option v-for="currency in currencies" :value="currency" :key="currency">
              {{ currency }}
            </option>
          </select>
        </div>
        <input type="text" disabled v-model="result" />
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const currencies = ref([])
const formValues = reactive({
  from: 'ARS',
  to: 'USD',
  amount: ''
})

const result = ref(0)

const loading = ref(false)

onMounted(async () => {
  try {
    const response = await axios.get('https://openexchangerates.org/api/currencies.json')
    currencies.value = Object.keys(response.data)
  } catch (error) {
    useToast().error(error)
  }
})

const validateForm = () => {
  let isValid = true
  if (!formValues.from) {
    useToast().error('Please enter "from" currency')
    isValid = false
  }

  if (!formValues.to) {
    useToast().error('Please enter "to" currency')
    isValid = false
  }

  if (!formValues.amount) {
    useToast().error('Please enter the amount')
    isValid = false
  } else {
    const regex = /^[0-9]+$/
    if (!regex.test(formValues.amount)) {
      useToast().error('Please only submit numbers on the amout input')
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  if (validateForm()) {
    useToast().info('Cargando')
    loading.value = true
    try {
      let { data } = await axios.post('http://localhost:3000/convert', formValues)
      result.value = data.convertion
      loading.value = false
      useToast().success('Conversion completada')
    } catch (error) {
      useToast().error(error)
    }
  }
}
</script>

<style scoped>
.about {
  padding: 50px 30px;
  background: #f8f8f8;
  height: 100%;
  margin: auto;
}
.text {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.converter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 0px 1px #0a090b0d;
  box-shadow: 0px 6px 16px 0px #0a090b14;
}

.currency {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.currency-list {
  display: flex;
  flex-direction: column;
}

button {
  background: transparent;
  border: none;
  border-radius: 50%;
}

select {
  border: none;
  color: #88939d;
  width: 100px;
  font-size: 18px;
}

input {
  border: none;
  max-width: 100px;
  font-size: 18px;
  outline: none;
  background: transparent;
}

input::placeholder {
  color: #4facfe;
}

input:focus {
  background: transparent;
}

img {
  width: 56px;
  margin: auto;
  font-size: 36px;
}

label {
  font-size: 18px;
  color: #88939d;
  padding-bottom: 10px;
}
.footer {
  position: absolute;
  padding: 10px 30px;
  bottom: 0;
}
@media screen and (min-width: 768px) {
  .converter {
    flex-direction: row;
    margin: 20px auto;
    width: 75%;
    max-width: 1000px;
  }
  h1 {
    font-size: 72px;
  }
  .currency {
    width: 40%;
  }
}
</style>
