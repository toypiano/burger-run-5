export default {
  name: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Name',
      placeholder: 'John Doe',
    },
    value: '',
  },
  street: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Street',
      placeholder: 'John Doe',
    },
    value: '',
  },
  zipCode: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Zip Code',
      placeholder: '5-digit zip code(ex. 12345)',
    },
    value: '',
  },
  country: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Country',
      placeholder: 'Wakanda',
    },
    value: '',
  },
  email: {
    inputType: 'input',
    config: {
      type: 'email',
      label: 'Email',
      placeholder: 'johndoe@youremail.com',
    },
    value: '',
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
  },
};
