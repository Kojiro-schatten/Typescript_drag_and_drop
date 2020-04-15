//Validation 文字数制限
export interface Validatable {
  value: string | number;
  // ? = value or undefined. => 無くても良い。
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    // typeGuardが無いと、Validatableは常にstringを返すわけでは無いのでtrimエラーとなる
    // 今回は、toStringを使ってtypeGuardは実装していない。
    if (validatableInput.required){
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // Description
    if (
      validatableInput.minLength != null && 
      typeof validatableInput.value === 'string'
      ) {
      isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (
      validatableInput.maxLength != null && 
      typeof validatableInput.value === 'string'
      ) {
      isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
  }
  // People
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value < validatableInput.max;
  }
  return isValid;
}
