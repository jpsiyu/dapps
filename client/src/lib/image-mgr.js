
class ImageMgr {
    constructor() {
        this.container = {}
        this.imageForDrawing = []
    }

    setDrawingList(dl){
        this.imageForDrawing = dl
    }

    getImage(name) {
        return this.container[name]
    }

    loadImages() {
        return new Promise((resolve, reject) => {
            let loadedCount = 0
            const drawingList = this.imageForDrawing
            for (let i = 0; i < drawingList.length; i++) {
                const imageName = drawingList[i]
                const image = new Image()
                image.onload = () => {
                    this.container[imageName] = { obj: image }
                    loadedCount++
                    if (loadedCount >= drawingList.length) {
                        resolve()
                    }
                }
                image.src = `/images/${imageName}`
            }
        })
    }
}

export default ImageMgr