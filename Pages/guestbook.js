// let commentdata  = [
//     {
//         username: "username",
//         time: "2/8/24 6:19pm",
//         text: "uhhhhhh idk test text i guess"
//     }

// ]
async function fetchCommentData(){
    let commentdata = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://cv43fpkz-3000.use.devtunnels.ms/getcomments")) // cors proxy is sick
    commentdata = await commentdata.text()
    commentdata = JSON.parse(commentdata).data
    console.log("New comment data:")
    console.log(commentdata)
    commentdata.reverse()
    return commentdata
}

let commentdata = await fetchCommentData()
const commentthing = document.getElementById("comments")



for (let i = 0; i < commentdata.length; i++) {
    let comment = document.createElement("div")
    comment.id = `comment${i}`

    let heldelement = document.createElement("img")
    heldelement.id = `commentimage${i}`
    heldelement.src = "/Assets/person icon.svg"
    //heldelement.style.border = "solid"
    heldelement.style.float = "left"
    heldelement.style.paddingLeft = "20%"
    heldelement.style.width = "5%"
    // comment user image thing, idk
    comment.appendChild(heldelement)

    heldelement = document.createElement("div")
    heldelement.id = `commentspacer${i}`
    heldelement.style.padding = "9px 15px"
    // spacer between the pfp and the username
    comment.appendChild(heldelement)

    heldelement = document.createElement("h4")
    heldelement.id = `commentname${i}`
    heldelement.textContent = `${commentdata[i].username}, ${new Date(+ commentdata[i].time).toString()}`
    heldelement.style.textAlign = "left"
    heldelement.style.paddingLeft = "26.5%"
    // comment username
    comment.appendChild(heldelement)

    heldelement = document.createElement("p")
    heldelement.id = `commenttext${i}`
    heldelement.textContent = commentdata[i].text
    heldelement.style.textAlign = "left"
    heldelement.style.paddingLeft = "25%"
    // comment text
    comment.appendChild(heldelement)

    heldelement = document.createElement("div")
    heldelement.id = `commentspacer${i}-2`
    heldelement.style.padding = "35px 15px"
    // spacer thingy so all the comments aren't right next to each other
    comment.appendChild(heldelement)

    commentthing.appendChild(comment)
}



const form = document.getElementById("commentstuff")

async function submitformandstuff(e) { // weird name to prevent accidentally overlapping with an existing function or whatever
    e.preventDefault();
    const nameInput = document.getElementById("username")
    let name = nameInput.value
    const commentstuff = document.getElementById("commentinput")
    let comment = commentstuff.value
    let toPost = {
        "username": name,
        "text": comment,
        "time": Date.now().toString()
    }
    toPost = new URLSearchParams(toPost).toString()
    let toPostURL = "https://corsproxy.io/?" + encodeURIComponent(`https://cv43fpkz-3000.use.devtunnels.ms/postcomment?${toPost}`) // https://cv43fpkz-3000.use.devtunnels.ms Note to self: swap for other domain.
    console.log(toPostURL)

    await fetch(toPostURL) // do the thing
    nameInput.value = ""
    commentstuff.value = ""
    commentdata = await fetchCommentData()

    const warningThing = document.getElementById("warning")
    let newElement = document.createElement("h4")
    newElement.textContent = "Note: Corsproxy appears to take a while to update, so you might not see your comment right away."
    warningThing.appendChild(newElement)

}

form.onsubmit = submitformandstuff


// me am pro full stack dev real not clickbait