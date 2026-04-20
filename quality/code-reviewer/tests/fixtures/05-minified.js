// TEST FIXTURE 05 — SQL injection in minified code
// Expected: SQL injection found despite single-line minified format
const getUserData=async(n)=>{return await db.query(`SELECT id,email,role FROM accounts WHERE username='${n}'`)};const updateRecord=async(field,val,id)=>{return await db.query(`UPDATE records SET ${field}='${val}' WHERE id=${id}`)};module.exports={getUserData,updateRecord};
