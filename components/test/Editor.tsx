'use client'
import { Bold, Italic, Underline as UL } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import {Color} from '@tiptap/extension-color';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { uploadTest } from "@/actions/test/uploadTest"
import { toast } from "sonner"
const Tiptap = () => {
  const editor = useEditor({
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
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps:{
      attributes:{
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
      }
    }
  })

  if (!editor) return null

  const handleLoad = async() => {
    try{
      const test = await fetch("/api/test").then(res => res.json())
      console.log(test)
      editor.commands.setContent(test);
    }catch{
      console.log("no data")
    }
  } 

  const handleSave = async() => {
    const testjson = editor.getJSON()
    fetch("/api/test",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testjson)
    }).then((response)=>{
      if(response.ok){
          toast.success("Allowed API Route!")
      }else{
          toast.error("FORBIDDEN")
      }
  })
  }
  return (

    <>
      <div className='space-x-4 flex'>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
          <MenubarItem onClick={handleLoad}>
              Open
            </MenubarItem>
            <MenubarItem>
              Undo
            </MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleSave} >Save</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>New Page</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <input
        type="color"
        onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color}
      />
      <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold" data-state={editor.isActive('bold') ? 'on' : 'off'}
      onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic"
      data-state={editor.isActive('italic') ? 'on' : 'off'}
      onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline"
      data-state={editor.isActive('underline') ? 'on' : 'off'}
      onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UL className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    </div>
    <div >
    <EditorContent editor={editor}  className="border border-black-600" />
    </div>
    </>
  )
}

export default Tiptap