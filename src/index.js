// write your code here
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    const ramenMenu = document.querySelector("#ramen-menu");
    //add photos 
    function loadPhotos(ramen) {
        const img = document.createElement("img");
        img.setAttribute("id", ramen.name)
        img.src = ramen.image;
        img.addEventListener("click", () => loadInfo(ramen))
        ramenMenu.appendChild(img);
    }

    //load ramen info when photo is clicked
    function loadInfo(ramen){
        const img = document.querySelector(".detail-image");
        const name = document.querySelector(".name");
        const restaurant = document.querySelector(".restaurant");
        const rating = document.querySelector("span#rating-display");            const comment = document.querySelector("#comment-display");
        
        //change image
        img.src = ramen.image;
        name.innerText = ramen.name;
        restaurant.innerText = ramen.restaurant;
        rating.innerText = ramen.rating;
        comment.innerText = ramen.comment;
    }

    // fetch data 
    function ramenObj() {
        fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        .then(ramens => ramens.forEach(ramen => loadPhotos(ramen)))
    }
    ramenObj();


    // add new ramen
    const form = document.querySelector("#new-ramen");
    form.addEventListener("submit", handleSubmit)

    function handleSubmit(event) {
        event.preventDefault()
        console.log(event)
        let newRamen = {
            name: event.target[0].value,
            restaurant: event.target[1].value,
            image: event.target[2].value,
            rating: event.target[3].value,
            comment:event.target[4].value,
        }

        addnewRamen(newRamen);
    }

    function addnewRamen(newRamen) {
        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newRamen),
        })
        .then(res => res.json())
        .then(ramen => console.log(ramen))
    }


});




