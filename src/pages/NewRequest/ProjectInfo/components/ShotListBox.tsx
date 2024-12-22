// import {
//   BoldFont,
//   CenterAlignedText,
//   FileImage,
//   ItalicFont,
//   LeftAlignedText,
//   Link,
//   OrderedList,
//   RightAlignedText,
//   UnderLinedFont,
//   UnorderedList,
// } from "assets/images";
import { useState } from "react";

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "../ProjectInfo.module.scss";

const ShotList = () => {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <div className={styles.nR_shotList_header}>Shot list</div>
      {/* <div className={styles.nR_shotList_editorContainer}>
        <Editor
          editorState={editorState}
          toolbarClassName="editor-toolbar2"
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          toolbar={{
            options: ["inline", "list", "link", "image"],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["bold", "italic", "underline"],
              bold: { icon: BoldFont, className: undefined },
              italic: { icon: ItalicFont, className: undefined },
              underline: {
                icon: UnderLinedFont,
                className: styles.nR_shotList_iconDivider,
              },
            },
            link: {
              options: ["link"],
              showOpenOptionOnHover: false,
              link: { icon: Link, className: undefined },
            },
            textAlign: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["left", "center", "right"],
              left: { icon: LeftAlignedText, className: undefined },
              center: { icon: CenterAlignedText, className: undefined },
              right: {
                icon: RightAlignedText,
                className: styles.nR_shotList_iconDivider,
              },
            },
            list: {
              options: ["ordered", "unordered"],
              unordered: {
                icon: UnorderedList,
                className: undefined,
              },
              ordered: {
                icon: OrderedList,
                className: styles.nR_shotList_iconDivider,
              },
            },
            image: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: undefined,
              previewImage: false,
              icon: FileImage,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png",
              alt: { present: true, mandatory: true },
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
          }}
          onEditorStateChange={handleEditorStateChange}
          toolbarCustomButtons={[]}
          spellCheck
          // stripPastedStyles
        />
      </div> */}
      <textarea
        className={styles.nR_shotList_textArea}
        placeholder="Add your shot list here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default ShotList;
