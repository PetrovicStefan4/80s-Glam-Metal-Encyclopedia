import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, useMutation, useQuery } from "react-query";
import getQueryClient from "../../utils/queryClient";
import Head from "next/head";
import { IAlbum } from "../../@types/album";
import AlbumCard from "../../components/common/AlbumCard";
import { ReactSelectOption } from "../../@types/common";
import api from "../../utils/api";
import { useToggle } from "react-use";
import Modal from "../../components/Modal";
import EditBand from "../../components/pages/bands/modals/EditBand";
import { useState } from "react";
import DeleteBand from "../../components/pages/bands/modals/DeleteBand";
import Button from "../../components/common/Button";
import shouldShowPagination from "../../utils/common/shouldDispalayPagination";
import Pagination from "@etchteam/next-pagination";

type FieldValues = {
  name: string;
  formedAt: ReactSelectOption;
  info: string;
  image: any;
  country: string;
  city: string;
};

const BandPage = () => {
  // State

  const [modal, toggleModal] = useToggle(false);
  const [action, setAction] = useState<"edit" | "delete">("edit");

  const a =
    "https://www.gannett-cdn.com/media/Phoenix/Phoenix/2014/07/15/1405461691000-phxdc5-6g69q2om5hsvjmf56ei-original-1-.jpg";

  // Router

  const router = useRouter();

  const { id } = router?.query;

  // React query

  const { data: band } = useQuery<any>([`bands/${id}`], {
    refetchOnWindowFocus: true,
  });

  const { data: albums } = useQuery<IAlbum[]>(
    [`albums`, { params: { artist: id } }],
    {
      refetchOnWindowFocus: true,
    }
  );

  const { mutateAsync: updateBand } = useMutation(
    async (data: FieldValues) => {
      return api.put(`/bands/${id}`, {
        ...band,
        ...data,
      });
    },
    {
      onSettled: () => {
        toggleModal(false);
      },
    }
  );

  const { mutateAsync: deleteBand } = useMutation(
    () => {
      return api.delete(`/bands/${id}`, {});
    },
    {
      onSettled: () => {
        router.replace("/bands");
      },
    }
  );

  // Rendering elements

  const renderAlbums = albums?.map((album) => {
    return (
      <AlbumCard
        key={album?.id}
        link={`/albums/${album?.id}`}
        title={album?.title}
        artist={band?.name}
        year={album?.year}
        cover={album?.cover}
      />
    );
  });

  return (
    <>
      <Head>
        <title>{band?.name}</title>
      </Head>
      <div className="container mx-auto pt-10">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-900 mb-8 pb-5 lg:pb-0">
          <div className="col-span-6 lg:col-span-3">
            <div className="mb-5">
              {!band?.image && (
                <div className="h-48 w-48 rounded-full overflow-hidden">
                  <div
                    className="h-48 w-48 background-image rounded-full"
                    style={{ backgroundImage: `url(${a})` }}
                  ></div>
                </div>
              )}
              {band?.image && (
                <div className="h-48 w-48 rounded-full overflow-hidden">
                  <div
                    className="h-48 w-48 background-image rounded-full"
                    style={{ backgroundImage: `url(${band?.image?.path})` }}
                  ></div>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-5">{band?.name}</h2>
          </div>
          <div className="col-span-6 lg:col-span-2 py-5">
            <div className="mb-3">
              <h3 className="text-xl font-bold">Formed:</h3>
              <p>{band?.formedAt ? band?.formedAt : "unknown"}</p>
            </div>
            <div className="mb-3">
              <h3 className="text-xl font-bold">Country:</h3>
              <p>{band?.country ? band?.country : "unknown"}</p>
            </div>
            <div className="mb-3">
              <h3 className="text-xl font-bold">City:</h3>
              <p>{band?.country ? band?.city : "unknown"}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 py-5">
            <h3 className="text-lg font-bold">Info:</h3>
            <p>{band?.info}</p>
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
        <div className={"py-8"}>
          <div
            className={
              "grid gap-x-5 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-14"
            }
          >
            {renderAlbums}
          </div>
        </div>
      </div>
      {modal && (
        <Modal onDismiss={() => toggleModal(false)}>
          {action === "edit" && <EditBand band={band} onSubmit={updateBand} />}
          {action === "delete" && (
            <DeleteBand
              band={band}
              onSubmit={deleteBand}
              onDismiss={() => toggleModal(false)}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default BandPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const { id } = query;

  const queryClient = getQueryClient();

  await queryClient.fetchQuery([`bands/${id}`]);

  await queryClient.fetchQuery([`albums`, { params: { artist: id } }]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
