import React, { FormEvent, useState } from "react";
import { nanoid } from 'nanoid'

interface props {
    theme: string;
    setTheme: any;
    todoList: object;
    setTodoList: any;
}



export default function TopContent(props: props) {

    // handle switch theme
    function changeTheme() {
        if(props.theme === "light") {
            props.setTheme("dark")
        } else {
            props.setTheme("light")
        }

        console.log(props.theme)
    }

    const [todoText, setTodoText] = useState("");

    // add element to todo list
    function addElementToTodoList(e: FormEvent) {
        e.preventDefault();

        // check input text
        if(todoText.trim().length !== 0) {
            const newElement = {
                id: nanoid(),
                text: todoText,
                completed: false
            }

            props.setTodoList((prevListElements: any) => [newElement, ...prevListElements]);

            setTodoText("");
        }
    }



    return (
        <section className={`top-content--container__${props.theme}  h-60 w-screen grid  place-items-center`}>
            <div className="flex w-10/12 md:w-7/12 2xl:w-4/12 justify-between items-center mt-6">
                <h1 className="font-bold uppercase tracking-[0.4em] text-VeryLightGray text-3xl ">Todo</h1>

                <img className="cursor-pointer" alt={props.theme === "dark" ? "sun icon" : "moon icon"} src={`./images/icon-${props.theme === "dark" ? "sun" : "moon"}.svg`} onClick={() => changeTheme()}/>
            </div>

            <form className="w-10/12 md:w-7/12 2xl:w-4/12 relative -top-4">
                <input onChange={(event) => setTodoText(event.target.value)} value={todoText} type="text" placeholder="Create a new todo..." className="dark:bg-VeryDarkDesaturatedBlue w-full pl-14 py-[14px] pt-[17px] focus:outline-none rounded-md placeholder:text-LightModeDarkGrayishBlue dark:text-DarkModeDarkGrayishBlue dark:placeholder:text-DarkModeDarkGrayishBlue"/>
                <button onClick={(e)=> addElementToTodoList(e)} className="top--content-form-button border-[1px] border-solid border-LightModeLightGrayishBlue dark:border-DarkModeSecondaryVeryDarkGrayishBlue duration-1000 rounded-full w-6 h-6 absolute left-5 top-[14px]"></button>
            </form>
        </section>
    )
}