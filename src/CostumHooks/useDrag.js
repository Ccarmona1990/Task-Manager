
export const useDrag = (dragging, itemClass ) => {
    // style_dragging__1OM4q
    // style_user__uI9UX
    const startDrag = (e)=>{
        const element = e.target;
        element.className += ` ${dragging} `;
    }; 
    const endDrag = (e)=>{
        const element = e.target;
        element.className = `${itemClass}`;
    };
    const overDrag = (e)=>{
        if(!e)return;
        e.preventDefault();
        const currentElement = document.querySelector(`.${dragging}`);
        const container = e.currentTarget;
        const afterElement = getAfterElement(container,e.clientY,e.clientX);
        if(!afterElement){
            container.appendChild(currentElement);
        } else {
            container.insertBefore(currentElement,afterElement);
        }
    };
    function getAfterElement(container, y, x){
        const afterElements = container.querySelectorAll(`.${itemClass}:not(${dragging})`);
        const afterElementArray = Array.from(afterElements);
        const afterElement = afterElementArray.reduce((closest,element)=>{
            const box = element.getBoundingClientRect();
            const dropPointX = x - box.x - box.width / 2;
            const dropPointY = y - box.y - box.height / 2;
            if(dropPointY < 0 && dropPointY > closest.infinity && dropPointX < 0 && dropPointX > closest.infinity ) {
                return {dropPointY, dropPointX, element}
            }
            else{
                return closest
            }
        },{infinity:Number.NEGATIVE_INFINITY});
        return afterElement.element;
    }
    return {
        startDrag,
        endDrag,
        overDrag
    }
}
