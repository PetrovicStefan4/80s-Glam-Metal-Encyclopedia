import ButtonAdd from "../../components/ButtonAdd";
import AlbumCard from "../../components/common/AlbumCard";
import Navbar from "../../components/Navbar";
import paginationTheme from "../../styles/Pagination.module.scss";
import Pagination from "@etchteam/next-pagination";
import Head from "next/head";
import { GetServerSideProps } from "next";
import getQueryClient from "../../utils/queryClient";
import { dehydrate, useMutation, useQuery } from "react-query";
import shouldShowPagination from "../../utils/common/shouldDispalayPagination";
import Modal from "../../components/Modal";
import { useToggle } from "react-use";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import api from "../../utils/api";
import IRecordLabel from "../../@types/record-label";
import {
  inputStyle,
  selectStyle,
  textAreaStyle,
} from "../../utils/styles/formStyles";
import clsx from "clsx";
import yearOptions from "../../utils/data/yearOptions";
import Select from "react-select";
import ModalHeading from "../../components/modal/ModalHeading";
import { useRouter } from "next/router";
import { buttonPrimaryStyles } from "../../utils/styles/buttonStyles";
import IBand from "../../@types/band";

interface FieldValues {
  title: string;
  artist: string;
  year: string;
  format?: "LP" | "EP";
  cover: string;
  recordLabel?: string;
  info: string;
}

const AlbumsListPage = () => {
  // Router

  const router = useRouter();

  // States

  const [modal, toggleModal] = useToggle(false);

  // React Hook Form

  const methods = useForm<FieldValues>();

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const { mutateAsync: createAlbum } = useMutation(
    (data: any) => {
      return api.post("/albums", data);
    },
    {
      onSettled: () => {
        toggleModal(false);
        reset();
      },
    }
  );

  // For second version of this app

  // const {
  //   fields: songs,
  //   append: appendSong,
  //   remove: removeSong,
  // } = useFieldArray({
  //   control,
  //   name: "song",
  // });

  // React Query

  const { data: albums } = useQuery<any>(
    ["albums", { params: router?.query }],
    {
      refetchOnWindowFocus: true,
    }
  );

  const { data: bands } = useQuery<any>(["bands"], {
    refetchOnWindowFocus: true,
  });

  const { data: recordLabels } = useQuery<any>(["record-labels"], {
    refetchOnWindowFocus: true,
  });

  const bandsData: IBand[] = bands?.docs;

  const recordLabelsData: IRecordLabel[] = recordLabels?.docs;

  console.log(watch());

  const onDismiss = () => {
    toggleModal(false);
    reset();
  };

  return (
    <>
      <Head>
        <title>List of Albums</title>
      </Head>
      <div className="bg-gray-800 py-5 mb-5">
        <h1 className="text-3xl font-bold text-center text-white mb-10 lg:mb-2">
          Albums
        </h1>
        <form className="container mx-auto">
          <div className="flex justify-between items-center">
            <ButtonAdd
              text={"Add New Album"}
              onClick={() => toggleModal(true)}
            />
            <select className="rounded-full text-gray-800 font-semibold">
              <option className="font-semibold" value="name-asc">
                Name ASC
              </option>
              <option className="font-semibold" value="name-desc">
                Name DESC
              </option>
              <option className="font-semibold" value="year-asc">
                Year ASC
              </option>
              <option className="font-semibold" value="year-desc">
                Year DESC
              </option>
            </select>
          </div>
        </form>
      </div>
      <main className={"container mx-auto"}>
        {shouldShowPagination(albums) && (
          <div className="mb-10">
            <Pagination
              total={albums.totalDocs}
              theme={paginationTheme}
              sizes={[5, 10, 20]}
            />
          </div>
        )}
        <div className={"grid gap-5 grid-cols-2 lg:grid-cols-5 "}>
          {albums?.docs.map((album: any) => {
            const { id, title, artist, year, cover } = album;

            return (
              <AlbumCard
                key={id}
                link={`/albums/${id}`}
                title={title}
                artist={artist.name}
                year={year}
                cover={cover}
              />
            );
          })}
        </div>
      </main>
      {modal && (
        <Modal onDismiss={() => onDismiss()}>
          <div className="bg-gray-100 p-10 rounded">
            <ModalHeading title={"Add New Album"} action={"create"} />
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit((data: any) => {
                  createAlbum(data);
                })}
              >
                <div className={"grid grid-cols-2 gap-5"}>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="title"
                    >
                      Title*
                    </label>
                    <input
                      className={clsx(inputStyle)}
                      {...register("title", { required: true })}
                      id="title"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="artist"
                    >
                      Band/Artist*
                    </label>
                    <Controller
                      control={control}
                      name="artist"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <Select
                          options={bandsData}
                          onChange={(value) => setValue("artist", value?.id)}
                          getOptionValue={(item) => item?.id}
                          getOptionLabel={(item) => item.name}
                          required={true}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="year"
                    >
                      Year
                    </label>
                    <Controller
                      control={control}
                      name="year"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <Select
                          options={yearOptions}
                          onChange={(value) =>
                            setValue("year", value?.label as string)
                          }
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="format"
                    >
                      Format
                    </label>
                    <select
                      className={clsx(selectStyle)}
                      id="format"
                      {...register("format")}
                    >
                      <option value={"LP"}>LP</option>
                      <option value={"EP"}>EP</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="recordLabel"
                    >
                      Record label
                    </label>
                    <Controller
                      control={control}
                      name="recordLabel"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <Select
                          options={recordLabelsData}
                          onChange={(value) =>
                            setValue("recordLabel", value?.id)
                          }
                          getOptionValue={(item) => item?.id}
                          getOptionLabel={(item) => item.name}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="cover"
                    >
                      Image
                    </label>
                    <input
                      className={clsx(inputStyle)}
                      {...register("cover")}
                      id="cover"
                      type="text"
                      placeholder="Add link to the cover image"
                    />
                  </div>
                  <div className="mb-3">
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
                  {/* <div>
                  {songs.length !== 0 && (
                    <div className={"grid gap-5 grid-cols-6"}>
                      <p className="col-span-4 text-gray-700 text-sm font-bold mb-2">
                        Title
                      </p>
                      <p className="text-gray-700 text-sm text-center font-bold mb-2">
                        Duration
                      </p>
                    </div>
                  )}
                  {songs.map((field, index) => (
                    <div
                      className={"grid gap-5 grid-cols-6 mb-2"}
                      key={field.id}
                    >
                      <input
                        className={clsx(inputStyle, "col-span-4")}
                        {...register(`songs.${index}.title`)}
                        type="text"
                        placeholder="Song name"
                      />
                      <input
                        className={clsx(inputStyle, "text-center")}
                        {...register(`songs.${index}.duration`)}
                        type="text"
                        placeholder="mm:ss"
                      />
                      <div
                        className="flex justify-center items-center rounded bg-red-500 text-white hover:cursor-pointer"
                        onClick={() => removeSong(index)}
                      >
                        <span> - Remove</span>
                      </div>
                    </div>
                  ))}
                  <div
                    className="flex justify-start text-red-500 mb-5 transition ease-in-out duration-200 hover:cursor-pointer hover:text-red-600"
                    onClick={appendSong}
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Add song</span>
                  </div>
                </div> */}
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

export default AlbumsListPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  query,
}: any) => {
  const queryClient = getQueryClient();

  await queryClient.fetchQuery(["bands"]);

  await queryClient.fetchQuery(["record-labels"]);

  await queryClient.fetchQuery(["albums", { params: query }]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
