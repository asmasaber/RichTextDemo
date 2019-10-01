import React from "react";
import { EditorState, RichUtils, CompositeDecorator } from "draft-js";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import CustomOption from './table';



const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    minHeight: 40,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  handle: {
    color: 'rgba(98, 177, 254, 1.0)',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)',
  },
};


const HandleSpan = (props) => {
  return (
    <span
      style={styles.handle}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
};
const HANDLE_REGEX = /@[\w]+/g;

export default class RichText extends React.Component {
  
    constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: this.handleStrategy,
        component: HandleSpan,
      },
    ]);
    this.state = { editorState: EditorState.createEmpty(compositeDecorator) };
    this.onChange = editorState => this.setState({ editorState });

    this.editor = React.createRef();
  }
  
   findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }

    handleStrategy= (contentBlock, callback, contentState) => {
      this.findWithRegex(HANDLE_REGEX, contentBlock, callback);
    }
      
  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  render() {

    return (
      <div>
        <Editor 
          // ref={this.editor}
          editorState={this.state.editorState} 
          onEditorStateChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          toolbarCustomButtons={[<CustomOption />]}
          placeholder="Tell a story" 
        />
        </div>
    );
  }
}
