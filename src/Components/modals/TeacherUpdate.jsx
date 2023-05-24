import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "react-datepicker/dist/react-datepicker.css";

const TeacherUpdate = ({
  onClose,
  open,
  objData,
  setShowErrorToast,
  setShowSuccessToast,
}) => {
  const FormSchema = z.object({
    id: z.number().optional(),
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    phone: z
      .string()
      .regex(/^(\+?\d{2,3})?0?\d{9}$/, { message: "Invalid phone number" }),
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
      id: objData?.id ?? 0,
      first_name: objData?.first_name ?? "",
      last_name: objData?.last_name ?? "",
      phone: objData?.phone ?? "",
    });
  }, [reset, objData]);

  const updatePost = useMutation(
    (updatedPost) => {
      const { id, ...postData } = updatedPost;
      axios.patch(`${process.env.REACT_APP_BASE_URL}/teacher/${id}`, postData);
    },
    {
      onSettled: (error) => {
        if (error) {
          setShowErrorToast(true);
        } else {
          setShowSuccessToast(true);
          queryClient.invalidateQueries(["teachers-data"]);
          reset();
          onClose();
        }
      },
    }
  );
  const { isLoading } = updatePost;
  const onSubmit = async (data) => {
    try {
      updatePost.mutate(data);
    } catch (error) {
      setShowErrorToast(true);
    }
  };

  return (
    <Modal show={open} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 relative z-0">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Update Teacher
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label
                htmlFor="id"
                value="ID"
                color={`${errors.id ? "failure" : "gray"}`}
              />
              <Controller
                control={control}
                name="id"
                defaultValue={objData?.id ?? 0}
                render={({ field }) => (
                  <TextInput
                    id="id"
                    placeholder="ID"
                    required={true}
                    color={`${errors.id ? "failure" : "gray"}`}
                    helperText={errors.id?.message}
                    {...field}
                    disabled={true}
                  />
                )}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Full Name"
                  color={errors.name ? "failure" : "gray"}
                />
              </div>
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <TextInput
                    id="name"
                    placeholder="John Doe"
                    required={true}
                    color={errors.name ? "failure" : "gray"}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Email"
                  color={errors.email ? "failure" : "gray"}
                />
              </div>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <TextInput
                    id="email"
                    placeholder="name@mail.com"
                    required={true}
                    color={errors.email ? "failure" : "gray"}
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="role"
                  value="Role"
                  color={`${errors.role ? "failure" : "gray"}`}
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Controller
                  control={control}
                  name="activeStatus"
                  defaultValue={objData?.activeStatus ?? false}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      id="activeStatus"
                      label="Can Login"
                      {...field}
                    />
                  )}
                />
                <Label
                  htmlFor="activeStatus"
                  value="Can Login"
                  color={`${errors.activeStatus ? "failure" : "gray"}`}
                />
              </div>
            </div>

            <div className="w-full mt-3 flex items-end">
              <Button
                className="ml-auto"
                color="purple"
                type="submit"
                isProcessing={isLoading}
              >
                Save Teacher
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TeacherUpdate;
