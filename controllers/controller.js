import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

export function getQuestions(req, res) {
    Questions.find()
      .then(q => {
        res.json(q);
      })
      .catch(error => {
        res.json({ error });
      });
  }



export async function insertQuestions(req, res){
    Questions.insertMany({ questions , answers })
  .then(() => {
    res.json({ msg: "Data Saved Successfully...!" });
  })
  .catch((err) => {
    // Handle the error here
    res.json({ err })
  });
}


export async function dropQuestions(req, res){
    try {
         await Questions.deleteMany();
         res.json({ msg: "Questions Deleted Successfully...!"});
    } catch (error) {
         res.json({ error })
    }
 }



 export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function storeResult(req, res){
    try {
         const { username, result, attempts, points, achived } = req.body;
         if(!username && !result) throw new Error('Data Not Provided...!');
 


         Results.create({ username, result, attempts, points, achived })
  .then(() => {
    res.json({ msg: "Result Saved Successfully...!" });
  })
  .catch(err => {
    // Handle the error here
    console.error(err);
  });
 
    } catch (error) {
         res.json({error})
    }
 }

 export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}


