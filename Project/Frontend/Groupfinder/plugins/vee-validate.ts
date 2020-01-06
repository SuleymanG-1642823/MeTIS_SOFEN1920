import { required, confirmed, email, min } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("confirmed", {
  ...confirmed,
  message: "This confirmation field does not match"
});

extend("uppercase", {
  message: 'This field must contain at least 1 uppercase character',
  validate: (value: any) => (/.*[A-Z]+.*/.test(value))
})

extend("lowercase", {
  message: 'This field must contain at least 1 lowercase character',
  validate: (value: any) => (/.*[a-z]+.*/.test(value))
})

extend("digit", {
  message: 'This field must contain at least 1 digit',
  validate: (value: any) => (/.*[0-9]+.*/.test(value))
})

extend("min", {
  message: 'This minimum length for this field is {length}',
  validate: (value: any, args) => value.length >= args.length,
  params: ['length']
});

/*
extend("min", {
  message: 'The minimum length for this field is {1}'
}) */
