import validator from "validator";
import { createCategory, deleteCategoryById, getAllCategory, getCategoryByName } from "../service/categoryService.js";


export const createNewCategory = (req, res) => {
    const body = req.body;
    addCategory(body)
      .then((resp) => {
        res.status(200).send(resp);
      })
      .catch((err) => {
        res.status(200).send({ success: false, error: "Something went worng" });
      });
  };



export const getCategory = (req,res)=>{
   getCategoryHandler().then((resp)=>{
      res.status(200).send(resp)
  }).catch((err)=>{
    res.status(200).send({success:false,error:"Something went wrong"})
  })
}  
export const deleteCategoryUsingId = (req, res) => {
  const id = req.params.id
  deleteCategoryByIdHandler(id).then((resp) => {
      res.status(200).send(resp)
  }).catch((err) => {
      console.log(err)
      res.status(200).send({ success: false, error: "Something went worng" })
  })
}



const deleteCategoryByIdHandler = async (id) => {
  await deleteCategoryById(id)
  return { success: true, message: "Delete Successfully!!!" }
}


const getCategoryHandler = async () => {
  const category = await getAllCategory()
  return {
    category,
    success:true
  }
}

  const addCategory = async (body) => {
    if (
      !body.name ||
      validator.isEmpty(body.name) 
    ) {
      return { success: false, error: "name is required" };
    }
  
    
    const newCategory = await getCategoryByName(body.name);
    if (newCategory) {
      return {
        success: false,
        error: "Sorry,there is an category with this name.",
      };
    }
  
  
  
    try {
      const _category = await createCategory(body);
  
      return {
        success: true,
        message:"category created successfully "
      };
    } catch (err) {
      return {
        success: false,
        error: "oops,Something went wrong. please try again.",
      };
    }
  };