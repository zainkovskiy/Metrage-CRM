import React from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { LinkUI } from 'ui/LinkUI';
import { IconButton } from 'ui/IconButton';
import { TextSpanStyle } from 'styles/styles';
import { ReactComponent as Close } from 'images/close.svg';
import { removeMortgageFile } from '../../../api/mortageAPI';

const FileText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MortageLoaderFile = ({ file, deleteFile }) => {
  const handleRemove = () => {
    removeMortgageFile(file.UID);
    deleteFile(file);
  };
  return (
    <Box jc='space-between' fullWidth>
      <FileText size={12} nowrap>
        {file?.name || `неизвестный файл`}
      </FileText>
      <Box>
        <LinkUI size={12} href={file.downloadUrl} target='_blank' download>
          Скачать
        </LinkUI>
        <IconButton onClick={handleRemove} color='error'>
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MortageLoaderFile;
