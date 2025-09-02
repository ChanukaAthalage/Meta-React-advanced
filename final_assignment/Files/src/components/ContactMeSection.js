import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { submit, isLoading, response } = useSubmit();
  const { onOpen } = useAlertContext();

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    type: Yup.string().required("Please select an enquiry type"),
    comment: Yup.string()
      .min(25, "Please enter at least 25 characters")
      .required("A message is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",      // important: start empty so user must choose
      comment: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Call the provided submit helper (adjust if your hook expects (endpoint, values))
      await submit(values);
    },
  });

  // Handle API response: show alert; reset form on success
  useEffect(() => {
    if (!response) return;

    if (response.type === "success") {
      onOpen("success", `Thanks, ${formik.values.firstName}! ${response.message}`);
      formik.resetForm();
    } else if (response.type === "error") {
      onOpen("error", response.message);
    }
  }, [response, onOpen, formik.values.firstName, formik.resetForm]); // if your ESLint complains, just use [response]

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>

        <Box p={6} rounded="md" w="100%">
          {/* Connect onSubmit to Formik */}
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>

              {/* Name */}
              <FormControl
                isInvalid={formik.touched.firstName && Boolean(formik.errors.firstName)}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              {/* Email */}
              <FormControl
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              {/* Type of enquiry (the important one) */}
              <FormControl
                isInvalid={formik.touched.type && Boolean(formik.errors.type)}
              >
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  aria-label="Type of enquiry"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {/* Explicit placeholder with empty value */}
                  <option value="">Select option</option>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
              </FormControl>

              {/* Message */}
              <FormControl
                isInvalid={formik.touched.comment && Boolean(formik.errors.comment)}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
