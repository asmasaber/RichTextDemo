import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState, Modifier, convertFromHTML } from 'draft-js';

import htmlToDraft from 'html-to-draftjs';

export default class CustomOption extends React.Component {

    static propTypes = {
      onChange: PropTypes.func,
      editorState: PropTypes.object,
    };

    tableComponent = () => (convertFromHTML("<h1>bla</h1>"))
    
  
    addTable = () => {
      const { editorState, onChange } = this.props;
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '⭐',
        editorState.getCurrentInlineStyle(),
      );
      onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };
  

    render() {
        return (
          <div onClick={this.addTable}> Add Table </div>
        );
      }
}