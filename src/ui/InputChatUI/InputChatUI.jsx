import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import sendUrl, { ReactComponent as Send } from 'images/send.svg';
import attachmentUrl, {
  ReactComponent as Attachment,
} from 'images/attachment.svg';
import { uploadFiles } from 'api/uploadAPI';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import { LinkUI } from 'ui/LinkUI';
import { TextSpanStyle } from 'styles/styles';
import { ReactComponent as Close } from 'images/close.svg';

const InputChatUIStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;
const AreaStyle = styled.textarea`
  resize: none;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.primary)};
  outline: 1px solid;
  outline-color: transparent;
  width: 100%;
  box-sizing: border-box;
  height: ${({ $height }) => $height && $height + 'px'};
  overflow: ${({ $height }) => ($height >= 86 ? 'auto' : 'hidden')};
  &:focus {
    outline-color: ${({ theme, error }) =>
      error ? 'red' : theme.color.primary};
  }
  &:disabled {
    background-color: #eee;
    opacity: 0.8;
    border: 1px solid #ccc;
  }
  &::placeholder {
    font-size: 12px;
    white-space: nowrap;
    line-height: 17.5px;
  }
`;
const ButtonStyle = styled.div`
  cursor: pointer;
  // border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: 5px;
  width: 35.5px;
  height: 35.5px;
  min-width: 35.5px;
  box-sizing: border-box;
  align-self: flex-end;
  transition: opasity 0.3s;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
`;
const ButtonLabelStyle = styled.label`
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: 5px;
  width: 35.5px;
  height: 35.5px;
  min-width: 35.5px;
  box-sizing: border-box;
  align-self: flex-end;
  transition: opasity 0.3s;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
`;
const IconSend = styled(Send)`
  width: 20px;
  height: 20px;
  fill: #fff;
  pointer-events: none;
`;
const IconAttachment = styled(Attachment)`
  width: 20px;
  height: 20px;
  fill: #fff;
  pointer-events: none;
`;

export const InputChatUI = ({ onClick, placeholder, noAttachment, raw }) => {
  const [value, setValue] = useState('');
  const [files, setFiles] = useState([]);
  const areaRef = useRef(null);
  const [initialHeight, setInititalHeight] = useState(35.5);

  const onChange = (e) => {
    if (e.target.value < 2 && initialHeight !== 35.5) {
      setInititalHeight(35.5);
    }
    setValue(e.target.value);
    if (initialHeight >= 86) {
      return;
    }
    if (initialHeight < areaRef.current.scrollHeight) {
      setInititalHeight(areaRef.current.scrollHeight);
    }
  };
  const sendMessage = () => {
    if (value.trim().length === 0) {
      return;
    }
    if (noAttachment) {
      onClick && onClick(value);
    }
    if (!noAttachment) {
      onClick &&
        onClick({
          message: value,
          files: files,
        });
    }
    setValue('');
    setFiles([]);
    setInititalHeight(35.5);
  };
  const handleKey = (e) => {
    const { code } = e;
    if (code === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };
  const upload = (e) => {
    const files = e.target.files;
    uploadFiles(files, raw).then((uploadPhoto) => {
      setFiles((prevState) => [...prevState, ...uploadPhoto]);
    });
  };
  const removeCurrentFile = (file) => {
    setFiles((prevState) => prevState.filter((item) => item.UID !== file.UID));
  };
  return (
    <Box column ai='normal'>
      <InputChatUIStyle>
        <AreaStyle
          $height={initialHeight}
          onChange={onChange}
          rows={1}
          ref={areaRef}
          value={value}
          onKeyDown={handleKey}
          placeholder={placeholder}
        ></AreaStyle>
        {!noAttachment && (
          <ButtonLabelStyle htmlFor='attachment' as='label'>
            <input
              id='attachment'
              type='file'
              multiple={true}
              hidden
              onChange={upload}
            />
            <IconAttachment />
          </ButtonLabelStyle>
        )}
        <ButtonStyle onClick={sendMessage}>
          <IconSend />
        </ButtonStyle>
      </InputChatUIStyle>
      {files?.length > 0 && (
        <Box column ai='flex-start' gap='0'>
          {files.map((file) => (
            <FileCoponent
              file={file}
              key={file.UID}
              removeCurrentFile={removeCurrentFile}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
const SliderText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const FileCoponent = ({ file, removeCurrentFile }) => {
  console.log(file);
  return (
    <Box jc='space-between' fullWidth>
      <SliderText size={12} nowrap>
        {file?.name || `неизвестный файл`}
      </SliderText>
      <Box>
        <LinkUI size={12} href={file.downloadUrl} target='_blank' download>
          Скачать
        </LinkUI>
        <IconButton
          onClick={() => {
            removeCurrentFile(file);
          }}
          color='error'
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};
