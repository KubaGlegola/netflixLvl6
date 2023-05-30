import React, { useMemo, useState } from "react";
import "./SimpleForm.styles.scss";
import { IForm } from "../../interfaces/IForm";
import { IBasicValidator } from "../../interfaces/IBasicValidator";
import InputMask from "react-input-mask";

const SimpleForm: React.FC = () => {
  const [form, setForm] = useState<IForm>({
    fullName: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    cardNumber: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    expiryDate: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    CVV: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });

  const isFormValid = useMemo(
    () => Object.values(form).every(({ isValid }) => isValid),
    [form]
  );

  const basicValidator: IBasicValidator = {
    fullName: (value: string) =>
      /([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,} )([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,})/.test(
        String(value)
      ) || "Full name is incorrect",
    cardNumber: (value: string) =>
      /([0-9]{4} )([0-9]{4} )([0-9]{4} )([0-9]{4})/.test(String(value)) ||
      "Card number is incorrect",
    expiryDate: (value: string) =>
      /([0-9]{2})([/])([0-9]{2})/.test(String(value)) ||
      "Expiry date is incorrect",
    CVV: (value: string) =>
      /([0-9]{3})/.test(String(value)) || "CVV is incorrect",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      console.log(form);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const validator = basicValidator[name];
    let isValid = true;
    let errorMessage = "";

    if (validator) {
      const validatorValue = validator(value);

      if (typeof validatorValue === "string") {
        isValid = !validatorValue;
        errorMessage = validatorValue;
      }
    }

    setForm({
      ...form,
      [name]: { ...form[name], value, isValid, errorMessage },
    });
  };

  return (
    <form className="simple-form" onSubmit={handleSubmit}>
      <input
        className="simple-form__input"
        type="text"
        name="fullName"
        placeholder="Name on card"
        onChange={handleFormChange}
      />
      {form["fullName"].errorMessage && (
        <p className="simple-form__error-message">
          {form["fullName"].errorMessage}
        </p>
      )}
      <InputMask
        className="simple-form__input"
        type="text"
        name="cardNumber"
        placeholder="Card number"
        onChange={handleFormChange}
        required
        mask="9999 9999 9999 9999"
      />
      {form["cardNumber"].errorMessage && (
        <p className="simple-form__error-message">
          {form["cardNumber"].errorMessage}
        </p>
      )}
      <div className="simple-form__flex-container">
        <div>
          <InputMask
            className="simple-form__input"
            type="text"
            name="expiryDate"
            placeholder="Expiry date (MM/YY)"
            onChange={handleFormChange}
            mask="99/99"
          />
          {form["expiryDate"].errorMessage && (
            <p className="simple-form__error-message">
              {form["expiryDate"].errorMessage}
            </p>
          )}
        </div>
        <div>
          <InputMask
            className="simple-form__input"
            type="text"
            name="CVV"
            placeholder="CVV"
            onChange={handleFormChange}
            mask="999"
          />
          {form["CVV"].errorMessage && (
            <p className="simple-form__error-message">
              {form["CVV"].errorMessage}
            </p>
          )}
        </div>
      </div>
      <button
        className="simple-form__button"
        type="submit"
        disabled={!isFormValid}
      >
        Next step
      </button>
    </form>
  );
};

export default SimpleForm;
