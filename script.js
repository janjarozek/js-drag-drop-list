const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    // add event listner for drag start
    draggable.addEventListener('dragstart', () => {
        console.log('drag started');
        draggable.classList.add('dragging')
    });

    // add event listner for drag stop
    draggable.addEventListener('dragend', () => {
        console.log('drag end');
        draggable.classList.remove('dragging');
    });
})

// check on dropping elements through event listner over containers
containers.forEach(container => {
    // add event listner for dragover
    container.addEventListener('dragover', e => {
        // to prevent system from blocking dropping elements over the container
        e.preventDefault();
        // need to establish the element below the dragging item, the e.clientY is the property of the mouse Y position over the screen
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        // console.log(afterElement);
        // if the element isn't return this means there is no item below the current dragging element, so add at the end of the list
        if (afterElement == null)
        {
            container.appendChild(draggable);
        // else insert draggable element before the after element
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
})

// passing the current container and mouse position
function getDragAfterElement(container, y) {
    // dropping into array all items inside the container without the current being dragged and placed in the array with spread operator
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    // thanks to array placement use the reduce function to calculate closest item
    return draggableElements.reduce(( closest, child ) => {
        // child element we are currently dragging item over with the function getBoundingClientRect() we receive it's position in object
        const box = child.getBoundingClientRect();
        // console.log(box);
        // calculate the offset of the current dragging object and box being dragged over
        const offset = y - box.top - box.height/2;
        // console.log(offset);
        // if we are near 0 with the offset return child otherwise return closest
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
        // initial value for offset is negaitive infinity as we are aiming for objects below, while the offset is being negative then
    }, { offset: Number.NEGATIVE_INFINITY }).element
}