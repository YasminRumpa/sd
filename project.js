const loadData = (p) => {
    try {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${p ? p : 1000}`)
            .then((res) => res.json())
            .then((data) => {
                displayAllData(data.data)
            });
    } catch (error) {
        console.log(error);
    }
}
const sortByViews = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
        .then((res) => res.json())
        .then((data) => {
            const formattedData = formatViews(data.data);
            const sortedData = sortViewsInObjects(formattedData);
            displayAllData(sortedData);
        });
};
function formatViews(data) {
    return data.map(item => {
        const views = parseFloat(item.others.views) * getMultiplier(item.others.views);
        return { ...item, others: { ...item.others, views } };
    });
}
function getMultiplier(value) {
    if (value.includes('K')) {
        return 1000;
    }
    return 1;
}

function sortViewsInObjects(arr) {
    return arr.slice().sort((a, b) => b.others.views - a.others.views);
}


const displayAllData = (data) => {
    const allContainer = document.getElementById("all-container");
    allContainer.innerHTML = "";
    data.forEach((data) => {
        // console.log(data);
        let howManyTimeAgoUploaded = parseInt(data.others.posted_date)
        let hours = 0;
        let minutes = 0;
        
        if (howManyTimeAgoUploaded) {
             hours = Math.floor(howManyTimeAgoUploaded / 3600);
            let remainingSeconds = howManyTimeAgoUploaded % 3600; 
             minutes = Math.floor(remainingSeconds / 60);
            console.log(`${hours} hours ${minutes} minutes`);
        }
        const card = document.createElement("div");
        card.classList.add("box");
        card.innerHTML = `
    <img class="box-img" src=${data.thumbnail} alt="">
    <span>${hours} hours ${minutes} minutes</span>
    <div class="d-flex mt-2">
    <img class=" prop img-fluid rounded-circle" src=${data.authors[0].profile_picture} alt="">
    <h5 class="p-2">${data?.title}</h5>
    </div>
    <div class="textP">
    <p>${data.authors[0].profile_name}</p>
    <p>${data.others.views}</p>
    </div>`

        allContainer.appendChild(card);
    })
}
loadData()

const navigateAnotherpage = () => {
    window.location.href = "blog.html"
}