import clsx from "clsx";
import React from "react";
import Dropzone from "react-dropzone";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ReactSelectOption } from "../../../../@types/common";
import yearOptions from "../../../../utils/data/yearOptions";
import { inputStyle, textAreaStyle } from "../../../../utils/styles/formStyles";
import UploadPhotoLabel from "../../../common/uploadPhotoLabel";
import ModalHeading from "../../../modal/ModalHeading";
import Select from "react-select";
import { buttonPrimaryStyles } from "../../../../utils/styles/buttonStyles";

interface Props {
  onSubmit: any;
}

const CreateBand = (props: Props) => {
  const { onSubmit } = props;

  type FieldsValue = {
    name: string;
    formedAt: ReactSelectOption;
    info: string;
    image: any;
    country: string;
    city: string;
  };

  const methods = useForm<FieldsValue>({});

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  return (
    <div className="bg-gray-100 p-10 rounded">
      <ModalHeading title={"Add New Band"} action={"create"} />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data: FieldsValue) => {
            onSubmit(data);
          })}
        >
          <div className="grid grid-cols-2 gap-5 mb-10">
            <div className="col-span-2 lg:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name*
              </label>
              <input
                className={clsx(inputStyle)}
                {...register("name", { required: true })}
                id="name"
                type="text"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="formedAt"
              >
                Formed
              </label>
              <Controller
                control={control}
                name="formedAt"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <Select
                    options={yearOptions}
                    onChange={(value: any) =>
                      setValue("formedAt", value?.label)
                    }
                  />
                )}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className={clsx(inputStyle)}
                {...register("country")}
                id="country"
                type="text"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className={clsx(inputStyle)}
                {...register("city")}
                id="city"
                type="text"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="info"
              >
                Info
              </label>
              <textarea
                className={textAreaStyle}
                {...register("info", { required: true })}
                id="info"
              ></textarea>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="info"
              >
                Image
              </label>
              <Controller
                control={control}
                name="image"
                render={({
                  field: { onChange, onBlur, value, ref },
                  formState,
                  fieldState,
                }) => (
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const reader = new FileReader();
                      let image;

                      reader.onloadend = () => {
                        const photo = reader.result;
                        const name = acceptedFiles[0].name;
                        image = { path: photo, name: name };

                        setValue("image", image);
                      };
                      reader.readAsDataURL(acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section className="bg-white p-3 border border-gray-800 rounded mb-5">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <UploadPhotoLabel title="Upload band image" />
                        </div>
                      </section>
                    )}
                  </Dropzone>
                )}
              />
            </div>
          </div>
          <input className={buttonPrimaryStyles} type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBand;
