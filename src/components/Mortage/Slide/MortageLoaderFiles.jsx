import React from 'react';
import MortageLoaderFile from './MortageLoaderFile';
import styled from 'styled-components';

const MortageLoaderFilesStyle = styled.div`
  overflow: auto;
  max-height: 100px;
`;
const MortageLoaderFiles = ({ files, deleteFile }) => {
  return (
    <MortageLoaderFilesStyle>
      {files.map((file) => (
        <MortageLoaderFile file={file} key={file.UID} deleteFile={deleteFile} />
      ))}
    </MortageLoaderFilesStyle>
  );
};

export default MortageLoaderFiles;
