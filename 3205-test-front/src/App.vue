

<template>
  <div class="main-container">
    <h1>Email search</h1>
    <div class="input-container">
      <form @submit.prevent="fireQuery">
        <div class="input-email-wrapper">
          <input
            v-model="inputEmail"
            type="text"
            id="input-email"
            ref="inputEmailRef"
          />
          <label for="input-email">Email</label>
          <p v-if="errorEmailText" class="error-text">
            {{ errorEmailText }}
          </p>
        </div>
        <div class="input-number-wrapper">
          <input
            @input="applyMask"
            v-model="inputNumber"
            type="text"
            id="input-number"
            ref="inputNumberRef"
          />
          <label for="input-number">Number</label>
          <p v-if="errorNumberText" class="error-text">{{ errorNumberText }}</p>
        </div>
        <button type="submit" class="query-btn">Search</button>
      </form>
    </div>
    <div class="output-container">
      <img
        v-if="displayLoading"
        src="/images/loading.gif"
        alt="loading"
        class="loading-img"
      />
      <div v-if="searchResult && searchResult.length === 0">
        <h2>No results!</h2>
      </div>
      <div v-if="searchResult && searchResult.length > 0">
        <h2>Results:</h2>
        <BaseResult
          v-for="(res, i) in searchResult"
          :key="i"
          :email="res.email"
          :number="res.number"
        ></BaseResult>
      </div>
    </div>
  </div>
</template>

<script setup>
const URL = "http://localhost:3000";
import BaseResult from "./components/BaseResult.vue";
import { ref, nextTick } from "vue";
const inputEmail = ref("jams@gmail.com");
const errorEmailText = ref("");
const inputEmailRef = ref(null);
const inputNumber = ref("");
const inputNumberRef = ref(null);
const errorNumberText = ref("");
const displayLoading = ref(false);
const searchResult = ref(null);

function applyMask() {
  const selection = inputNumberRef.value.selectionStart;
  let val = inputNumber.value;
  val = val.replaceAll(/\D/g, "");
  let arr = [];
  for (let i = 0; i < val.length; i += 2) {
    arr.push(val.slice(i, i + 2));
  }
  val = arr.join("-");
  inputNumber.value = val;
  nextTick(() => {
    inputNumberRef.value.setSelectionRange(selection + 1, selection + 1);
  });
  // Маска срабатывает при каждом инпуте, не дает вводить в поле Number ничего, кроме цифр, добавляет дефисы и сохраняет позицию селектора
}

function drawError(errorSpot, errorText, errorSpotRef) {
  errorSpot.value = errorText;
  if (errorSpotRef) {
    errorSpotRef.value.classList.add("error-border");
  }
  setTimeout(() => {
    errorSpot.value = "";
    if (errorSpotRef) errorSpotRef.value.classList.remove("error-border");
  }, 2000);
  // Рисуем ошибку, если имейл не прошел валидацию, через две секунды убираем
}

function validate() {
  if (inputEmail.value.length === 0) {
    drawError(errorEmailText, "An email is required", inputEmailRef);
    return false;
  } else if (!inputEmail.value.match(/.+@.+\..+/)) {
    drawError(errorEmailText, "Please provide a valid email", inputEmailRef);
    return false;
  }
  // Тут могла бы быть валидация для Number, но в данной ситуации она не нужна, так как все неподходящие значения отсекаются еще на этапе инпута
  return true;
}

async function fireQuery() {
  console.log("validating");
  if (validate()) {
    displayLoading.value = true;
    console.log("validation passed");
    searchResult.value = null;
    const timestamp = Date.now();
    console.log("sending request");
    const response = await fetch(
      `${URL}/search?email=${inputEmail.value}&number=${inputNumber.value}&timestamp=${timestamp}`
    );
    // Таймстемп выполняет две функции: 1) используется как идентификатор запроса на бэке, чтобы ответ приходил только на последний из отправленных 2) предотвращает поведение fetch, который повторяет запрос после получения ответа, если фронт отправил несколько абсолютно одинаковых запросов
    const resData = await response.json();
    console.log(resData);
    searchResult.value = resData;
    displayLoading.value = false;
  }
}

// + 1. Переделать кнопку в форму
// + 2. Убрать дублирование таймстемпов на бэке
// 3. Добавить картинку загрузки
// 4. Навести красоту
// 5. Написать комментов
</script>

<style scoped lang="sass">
.main-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

#input-email
  display: flex
  align-items: center
  justify-content: center

#input-number
  display: flex
  align-items: center
  justify-content: center

.input-email-wrapper, .input-number-wrapper
  display: flex
  flex-direction: column
  align-items: start
  justify-content: center
  padding: 8px

label
  margin-top: 4px

.error-text
  font-size: 12px
  color: red

.error-border
  border: 2px solid red

.query-btn
  margin: 12px

.loading-img
  max-width: 60px
  margin: 24px
</style>


