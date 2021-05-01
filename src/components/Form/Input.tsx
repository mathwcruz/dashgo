import { FieldError } from "react-hook-form";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      {/* caso a prop label seja passada, renderiza o componente */}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled"
        _hover={{ bg: "gray.900" }}
        size="lg"
        ref={ref}
        {...rest}
      />

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      ) }
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
