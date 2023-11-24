import Questions from "../mongodbtypes/qtypes.js";
import Results from "../mongodbtypes/rtypes.js";
import questions, { answers } from '../mongodb_a/pushdata.js'

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
    try {
        Questions.insertMany({ questions, answers }, function(err, data){
            res.json({ msg: "Data Saved Successfully...!"})
        })
    } catch (error) {
        res.json({ error })
    }
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
      const r = await Results.find().sort({points:-1});
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

export async function deleteResult(req,res){
  try {
    // Perform the deletion operation in MongoDB
    await Results.deleteMany({});

    // Respond with a success message or any relevant information
    res.json({ message: `${deleteResult.deletedCount} records deleted successfully.` });
  } catch (error) {
    console.error('Error deleting records:', error);
    res.json({ error: 'Internal Server Error' });
  };
}


