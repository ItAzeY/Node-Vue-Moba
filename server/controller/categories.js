const { exec } = require('../mysql/index')

const getList = () => {
    let sql = `select * from categories`
    // 返回 promise
    return exec(sql)
}

const getItemId = (id) => {
  if(!id) return
  let sql = `SELECT * FROM categories WHERE id=${id};`
  return exec(sql)
}

const getCategoriesParent = () => {
  let sql = 'SELECT * FROM categories WHERE ISNULL(parent)'
  return exec(sql)
}
const deleteCategories = () => {
  let sql = 'SELECT * FROM categories WHERE ISNULL(parent)'
  return exec(sql)
}


module.exports = {
  getList,
  getItemId,
  getCategoriesParent,
  deleteCategories
}