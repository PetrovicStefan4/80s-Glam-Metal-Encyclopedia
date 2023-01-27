import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { dehydrate, useMutation, useQuery } from "react-query";
import Select from "react-select";
import { ReactSelectOption } from "../../@types/common";
import ButtonAdd from "../../components/ButtonAdd";
import RecordLabelCard from "../../components/common/RecordLabelCard";
import UploadPhotoLabel from "../../components/common/uploadPhotoLabel";
import Modal from "../../components/Modal";
import api from "../../utils/api";
import yearOptions from "../../utils/data/yearOptions";
import getQueryClient from "../../utils/queryClient";
import { inputStyle, textAreaStyle } from "../../utils/styles/formStyles";
import { useToggle } from "react-use";
import ModalHeading from "../../components/modal/ModalHeading";
import { buttonPrimaryStyles } from "../../utils/styles/buttonStyles";
import { route } from "next/dist/server/router";

const RecordLabelsListPage = () => {
  const [modal, toggleModal] = useToggle(false);
  const router = useRouter();
  const { query } = router;

  const { data: recordLabels } = useQuery<any>(
    ["record-labels", { params: router?.query }],
    {
      refetchOnWindowFocus: true,
    }
  );

  const renderRecordLabels = recordLabels?.docs?.map((recordLabel: any) => {
    return (
      <RecordLabelCard
        id={recordLabel.id}
        name={recordLabel.name}
        formedAt={recordLabel.formedAt}
        image={recordLabel.image}
      />
    );
  });

  type FieldsValue = {
    name: string;
    formedAt: ReactSelectOption;
    info: string;
    image: any;
    city: string;
    country: string;
  };

  const methods = useForm<FieldsValue>({});

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
  } = methods;

  const { mutateAsync: createRecordLabel } = useMutation(
    async (data: FieldsValue) => {
      return api.post("/record-labels", data);
    },
    {
      onSettled: () => {
        router.push("/record-labels");
      },
    }
  );

  return (
    <>
      <div className="bg-gray-800 py-5 mb-5">
        <h1 className="text-3xl font-bold text-center text-white mb-10 lg:mb-2">
          Record Labels
        </h1>
        <form className="container mx-auto">
          <div className="flex justify-between items-center">
            <ButtonAdd
              text={"Add New Record Label"}
              onClick={() => toggleModal(true)}
            />
            <select className="rounded-full text-gray-800 font-semibold">
              <option className="font-semibold" value="name-asc">
                Name ASC
              </option>
              <option className="font-semibold" value="name-desc">
                Name DESC
              </option>
            </select>
          </div>
        </form>
      </div>
      <div className="container mx-auto">
        
        <div
          className={
            "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }
        >
          {renderRecordLabels}
        </div>
      </div>
      {modal && (
        <Modal onDismiss={() => toggleModal(false)}>
          <div className="bg-gray-100 p-10 rounded">
            <ModalHeading title={"Add Record Label"} action={"create"} />
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit((data: FieldsValue) => {
                  createRecordLabel(data);
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
                      htmlFor="info"
                    >
                      Info
                    </label>
                    <textarea
                      className={clsx(textAreaStyle)}
                      {...register("info")}
                      id="info"
                    ></textarea>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="image"
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
                                <UploadPhotoLabel title="Upload record label image" />
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
        </Modal>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  query,
}: any) => {
  const { id } = query;

  const queryClient = getQueryClient();

  await queryClient.fetchQuery(["record-labels", { params: query }]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default RecordLabelsListPage;
