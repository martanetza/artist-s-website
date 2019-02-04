let template = document.querySelector(".paintingTemplate");
let templateDetail = document.querySelector(".paintingTemplateDetail");


//load data by paintings category

fetch(PaintingCatLink + "/" + filterID).then(e => e.json()).then(showTitle);

    function showTitle(t){
        let templateTitle = document.querySelector(".pageTitleTmpl")
        const copy = templateTitle.cloneNode(true).content;
        copy.querySelector("h2").textContent = t.name;
        document.querySelector(".pageTitle").appendChild(copy)


        console.log("showTitle_test")
    }

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

    console.log(p)



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
    const boxUp= document.querySelector(".boxUp");
    boxUp.style.display="block";
    boxUp.querySelector("img").src = painting.acf.image_large.url;
    boxUp.querySelector(".back a").href = "painting.html?filterid=" + painting.paintings[0];
    boxUp.querySelector("a").addEventListener("click", e=>{
        e.preventDefault()
        document.querySelector(".boxUp").style.display="none";
    })
    //document.querySelector(".boxUp").appendChild(clone);


}

















