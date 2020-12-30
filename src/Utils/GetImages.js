
export default getImages;

async function getImages(calTheme) {
    let i
    let imageURLs = []
    let image = ""
    for (i = 0; i < 25; i++) {
        image = await getImage(calTheme)
        imageURLs.push(image)
    }
    return imageURLs
}


function getImage(calTheme) {
    if (calTheme === "fox"){
        return getFoxImage()
    } else if (calTheme === "dog") {
        return getDogImage()
    } else if (calTheme === "cat") {
        return getCatImage()
    } else if (calTheme === "doggo") {
        return getDoggoImage()
    }
}

async function getFoxImage() {
    let response = await fetch("https://randomfox.ca/floof/")
    if (!response.ok) {
        throw new Error('API call failed:')
    } else {
        let json = await response.json();
        return json["image"]
    }
}

async function getCatImage() {
    const api_key = "abcf538e-de0b-40e3-9e6f-186e3f79958c"
    let response = await fetch("https://api.thecatapi.com/v1/images/search", {headers: {'x-api-key':api_key}})
    if (!response.ok) {
        throw new Error('API call failed:')
    } else {
        let json = await response.json();
        return json[0].url
    }
}

async function getDogImage() {
    let response = await fetch("https://dog.ceo/api/breeds/image/random")
    if (!response.ok) {
        throw new Error('API call failed:')
    } else {
        let json = await response.json();
        return json["message"]
    }
}

async function getDoggoImage() {
    let response = await fetch("https://random.dog/woof?filter=mp4,webm")
    if (!response.ok) {
        throw new Error('API call failed:')
    } else {
        let image = 'https://random.dog/' + await response.text();
        return  image
    }
}
