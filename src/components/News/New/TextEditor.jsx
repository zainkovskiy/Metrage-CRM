import React, { useState, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.scss';

const SuspenseNews = ({ value, onChange, defaultState }) => {
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(convertFromRaw(value))
      : () => EditorState.createEmpty()
  );
  useEffect(() => {
    if (onChange) {
      onChange(convertToRaw(editorState.getCurrentContent()));
    }
  }, [editorState]);
  // const [convertedContent, setConvertedContent] = useState(null);
  // useEffect(() => {
  //   // let html = convertToHTML(editorState.getCurrentContent());
  //   const html = convertToHTML({
  //     styleToHTML: (style) => {
  //       if (style === 'SUPERSCRIPT') {
  //         return <sup />;
  //       }
  //     },
  //     blockToHTML: (block) => {
  //       // console.log(block);
  //     },
  //     entityToHTML: (entity, originalText) => {
  //       if (entity.type === 'LINK') {
  //         console.log(entity);
  //         return (
  //           <a href={entity.data.url} target={entity.data.targetOption}>
  //             {originalText}
  //           </a>
  //         );
  //       }
  //       return originalText;
  //     },
  //   })(editorState.getCurrentContent());
  //   setConvertedContent(html);
  // }, [editorState]);

  const handleChangeEditor = (editorState) => {
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    // console.log(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
    };
  };
  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChangeEditor}
        localization={{
          locale: 'ru',
        }}
        // toolbarClassName='toolbarClassName'
        toolbarClassName='toolbar-class'
        // wrapperClassName='wrapperClassName'
        wrapperClassName='wrapper-class'
        // editorClassName='editorClassName'
        editorClassName='editor-class'
      />
      {/* <div
        dangerouslySetInnerHTML={createMarkup(
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )}
        // dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div> */}
    </>
  );
};

export default SuspenseNews;
