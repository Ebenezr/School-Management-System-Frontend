import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const gender = [
  {
    name: "MALE",
    id: "MALE",
  },
  {
    name: "FEMALE",
    id: "FEMALE",
  },
];

const StudentCreate = ({ onClose }) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  // first_name,last_name,dob,gender
  const FormSchema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    dob: z.date(),
    gender: z
      .enum(["MALE", "FEMALE"])
      .refine((value) => value === "MALE" || value === "FEMALE", {
        message: "Gender must be FEMALE' or 'MALE'",
      }),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onChange",
  });
  const queryClient = useQueryClient();

  const createPost = useMutation(
    (newPost) => axios.post(`${process.env.BASE_URL}/students/post`, newPost),
    {
      onSuccess: (response) => {
        setShowSuccessToast(true);
        queryClient.invalidateQueries(["students-data"]);
      },
      onError: () => {
        setShowErrorToast(true);
      },
    }
  );
  const { isLoading } = createPost;
  const onSubmit = async (data) => {
    try {
      createPost.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let successToastTimer;
    let errorToastTimer;

    if (showSuccessToast) {
      successToastTimer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);
    }

    if (showErrorToast) {
      errorToastTimer = setTimeout(() => {
        setShowErrorToast(false);
      }, 2000);
    }

    return () => {
      clearTimeout(successToastTimer);
      clearTimeout(errorToastTimer);
    };
  }, [showSuccessToast, showErrorToast]);

  return (
    <Modal show={false} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Add New Student
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="First Name" />
              </div>
              <Controller
                control={control}
                name="first_name"
                defaultValue=""
                render={({ field }) => (
                  <TextInput
                    id="first_name"
                    placeholder="First name"
                    required={true}
                    color={errors.first_name ? "failure" : "gray"}
                    helperText={errors.first_name?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="last_name" value="Last Name" />
              </div>
              <Controller
                control={control}
                name="last_name"
                defaultValue=""
                render={({ field }) => (
                  <TextInput
                    id="last_name"
                    placeholder="Last name"
                    required={true}
                    color={errors.last_name ? "failure" : "gray"}
                    helperText={errors.last_name?.message}
                    {...field}
                  />
                )}
              />
            </div>
            {/* <div>
              <div className="mb-2 block">
                <Label htmlFor="dob" value="Date of Birth" />
              </div>
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <DatePicker
                    id="dob"
                    placeholder="Select date of birth"
                    required={true}
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                  />
                )}
              />
            </div> */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gender" value="Gender" />
              </div>
              <Controller
                control={control}
                name="gender"
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <select
                      id="gender"
                      className={`input ${errors.gender ? "failure" : "gray"}`}
                      {...field}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      {gender.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    {errors.gender && (
                      <span className="text-failure">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="w-full">
              <Button color="purple" type="submit" isProcessing={isLoading}>
                Add Student
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StudentCreate;
