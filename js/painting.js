let template = document.querySelector(".paintingTemplate");
let templateDetail = document.querySelector(".paintingTemplateDetail");


//load data by paintings category

function loadContByCategory(filterID) {
    fetch(baseLink + "painting?paintings=" + filterID + "&_embed").then(e => e.json()).then(showDataByCategory);
    console.log(filterID)

}

loadContByCategory(filterID);

function showDataByCategory(List) {
    List.forEach(showSingleItemFiltered);


function showSingleItemFiltered(p) {
    const copy = template.cloneNode(true).content;
    copy.querySelector(".title").textContent = p.title.rendered;
    copy.querySelector(".date").textContent = p.acf.date;
    copy.querySelector(".technique").textContent = p.acf.technique;
    copy.querySelector(".size").textContent = p.acf.size;

    if (p._embedded) {
        copy.querySelector("img").src = p._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    } else {
        copy.querySelector(".painting img").remove()
    }

    copy.querySelector("img").addEventListener("click", event => {
                    event.preventDefault();
                    fetch(baseLink + "painting/" + p.id).then(promise => promise.json()).then(data => showDetails(data))
                });

    document.querySelector(".paintings").appendChild(copy)

}
}



if (filterID == 7) {
    document.querySelector(".textPaintingAnimals").style.display = "block"
    document.querySelector(".textPaintingPortraits").style.display = "none"
    document.querySelector(".textPaintingCollection").style.display = "none"
}
if (filterID == 6) {
    document.querySelector(".textPaintingAnimals").style.display = "none"
    document.querySelector(".textPaintingCollection").style.display = "none"
    document.querySelector(".textPaintingPortraits").style.display = "block"
}

if (filterID == 11) {
    document.querySelector(".textPaintingAnimals").style.display = "none"
    document.querySelector(".textPaintingPortraits").style.display = "none"
    document.querySelector(".textPaintingCollection").style.display = "block"
}

function showDetails(painting) {

    console.log(painting)
    document.querySelector(".boxUp").style.display="block";
    const clone = templateDetail.cloneNode(true).content;
    clone.querySelector("img").src = painting.acf.image_large.url;
    clone.querySelector(".back a").href = "painting.html?filterid=" + painting.paintings[0];

    document.querySelector(".boxUp").appendChild(clone);





}

















