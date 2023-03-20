const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const fs = require("fs/promises")
const { v4 } = require("uuid")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const tempDir = path.join(__dirname, "temp")
const productsDir = path.join(__dirname, "public", "products")
const products = []

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: multerConfig,
})

app.get("/api/products", async (req, res) => {
  res.json(products)
})

app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { path: tempDir, originalname } = req.file
    const uploadDir = path.join(productsDir, originalname)
    await fs.rename(tempDir, uploadDir)
    const image = path.join("products", originalname)
    const newProduct = {
      name: req.body.name,
      id: v4(),
      image,
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
  } catch (error) {
    await fs.unlink(req.file.path)
  }
})

app.listen(3000)
