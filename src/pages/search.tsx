import type { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../components/auth-context";
import Layout from "../components/layout";
import { Loading } from "../components/loading";
import { RecordProgramModal } from "../components/record-program-modal";
import { SearchProgramForm } from "../components/sarch-program-form";
import { SearchProgramCard } from "../components/search-program-card";
import { getSearchPrograms } from "../lib/client";
import { calcDurationSeconds } from "../lib/day";
import { search } from "../lib/search-client";
import { Program } from "../models/program";
import { SearchMeta, SearchProgram, SearchQueries } from "../models/search-program";

type Props = {
  searchPrograms: SearchProgram[];
  meta?: SearchMeta;
};

const SearchPage: NextPage<Props> = (props) => {
  const authState = useAuth();
  useEffect(() => {
    if (authState.type === "not_authenticated") {
      Router.push("/signin");
    }
  }, [authState]);

  const [programs, setPrograms] = useState(props.searchPrograms);

  const [yetSearch, setYetSearch] = useState(true);
  const [searching, setSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [modalState, setModalState] = useState<
    { open: true; data: { stationId: string; program: Program } } | { open: false; data: undefined }
  >({
    open: false,
    data: undefined,
  });
  const closeModal = () => {
    setModalState({ open: false, data: undefined });
  };
  const handleProgramClick = (searchProgram: SearchProgram) => {
    setModalState({
      open: true,
      data: {
        stationId: searchProgram.station_id,
        program: {
          id: "",
          title: searchProgram.title,
          personality: searchProgram.performer,
          info: searchProgram.info,
          from: searchProgram.start_time,
          to: searchProgram.end_time,
          duration: calcDurationSeconds(searchProgram.start_time, searchProgram.end_time),
          img: "",
          url: "",
        },
      },
    });
  };

  const handleSearch = async (query: SearchQueries) => {
    setSearching(true);
    setErrorMessage(undefined);
    try {
      const response = await getSearchPrograms({ key: query.key });
      setPrograms(response.data);
      setYetSearch(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error(error);
      } else {
        throw error;
      }
    } finally {
      setSearching(false);
    }
  };

  if (authState.type === "not_authenticated" || authState.type === "initialized") {
    return null;
  }

  return (
    <Layout user={authState.user}>
      <div className="my-5 mx-[10%]">
        <h2 className="my-5 text-2xl">Search</h2>
        <div className="my-5">
          <SearchProgramForm searching={searching} onSubmit={handleSearch} />
          {errorMessage !== undefined && <div className="text-sm text-red-600 my-1">{errorMessage}</div>}
        </div>
        <div className="my-5 grid grid-cols-3 gap-2 ">
          {searching ? (
            <Loading />
          ) : (
            <>
              {programs.map((program, index) => (
                <SearchProgramCard key={index} program={program} onClick={handleProgramClick} />
              ))}
              {!yetSearch && programs.length === 0 && <div className="text-slate-700 text-xl">no results</div>}
            </>
          )}
        </div>
      </div>
      {modalState.open && (
        <RecordProgramModal
          open={true}
          onClose={closeModal}
          stationId={modalState.data.stationId}
          program={modalState.data.program}
          user={authState.user}
        />
      )}
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { key, page_idx } = context.query;
  if (key === undefined) {
    return {
      props: {
        searchPrograms: [],
      },
    };
  }
  const searchKey = Array.isArray(key) ? key[0] : key;
  const pageIndex = Array.isArray(page_idx) ? page_idx[0] : page_idx;
  const programResponse = await search({ key: searchKey, page_idx: pageIndex });
  return {
    props: {
      searchPrograms: programResponse.data.map((data) => ({
        station_id: data.station_id,
        title: data.title,
        performer: data.performer,
        start_time: data.start_time,
        end_time: data.end_time,
        info: data.info,
      })),
      meta: programResponse.meta,
    },
  };
};
