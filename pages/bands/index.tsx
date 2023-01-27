import { useToggle } from "react-use";

import { dehydrate, useMutation, useQuery } from "react-query";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Pagination from "@etchteam/next-pagination";

import getQueryClient from "../../utils/queryClient";

import BandCard from "../../components/common/BandCard";
import ButtonAdd from "../../components/ButtonAdd";
import Modal from "../../components/Modal";
import CreateBand from "../../components/pages/bands/modals/CreateBand";

import shouldShowPagination from "../../utils/common/shouldDispalayPagination";
import api from "../../utils/api";

import paginationTheme from "../../styles/Pagination.module.scss";
import IBand from "../../@types/band";

const BandsListPage = () => {
  // States

  const [modal, toggleModal] = useToggle(false);

  const router = useRouter();

  // React Query

  const { data: bands } = useQuery<any>(["bands", { params: router?.query }], {
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: createBand } = useMutation(
    async (data: any) => {
      return api.post("/bands", data);
    },
    {
      onSettled: () => {
        toggleModal(false);
      },
    }
  );

  // Rendering data

  const renderBands = bands?.docs?.map((band: IBand) => {
    return (
      <BandCard
        key={band.id}
        id={band.id}
        name={band.name}
        formedAt={band.formedAt}
        image={band.image}
      />
    );
  });

  return (
    <>
      <Head>
        <title>List of Bands</title>
      </Head>
      <div className="bg-gray-800 py-5">
        <h1 className="text-3xl font-bold text-center text-white mb-10 lg:mb-2">
          Bands / Artists
        </h1>
        <form className="container mx-auto">
          <div className="flex justify-between items-center">
            <ButtonAdd
              text={"Add New Band"}
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
      <div className={"container mx-auto py-8"}>
        {!shouldShowPagination(bands) && (
          <div className="mb-14">
            <Pagination
              total={bands.totalDocs}
              theme={paginationTheme}
              sizes={[15]}
            />
          </div>
        )}
        <div
          className={
            "grid gap-x-5 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-14"
          }
        >
          {renderBands}
        </div>
        {!shouldShowPagination(bands) && (
          <div>
            <Pagination
              total={bands.totalDocs}
              theme={paginationTheme}
              sizes={[15]}
            />
          </div>
        )}
      </div>
      {modal && (
        <Modal onDismiss={() => toggleModal(false)}>
          <CreateBand onSubmit={createBand} />
        </Modal>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const queryClient = getQueryClient();

  await queryClient.fetchQuery(["bands", { params: query }]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default BandsListPage;
