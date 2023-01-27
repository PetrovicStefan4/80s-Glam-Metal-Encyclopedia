import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, useMutation, useQuery } from "react-query";
import IRecordLabel from "../../@types/record-label";
import getQueryClient from "../../utils/queryClient";
import Head from "next/head";
import Modal from "../../components/Modal";
import { useToggle } from "react-use";
import { ReactSelectOption } from "../../@types/common";
import api from "../../utils/api";
import Button from "../../components/common/Button";
import { useState } from "react";
import EditRecordLabel from "../../components/pages/record-labels/modals/EditRecordLabel";
import DeleteRecordLabel from "../../components/pages/record-labels/modals/DeleteRecordLabel";
import { IAlbum } from "../../@types/album";
import AlbumCard from "../../components/common/AlbumCard";

type FieldsValue = {
  name: string;
  formedAt?: ReactSelectOption;
  info?: string;
  image?: any;
  city?: string;
  country?: string;
};

const RecordLabelPage = () => {
  // State

  const [modal, toggleModal] = useToggle(false);
  const [action, setAction] = useState<"edit" | "delete">("edit");

  const a =
    "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU=";

  // Router

  const router = useRouter();

  const { id } = router?.query;

  const { data: recordLabel } = useQuery<IRecordLabel>(
    [`record-labels/${id}`],
    {
      refetchOnWindowFocus: true,
    }
  );

  const { data: albums } = useQuery<any>(
    [`albums`, { params: { recordLabel: id } }],
    {
      refetchOnWindowFocus: true,
    }
  );

  const renderAlbums = albums?.map((album: IAlbum) => {
    return (
      <AlbumCard
        key={album.id}
        link={`/albums/${album?.id}`}
        title={album?.title}
        artist={album?.artist?.name}
        year={album?.year}
        cover={album?.cover}
      />
    );
  });

  const { mutateAsync: updateRecordLabel } = useMutation(
    async (data: FieldsValue) => {
      return api.put(`/record-labels/${id}`, {
        ...recordLabel,
        ...data,
      });
    },
    {
      onSettled: () => {
        router.replace("/record-labels");
      },
    }
  );

  const { mutateAsync: deleteRecordLabel } = useMutation(
    () => {
      return api.delete(`/record-labels/${id}`, {});
    },
    {
      onSettled: () => {
        router.replace("/record-labels");
      },
    }
  );

  return (
    <>
      <Head>
        <title>{recordLabel?.name}</title>
      </Head>
      <div className="container mx-auto pt-10">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-900 mb-8 pb-5 lg:pb-0">
          <div className="col-span-6 lg:col-span-3">
            <div className="mb-5">
              {!recordLabel?.image && (
                <div className="h-48 w-48 rounded-full overflow-hidden">
                  <div
                    className="h-48 w-48 background-image rounded-full"
                    style={{ backgroundImage: `url(${a})` }}
                  ></div>
                </div>
              )}
              {recordLabel?.image && (
                <div className="h-48 w-48 rounded-full overflow-hidden">
                  <div
                    className="h-48 w-48 background-image rounded-full"
                    style={{
                      backgroundImage: `url(${recordLabel?.image?.path})`,
                    }}
                  ></div>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-5">{recordLabel?.name}</h2>
          </div>
          <div className="col-span-6 lg:col-span-2 py-5">
            <div className="mb-3">
              <h3 className="text-lg font-bold">Founded:</h3>
              <p>{recordLabel?.formedAt ? recordLabel?.formedAt : "unknown"}</p>
            </div>

            <div className="mb-3">
              <h3 className="text-lg font-bold">Country:</h3>
              <p>{recordLabel?.country}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">City:</h3>
              <p>{recordLabel?.city}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 py-5">
            <h3 className="text-lg font-bold">Info:</h3>
            <p>{recordLabel?.info}</p>
          </div>
          <div className="col-span-12 lg:col-span-2">
            <div className="mb-3">
              <Button
                onClick={() => {
                  setAction("edit");
                  toggleModal(true);
                }}
                type={"edit"}
                text={"Edit"}
                variant={"primary"}
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  setAction("delete");
                  toggleModal(true);
                }}
                type={"delete"}
                text={"Delete"}
                variant={"primary"}
              />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3">Releases:</h2>
        <div className="grid grid-cols-5 gap-5">{renderAlbums}</div>
      </div>
      {modal && (
        <Modal onDismiss={() => toggleModal(false)}>
          {action === "edit" && (
            <EditRecordLabel
              recordLabel={recordLabel}
              onSubmit={(data: FieldsValue) => {
                updateRecordLabel(data);
              }}
            />
          )}
          {action === "delete" && (
            <DeleteRecordLabel
              recordLabel={recordLabel}
              onSubmit={deleteRecordLabel}
              onDismiss={() => toggleModal(false)}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default RecordLabelPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  query,
}: any) => {
  const { id } = query;

  const queryClient = getQueryClient();

  await queryClient.fetchQuery([`record-labels/${id}`]);

  await queryClient.fetchQuery([`albums`, { params: { recordLabel: id } }]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
