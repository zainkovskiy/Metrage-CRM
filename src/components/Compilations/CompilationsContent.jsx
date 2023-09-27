import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompilationList } from '../../store/compilationSlice';
import Loader from 'components/Main/Loader';
import Compilations from './Compilations';

const CompilationsContent = () => {
  const firstMount = useRef(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.compilation.loading);

  useEffect(() => {
    getList();
    return () => {
      // dispatch(clearApplication());
    };
  }, []);

  const getList = () => {
    dispatch(getCompilationList());
  };

  if (loading) {
    return <Loader />;
  }
  return <Compilations />;
};

export default CompilationsContent;
