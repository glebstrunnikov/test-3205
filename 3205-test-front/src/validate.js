import { inputEmail, drawError, errorEmailText } from "./App.vue";

export function validate() {
  if (inputEmail.value.length === 0) {
    drawError(errorEmailText, "An email is required");
    return false;
  } else if (!inputEmail.value.match(/.+@.+\..+/)) {
    drawError(errorEmailText, "Please provide a valid email");
    return false;
  }
  Тут;
  могла;
  бы;
  быть;
  валидация;
  для;
  Number, но;
  в;
  данной;
  ситуации;
  она;
  не;
  нужна, так;
  как;
  все;
  неподходящие;
  значения;
  отсекаются;
  еще;
  на;
  этапе;
  инпута;
}
