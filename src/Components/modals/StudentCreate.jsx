import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const StudentCreate = ({
  onClose,
  open,
  setShowErrorToast,
  setShowSuccessToast,
}) => {
  const FormSchema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    dob: z.date(),
    gender: z
      .enum(["MALE", "FEMALE"])
      .refine((value) => value === "MALE" || value === "FEMALE", {
        message: "Gender must be FEMALE' or 'MALE'",
      }),
    classId: z
      .number()
      .int({ message: "Please select a class/Grade" })
      .refine((value) => value !== 0, {
        message: "Please select a Class/Grade",
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

  // reset form
  useEffect(() => {
    reset({
      first_name: "",
      last_name: "",
      dob: "",
      classId: 0,
      gender: "MALE",
    });
  }, [reset]);

  // for dropdown
  const fetchClassList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/classes/all`
      );
      return response.data.grade;
    } catch (error) {
      throw new Error("Error fetching guest data");
    }
  };
  const { data: classList } = useQuery(["class-data"], fetchClassList, {
    cacheTime: 10 * 60 * 1000, // cache for 10 minutes
  });

  const createPost = useMutation(
    (newPost) =>
      axios.post(`${process.env.REACT_APP_BASE_URL}/students/post`, newPost),
    {
      onSuccess: () => {
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

  return (
    <Modal show={open} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 relative z-0">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Add New Student
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="first_name"
                  value="First Name"
                  color={errors.first_name ? "failure" : "gray"}
                />
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
                <Label
                  htmlFor="last_name"
                  value="Last Name"
                  color={errors.last_name ? "failure" : "gray"}
                />
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dob" value="Date of Birth" />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <Controller
                  control={control}
                  name="dob"
                  render={({ field }) => (
                    <ReactDatePicker
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      dateFormat="yyyy-MM-dd"
                      appearance="default"
                      id="dob"
                      placeholderText="Select date of birth"
                      required={true}
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="gender"
                  value="Gender"
                  color={`${errors.gender ? "failure" : "gray"}`}
                />
              </div>
              <Controller
                control={control}
                name="gender"
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <Select
                      id="gender"
                      value={field.value}
                      color={`${errors.gender ? "failure" : "gray"}`}
                      {...field}
                      helperText={errors.gender?.message}
                      required={true}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      {gender.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Select>
                    {errors.gender && (
                      <span className="text-failure">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            {/* select class */}
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="classId"
                  value="Class / Grade"
                  color={`${errors.classId ? "failure" : "gray"}`}
                />
              </div>
              <Controller
                control={control}
                name="classId"
                defaultValue={0}
                render={({ field }) => (
                  <div>
                    <Select
                      id="classId"
                      type="number"
                      value={field.value}
                      color={`${errors.classId ? "failure" : "gray"}`}
                      required={true}
                      helperText={errors.classId?.message}
                      {...field}
                    >
                      <option value={0} disabled>
                        Select class
                      </option>
                      {classList?.map((option) => (
                        <option key={option.id} value={Number(option.id)}>
                          {option.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
              />
            </div>

            <div className="w-full mt-3 flex items-end">
              <Button
                className="ml-auto"
                color="purple"
                type="submit"
                isProcessing={isLoading}
              >
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
