const expres = require("express");
const router = expres.Router();
const db = require("../../../controller/categories");

router.get("/categories", async (req, res) => {
  const list = await db.getList();
  res.send(list); 
});

router.get("/categories/parent", async (req, res) => {
  const items = await db.getCategoriesParent();
  res.send(items);
});

// 这样就能避免路由冲突
router.get("/categories/query/:id", async (req, res) => {
  const item = await db.getItemId(req.params.id);
  res.send(item);
});

// router.get('/categories/:id', async (req, res) => {
//   const model = await db.Categories.findById(req.params.id)
//   console.log(4)
// 	res.send(model)
// })
// router.delete('/categories/:id', async (req, res) => {
//   const model = await db.deleteCategories()
//   console.log(5)
// 	res.send(model)
// })
module.exports = router;
