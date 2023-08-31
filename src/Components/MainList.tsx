import React, { useState } from "react";

export default function MainList(props: any) {

    // declare now displayed elements
    const [displayedElements, setDisplayedElements] = useState("All")

    // rerender for updating completed state
    const [count, setCount] = useState(0) 

    // declare drag items
    const dragItem = React.useRef<any>(null)
    const dragOverItem = React.useRef<any>(null)


    // filter list with now displayed elements
    function filteredList(filter: string) {
        if (filter === "All") {
         return props.todoList
        } else if(filter === "Active") {
            return props.todoList.filter((item: { completed: boolean; }) =>!item.completed)
        } else if (filter === "Completed") {
            return props.todoList.filter((item: { completed: boolean; }) => item.completed)
        }
    }

    const list = filteredList(displayedElements).map((item: { id: React.Key; text: string; completed: boolean}, index: number) => {

        // toggle completed items
        function updateCompleteState(item: { completed: boolean }) {
            item.completed = !item.completed
            setCount(count + 1)
        }

    
        // handle remove item
        function removeElement(itemId: React.Key) {
            props.setTodoList((oldItems: any[]) => oldItems.filter(listItem => listItem.id !== itemId));
        }


        // handle dragging items
        const handleSort = () => {
            let _todoList = [...props.todoList];

            const draggedItemContent = _todoList.splice(dragItem.current, 1)[0];

            _todoList.splice(dragOverItem.current, 0, draggedItemContent);

            dragItem.current = null;
            dragOverItem.current = null;

            props.setTodoList(_todoList);
        }


        return (

    
        <>
            <li className="text-black flex items-center py-4 px-3 relative cursor-move" key={item.id} draggable
            onDragStart={() => dragItem.current = index}
            onDragEnter={() => dragOverItem.current = index}
            onDragEnd={handleSort}>

                <button onClick={() => updateCompleteState(item)} 
                className={`${item.completed === true && "main-list--button__completed"} main-list--button grid place-items-center border-[1px] border-solid border-LightModeLightGrayishBlue dark:border-DarkModeSecondaryVeryDarkGrayishBlue duration-1000 rounded-full w-6 h-6 relative`}>
                    <img className={`${item.completed === false && "hidden"}`} alt="completed todo item icon" src="./images/icon-check.svg"/>
                </button>
            
                <p className={`ml-3 dark:text-DarkModeLightGrayishBlue ${item.completed===true && "line-through text-LightModeDarkGrayishBlue dark:text-DarkModeDarkGrayishBlue"}`}>{item.text}</p>
                <img  onClick={()=> removeElement(item.id)} className="absolute right-4 w-4 cursor-pointer" alt="delete item from list" src="./images/icon-cross.svg" />
            </li>
            
            <hr className="dark:border-DarkModeSecondaryVeryDarkGrayishBlue"/>
        </>
        )
    })

        // handle clearing todo array
        function clearList() {
            props.setTodoList([]);
        }

        // check active and completed items in array to display
        const checkingListItems = () =>{
            if(list.length === 0 && displayedElements === "Active") {
                return <p className="text-center py-4 text-LightModeVeryDarkGrayishBlue dark:text-DarkModeDarkGrayishBlue">There are no active items to display</p>
            } else if(list.length === 0 && displayedElements === "Completed") {
                return <p className="text-center py-4 text-LightModeVeryDarkGrayishBlue dark:text-DarkModeDarkGrayishBlue">There are no completed items to display</p>
            } else {
                return list
            }
        }

        return (
            <main className="h-screen w-screen bg-VeryLightGray dark:bg-VeryDarkBlue grid justify-items-center content-start">
                <ul className="bg-white dark:bg-VeryDarkDesaturatedBlue h-fit relative -top-6 w-10/12 md:w-7/12 2xl:w-4/12 rounded-md list-none  drop-shadow-lg">
                    {checkingListItems()}
                    {props.todoList.length > 0 && 
                    <div className="flex justify-between px-6 py-4 text-[15px] text-LightModeDarkGrayishBlue">
                        <p className="dark:text-DarkModeDarkGrayishBlue">{props.todoList.filter((listItem: { completed: boolean; }) => listItem.completed === false).length} items left</p>
                        
                        <section className={`${props.todoList.length===0 && "hidden"} hidden lg:block bg-white font-bold text-sm mt-1 dark:bg-VeryDarkDesaturatedBlue`}>
                            <ul className="flex  justify-center ">
                                <li className={`hover:text-LightModeLightGrayishBlue hover:dark:text-DarkModePrimaryVeryDarkGrayishBlue ${displayedElements==="All" ? "text-BrightBlue" : "text-LightModeDarkGrayishBlue "}`}><button onClick={()=> setDisplayedElements("All")}>All</button></li>
                                <li className={`hover:text-LightModeLightGrayishBlue hover:dark:text-DarkModePrimaryVeryDarkGrayishBlue mx-4 ${displayedElements==="Active" ? "text-BrightBlue" : "text-LightModeDarkGrayishBlue "}`}><button onClick={()=> setDisplayedElements("Active")}>Active</button></li>
                                <li className={`hover:text-LightModeLightGrayishBlue hover:dark:text-DarkModePrimaryVeryDarkGrayishBlue ${displayedElements==="Completed" ? "text-BrightBlue" : "text-LightModeDarkGrayishBlue "}`}><button onClick={()=> setDisplayedElements("Completed")}>Completed</button></li>
                            </ul>
                        </section>

                        <button onClick={()=> clearList()} className="hover:text-LightModeVeryDarkGrayishBlue dark:text-DarkModeDarkGrayishBlue">Clear Completed</button>
                    </div>}
                </ul>

                <section className={`${props.todoList.length===0 && "hidden"} w-10/12 md:w-7/12 lg:hidden bg-white py-3 font-bold text-md drop-shadow-lg rounded-md dark:bg-VeryDarkDesaturatedBlue`}>
                    <ul className="flex  justify-center ">
                        <li className={`hover:text-LightModeLightGrayishBlue hover:dark:text-DarkModePrimaryVeryDarkGrayishBlue ${displayedElements==="All" ? "text-BrightBlue" : "text-LightModeDarkGrayishBlue "}`}><button onClick={()=> setDisplayedElements("All")}>All</button></li>
                        <li className={`hover:text-LightModeLightGrayishBlue hover:dark:text-DarkModePrimaryVeryDarkGrayishBlue mx-4 ${displayedElements==="Active" ? "text-BrightBlue" : "text-LightModeDarkGrayishBlue "}`}><button onClick={()=> setDisplayedElements("Active")}>Active</button></li>
                        <li className={`hover:text-LightModeLightGrayishBlue hover:dark:text-DarkModePrimaryVeryDarkGrayishBlue ${displayedElements==="Completed" ? "text-BrightBlue" : "text-LightModeDarkGrayishBlue "}`}><button onClick={()=> setDisplayedElements("Completed")}>Completed</button></li>
                    </ul>
                </section>

                <p className={`${props.todoList.length===0 && "hidden"} dark:text-DarkModePrimaryVeryDarkGrayishBlue mt-12 text-LightModeDarkGrayishBlue font-bold`}>Drag and drop to reorder list</p>
            </main>
        )
}