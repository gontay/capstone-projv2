"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style';
import {Color} from '@tiptap/extension-color';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TipTapMenuBar from "./editor-menubar";
import { Button } from "@/components/ui/button";
import axios from "axios"
import Text from "@tiptap/extension-text";
import { useDebounce } from "@/hooks/use-debounce";
import { UserProps, notebookProps } from "@/types";

interface EditorProps{
  notebook: notebookProps
  client: UserProps
}

const TipTapEditor = ({notebook,client}: EditorProps) => {
  console.log(client.name)
    const [editorState, setEditorState] = React.useState(notebook.editorState||`<h1>${client.name}</h1>`);
    const saveNote = useMutation({
      mutationFn: async () => {
        const res = await axios.post("/api/Note/saveNote", {
          notebookId: notebook.id,
          editorState
        });
        return res.data;
      }
    });

    const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Color,      
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start my-4",
        },
        nested: true,
      }),],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const debouncedEditorState = useDebounce(editorState, 500);


  useEffect(()=>{
    if (debouncedEditorState === '')return
    saveNote.mutate(undefined, {
      onSuccess: data => {
        console.log('sucess!', data)
      },
      onError: err=>{
        console.log(err)
      }
    })
    console.log(debouncedEditorState);
  },[debouncedEditorState]);
  return (
    <>
      <div>
        <div className="flex">
        {editor && <TipTapMenuBar editor={editor}/>}
        <Button disabled variant={"outline"}>
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
        </div>
        <div className="prose p-2">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default TipTapEditor;