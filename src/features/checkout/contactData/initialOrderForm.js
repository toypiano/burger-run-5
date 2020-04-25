export default {
  name: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Name',
      placeholder: 'John Doe',
    },
    value: '',
    validation: {
      required: true,
    },
    touched: false,
    valid: false,
  },
  street: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Street',
      placeholder: 'John Doe',
    },
    value: '',
    validation: {
      required: true,
    },
    touched: false,
    valid: false,
  },
  zipCode: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Zip Code',
      placeholder: '5-digit zip code(ex. 12345)',
    },
    value: '',
    validation: {
      required: true,
      isNumeric: true,
      minLength: 5,
      maxLength: 5,
    },
    touched: false,
    valid: false,
  },
  country: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Country',
      placeholder: 'Wakanda',
    },
    value: '',
    validation: {
      required: true,
    },
    touched: false,
    valid: false,
  },
  email: {
    inputType: 'input',
    config: {
      type: 'email',
      label: 'Email',
      placeholder: 'johndoe@youremail.com',
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    touched: false,
    valid: false,
  },
  deliveryMethod: {
    inputType: 'select',
    config: {
      label: 'Delivery Method',
      options: [
        { value: '', displayValue: 'Please select one' },
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' },
      ],
    },
    value: '',
    validation: {},
    touched: false,
    valid: false,
  },
};
