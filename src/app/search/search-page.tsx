"use client";
import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../../components/auth-context";
import { HeaderLayout } from "../../components/header-layout";
import { Loading } from "../../components/loading";
import { RecordProgramModal } from "../../components/record-program-modal";
import { ToastProvider } from "../../components/toast";
import { getSearchPrograms } from "../../lib/client";
import { calcDurationSeconds } from "../../lib/day";
import { Program } from "../../models/program";
import { SearchMeta, SearchProgram, SearchQueries } from "../../models/search-program";
import { SearchProgramForm } from "./sarch-program-form";
import { SearchProgramCard } from "./search-program-card";

type Props = {
  searchPrograms: SearchProgram[];
  meta?: SearchMeta;
};

export const SearchPage: FC<Props> = (props) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <InnerSearchPage {...props} />
      </ToastProvider>
    </AuthProvider>
  );
};

const InnerSearchPage: FC<Props> = (props) => {
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
    <HeaderLayout user={authState.user}>
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
    </HeaderLayout>
  );
};
